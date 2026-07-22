import { z } from "zod";

export const subjects = ["Direito Trabalhista", "Direito de Família", "Direito Previdenciário", "Direito Empresarial"] as const;
const safeText = (max: number) => z.string().trim().min(1).max(max).refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value), "Caracteres inválidos");

export const contactSchema = z.object({
  name: safeText(120),
  email: z.string().trim().max(254).email(),
  phone: z.string().trim().min(8).max(24).regex(/^[+()\d\s.-]+$/),
  subject: z.enum(subjects),
  message: safeText(2000),
  privacyAccepted: z.boolean().refine((value) => value, "O aceite é obrigatório"),
  policyVersion: z.string().max(30).default("2026-07"),
  website: z.string().max(0).default(""),
  startedAt: z.number().int().positive(),
  sessionId: z.string().min(16).max(100),
  turnstileToken: z.string().max(2048).optional(),
}).strict();

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactFormInput = z.input<typeof contactSchema>;
export const normalizeEmail = (value: string) => value.trim().toLowerCase().normalize("NFKC");
export const normalizePhone = (value: string) => value.replace(/\D/g, "");
export const sanitizeText = (value: string) => value.normalize("NFKC").replace(/[<>]/g, "").trim();
