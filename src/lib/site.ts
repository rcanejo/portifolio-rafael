export const siteConfig = {
  name: "Rafael Targino Canêjo",
  shortName: "Rafael Canêjo",
  title: "Desenvolvedor NoCode/LowCode · Automações com IA",
  email: process.env.CONTACT_EMAIL ?? "rafaelcanejo.dev@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5583996965991",
  whatsappDisplay: "(83) 99696-5991",
  whatsappMessage: {
    pt: "Olá Rafael! Vi seu portfólio e gostaria de conversar sobre automações.",
    en: "Hi Rafael! I saw your portfolio and would like to talk about automations.",
  },
  links: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/rcanejo",
    whatsapp: (lang: "pt" | "en") => {
      const msg =
        lang === "pt"
          ? "Olá Rafael! Vi seu portfólio e gostaria de conversar sobre automações."
          : "Hi Rafael! I saw your portfolio and would like to talk about automations.";
      const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5583996965991";
      return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
    },
  },
} as const;
