import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal(true),
  // Honeypot — must stay empty (bots fill it)
  website: z.string().max(0).optional().or(z.literal("")),
});

type ContactPayload = z.infer<typeof contactSchema>;

// Naive in-memory rate limiter (per warm lambda instance)
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const hits: Map<string, number[]> = new Map();

function getClientIp(req: VercelRequest): string {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0].trim();
  if (Array.isArray(fwd) && fwd.length > 0) return fwd[0];
  return req.socket?.remoteAddress ?? "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((ts) => now - ts < RATE_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE_LIMIT;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(data: ContactPayload, ip: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;background:#f8f7f4;border:1px solid #e8e4dc;font-weight:600;width:140px">${label}</td><td style="padding:8px 12px;border:1px solid #e8e4dc">${escapeHtml(value)}</td></tr>`;

  return `<!doctype html>
<html><body style="font-family:Inter,Arial,sans-serif;background:#fff;color:#0c1620;padding:24px">
  <h2 style="margin:0 0 16px 0">Nouveau message — Portfolio</h2>
  <p style="color:#5a6573;margin:0 0 16px 0">Reçu via le formulaire de contact.</p>
  <table style="border-collapse:collapse;width:100%;font-size:14px">
    ${row("Nom", data.name)}
    ${row("Email", data.email)}
    ${data.phone ? row("Téléphone", data.phone) : ""}
    ${data.company ? row("Société", data.company) : ""}
    ${row("Sujet", data.subject)}
    ${row("IP", ip)}
  </table>
  <h3 style="margin:24px 0 8px 0">Message</h3>
  <div style="white-space:pre-wrap;border:1px solid #e8e4dc;border-radius:8px;padding:12px;background:#fafafa">${escapeHtml(data.message)}</div>
</body></html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.CONTACT_TO_EMAIL ?? "ali.ahmed.benhamouda@gmail.com";
  const fromAddress = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return res.status(500).json({ error: "Email service not configured" });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: "Too many requests, please retry later." });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      issues: parsed.error.flatten().fieldErrors,
    });
  }

  const data = parsed.data;

  // Honeypot triggered → silently accept (don't tell bots)
  if (data.website && data.website.length > 0) {
    return res.status(200).json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { data: sent, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: data.email,
      subject: `[Portfolio] ${data.subject}`,
      html: buildHtml(data, ip),
      text: `From: ${data.name} <${data.email}>\nPhone: ${data.phone ?? "-"}\nCompany: ${data.company ?? "-"}\nSubject: ${data.subject}\n\n${data.message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(502).json({ error: "Email provider error" });
    }

    return res.status(200).json({ ok: true, id: sent?.id });
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
