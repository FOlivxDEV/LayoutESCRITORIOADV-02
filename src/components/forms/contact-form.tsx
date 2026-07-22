"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, subjects, type ContactFormInput, type ContactInput } from "@/lib/validation/contact";

export function ContactForm() {
  const startedAt = useMemo(() => Date.now(), []);
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const [status, setStatus] = useState("");
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm<ContactFormInput, unknown, ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { privacyAccepted: false, website: "", policyVersion: "2026-07", startedAt, sessionId },
  });
  const message = watch("message") ?? "";
  async function submit(data: ContactInput) {
    setStatus("");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = await response.json() as { message?: string };
      if (!response.ok) { setStatus(response.status === 429 ? "Você atingiu o limite de solicitações. Aguarde e tente novamente." : body.message ?? "Não foi possível concluir a solicitação."); return; }
      reset({ privacyAccepted: false, website: "", policyVersion: "2026-07", startedAt: Date.now(), sessionId: crypto.randomUUID() });
      setStatus("Recebemos sua mensagem. Nossa equipe analisará as informações e retornará pelos canais informados.");
    } catch { setStatus("Falha de conexão. Preserve seus dados e tente novamente ou utilize outro canal."); }
  }
  return <form className="card p-6 md:p-8" onSubmit={handleSubmit(submit)} noValidate>
    <h3 className="serif text-2xl text-[#0a2038]">Envie uma mensagem</h3>
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Nome" error={errors.name?.message}><input {...register("name")} autoComplete="name" /></Field>
      <Field label="E-mail" error={errors.email?.message}><input {...register("email")} type="email" autoComplete="email" /></Field>
      <Field label="Telefone" error={errors.phone?.message}><input {...register("phone")} autoComplete="tel" /></Field>
      <Field label="Assunto" error={errors.subject?.message}><select {...register("subject")} defaultValue=""><option value="" disabled>Selecione</option>{subjects.map((s) => <option key={s}>{s}</option>)}</select></Field>
    </div>
    <Field label="Mensagem" error={errors.message?.message}><textarea {...register("message")} rows={6} maxLength={2000} /><span className="block text-right text-xs text-slate-500">{message.length}/2.000</span></Field>
    <div className="absolute -left-[10000px]" aria-hidden="true"><label>Website<input {...register("website")} tabIndex={-1} autoComplete="off" /></label></div>
    <input type="hidden" {...register("startedAt", { valueAsNumber: true })} /><input type="hidden" {...register("sessionId")} /><input type="hidden" {...register("policyVersion")} />
    <label className="my-4 flex gap-3 text-sm"><input type="checkbox" {...register("privacyAccepted")} className="mt-1 size-5" />Li e aceito a <a className="underline" href="/politica-de-privacidade">Política de Privacidade</a>.</label>
    {errors.privacyAccepted && <p className="text-sm text-red-700">O aceite é obrigatório.</p>}
    <p className="mb-4 text-xs text-slate-600">Não envie senhas, dados bancários, documentos sigilosos ou informações pessoais sensíveis. O envio não estabelece automaticamente relação advogado-cliente.</p>
    <button className="btn btn-primary w-full sm:w-auto" disabled={isSubmitting}>{isSubmitting ? "Enviando…" : "Enviar mensagem"}</button><p className="mt-4 text-sm" aria-live="polite">{status}</p>
  </form>;
}
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) { return <label className="my-4 block text-sm font-semibold">{label}<span className="mt-2 block [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:p-3 [&_select]:w-full [&_select]:rounded-md [&_select]:border [&_select]:p-3 [&_textarea]:w-full [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:p-3">{children}</span>{error && <span className="mt-1 block text-red-700">{error}</span>}</label>; }
