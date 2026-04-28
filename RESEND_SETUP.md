# Configuration du formulaire de contact (Resend)

Ce document explique comment activer l'envoi d'emails depuis le formulaire de contact via [Resend](https://resend.com).

## Architecture

```
[ Formulaire React ]  --POST /api/contact-->  [ Vercel Serverless ]  --Resend API-->  [ Inbox ]
   (validation Zod)                              (api/contact.ts)
```

Le navigateur **n'a jamais accès** à la clé API : tout part de la fonction serverless `api/contact.ts` exécutée sur Vercel.

## 1. Créer un compte Resend

1. S'inscrire sur https://resend.com (le plan gratuit suffit : 3 000 emails/mois, 100/jour).
2. Aller sur **API Keys** → **Create API Key**.
3. Donner un nom (ex. `portfolio-prod`), permission **Sending access**.
4. Copier la clé (commence par `re_…`). **Elle n'est affichée qu'une fois.**

## 2. (Optionnel mais recommandé) Vérifier un domaine

Sans domaine vérifié, tu peux uniquement envoyer **depuis** `onboarding@resend.dev` et **vers ta propre adresse Resend**. C'est suffisant pour ce portfolio puisque tu es l'unique destinataire.

Pour utiliser une vraie adresse (ex. `contact@ahmed-portfolio.com`) :

1. Resend → **Domains** → **Add Domain**.
2. Ajouter les enregistrements DNS demandés (SPF/DKIM) chez ton registrar.
3. Attendre la validation, puis remplacer `CONTACT_FROM_EMAIL`.

## 3. Configurer les variables d'environnement

### En local (développement)

Crée un fichier `.env.local` à la racine (déjà ignoré par git) :

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_TO_EMAIL=ali.ahmed.benhamouda@gmail.com
CONTACT_FROM_EMAIL=Portfolio <onboarding@resend.dev>
```

### Sur Vercel (production)

1. Vercel Dashboard → ton projet → **Settings** → **Environment Variables**.
2. Ajouter les 3 mêmes variables avec **Environment = Production, Preview, Development**.
3. Cliquer **Save**.
4. Redéployer (Deployments → ⋯ → **Redeploy**) pour que les variables soient prises en compte.

## 4. Tester en local

```bash
# Lancer le front + les fonctions serverless localement
npx vercel dev
```

> ⚠️ `npm run dev` (Vite seul) **ne lance pas** la route `/api/contact`. Utilise `vercel dev` qui simule l'environnement Vercel complet (front + serverless).

Première utilisation : `npx vercel link` pour relier le dossier au projet Vercel.

## 5. Vérifier en production

1. Push sur la branche `main` → Vercel redéploie automatiquement.
2. Ouvrir `https://ahmed-portfolio-lemon.vercel.app/#contact`.
3. Remplir le formulaire et envoyer.
4. Vérifier la réception sur ta boîte mail.
5. En cas d'erreur, regarder **Vercel → Project → Logs → Functions → /api/contact**.

## Structure des fichiers

| Fichier | Rôle |
|---|---|
| `api/contact.ts` | Endpoint serverless qui valide et envoie via Resend |
| `src/lib/contactSchema.ts` | Schéma Zod partagé (validation client + serveur) |
| `src/components/Contact.tsx` | UI du formulaire (`react-hook-form` + Zod) |
| `.env.example` | Modèle des variables à définir |

## Sécurité incluse

- **Validation Zod** côté client ET côté serveur (jamais faire confiance au client).
- **Honeypot** (`website` field caché) pour piéger les bots simples.
- **Rate limiting** : 5 requêtes / minute / IP par instance lambda.
- **Échappement HTML** dans le template du mail (anti-injection).
- **Reply-To** = email du visiteur → tu réponds directement.

## Champs du formulaire

| Champ | Requis | Validation |
|---|---|---|
| Nom | ✅ | 2–80 caractères |
| Email | ✅ | format email, max 120 |
| Téléphone | ❌ | max 40 |
| Société | ❌ | max 120 |
| Sujet | ✅ | 3–140 |
| Message | ✅ | 10–5000 |
| Consentement | ✅ | doit être coché |
