"use server";

import { Resend } from "resend";
import type { Locale } from "@/content/types";
import { siteConfig } from "@/lib/site";

export type ContactState = {
  ok: boolean;
  message: string;
  useMailto?: boolean;
  mailto?: string;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const lang = (formData.get("lang") as Locale) ?? "pt";
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const honeypot = String(formData.get("website") ?? "").trim();

  const messages = {
    pt: {
      success: "Mensagem enviada! Obrigado pelo contato.",
      error: "Não foi possível enviar. Tente novamente ou use o WhatsApp.",
      invalid: "Preencha todos os campos corretamente.",
      mailto: "Abrindo seu e-mail para enviar a mensagem…",
    },
    en: {
      success: "Message sent! Thank you for reaching out.",
      error: "Could not send. Please try again or use WhatsApp.",
      invalid: "Please fill in all fields correctly.",
      mailto: "Opening your email client to send the message…",
    },
  }[lang];

  if (honeypot || !name || !email || !message) {
    return { ok: false, message: messages.invalid };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    const subject = encodeURIComponent(`Contato portfólio: ${name}`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\n\n${message}`);
    return {
      ok: true,
      message: messages.mailto,
      useMailto: true,
      mailto: `mailto:${siteConfig.email}?subject=${subject}&body=${body}`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>",
      to: siteConfig.email,
      replyTo: email,
      subject: `[Portfólio] Mensagem de ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
    });
    return { ok: true, message: messages.success };
  } catch {
    return { ok: false, message: messages.error };
  }
}
