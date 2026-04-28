import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "errors.nameTooShort" })
    .max(80, { message: "errors.nameTooLong" }),
  email: z
    .string()
    .trim()
    .email({ message: "errors.emailInvalid" })
    .max(120, { message: "errors.emailTooLong" }),
  phone: z
    .string()
    .trim()
    .max(40, { message: "errors.phoneTooLong" })
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(120, { message: "errors.companyTooLong" })
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .trim()
    .min(3, { message: "errors.subjectTooShort" })
    .max(140, { message: "errors.subjectTooLong" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "errors.messageTooShort" })
    .max(5000, { message: "errors.messageTooLong" }),
  consent: z.literal(true, {
    errorMap: () => ({ message: "errors.consentRequired" }),
  }),
  // Honeypot
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
