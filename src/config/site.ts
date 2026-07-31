export const siteConfig = {
  name: "Auréa Advocacia",
  shortName: "Auréa",
  description: "Estratégia jurídica, escuta atenta e soluções construídas com clareza.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  isDemo: true,
  oab: "OAB/UF 0000 — DEMONSTRAÇÃO",
  address: "Endereço demonstrativo — substituir antes da publicação",
  contact: {
    phone: "(00) 0000-0000",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5500900000000",
    whatsappDisplay: "(00) 90000-0000",
    email: "contato@aureaadvocacia.com.br",
    hours: "Segunda a sexta, das 8h às 18h",
  },
  whatsappMessage:
    "Olá! Acessei o site do escritório e gostaria de obter informações sobre o atendimento.",
} as const;

// Afirmações sobre tempo de atuação, posição de mercado ou prazo de retorno só podem
// ser publicadas quando verdadeiras, documentadas e aprovadas pelo escritório.
export const credibility = [
  { title: "Visão integrada", description: "estratégias construídas em equipe" },
  { title: "Presencial e online", description: "atendimento de onde você estiver" },
  { title: "Retorno inicial ágil", description: "durante o horário de atendimento" },
  { title: "Atuação regional", description: "conhecimento próximo da realidade local" },
] as const;

export function whatsappUrl() {
  const number = siteConfig.contact.whatsapp.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;
}
