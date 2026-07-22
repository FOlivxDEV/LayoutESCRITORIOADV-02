import { BriefcaseBusiness, Building2, HeartHandshake, Landmark } from "lucide-react";

export const areas = [
  { slug: "direito-trabalhista", name: "Direito Trabalhista", icon: BriefcaseBusiness, description: "Orientação jurídica sobre relações de trabalho, contratos, verbas rescisórias, direitos de trabalhadores e questões empresariais trabalhistas.", topics: ["Relações de trabalho", "Contratos", "Verbas rescisórias", "Prevenção de conflitos"] },
  { slug: "direito-de-familia", name: "Direito de Família", icon: HeartHandshake, description: "Atuação em divórcio, guarda, pensão alimentícia, união estável, inventário e outras questões familiares.", topics: ["Divórcio e união estável", "Guarda", "Alimentos", "Inventário e sucessões"] },
  { slug: "direito-previdenciario", name: "Direito Previdenciário", icon: Landmark, description: "Orientação sobre aposentadorias, benefícios previdenciários, revisões e requerimentos administrativos.", topics: ["Aposentadorias", "Benefícios", "Requerimentos administrativos", "Revisões"] },
  { slug: "direito-empresarial", name: "Direito Empresarial", icon: Building2, description: "Assessoria jurídica para empresas, elaboração de contratos, prevenção de riscos e resolução de conflitos societários.", topics: ["Contratos empresariais", "Prevenção de riscos", "Questões societárias", "Resolução de conflitos"] },
] as const;

// DEMONSTRAÇÃO: substituir todos os nomes, fotografias, cargos e registros fictícios antes da publicação.
export const team = [
  { slug: "mariana-ferraz", name: "Mariana Ferraz", role: "Sócia-fundadora", area: "Direito de Família e Sucessões", oab: "OAB/UF 00.000 — DEMO", image: "/images/mariana.jpg" },
  { slug: "ricardo-oliveira", name: "Ricardo Oliveira", role: "Sócio", area: "Direito Trabalhista", oab: "OAB/UF 00.000 — DEMO", image: "/images/ricardo.jpg" },
  { slug: "helena-martins", name: "Helena Martins", role: "Sócia", area: "Direito Previdenciário", oab: "OAB/UF 00.000 — DEMO", image: "/images/helena.jpg" },
  { slug: "gustavo-almeida", name: "Gustavo Almeida", role: "Advogado associado", area: "Direito Empresarial", oab: "OAB/UF 00.000 — DEMO", image: "/images/gustavo.jpg" },
] as const;

export const articles = [
  { slug: "fui-demitido-verbas-rescisao", category: "Direito Trabalhista", title: "Fui demitido: quais verbas podem fazer parte da rescisão?", summary: "Conheça alguns dos pagamentos que podem ser considerados em uma rescisão trabalhista, conforme o tipo de desligamento." },
  { slug: "como-funciona-guarda-compartilhada", category: "Direito de Família", title: "Como funciona a guarda compartilhada?", summary: "Entenda os aspectos gerais da divisão de responsabilidades parentais após uma separação." },
  { slug: "modalidades-de-aposentadoria", category: "Direito Previdenciário", title: "Quais são as principais modalidades de aposentadoria?", summary: "Veja uma introdução às modalidades previdenciárias e à importância da análise individual dos requisitos." },
  { slug: "contratos-reduzem-riscos", category: "Direito Empresarial", title: "Por que contratos bem elaborados reduzem riscos empresariais?", summary: "Entenda como contratos claros ajudam a organizar obrigações e prevenir conflitos." },
] as const;

export const faqs = [
  ["Atendimento", "Como funciona o primeiro atendimento?", "A equipe recebe um resumo da necessidade, verifica a área envolvida e informa os próximos passos possíveis."],
  ["Atendimento online", "O escritório realiza atendimento online?", "Sim. O formato é definido conforme a necessidade e a disponibilidade informada pelos canais oficiais."],
  ["Privacidade", "Quais informações devo enviar inicialmente?", "Apenas nome, contato, área de interesse e um resumo sem dados sensíveis."],
  ["Documentos", "Preciso enviar documentos no primeiro contato?", "Não. Aguarde orientação antes de encaminhar documentos ou informações confidenciais."],
  ["Consulta", "O envio do formulário cria uma relação advogado-cliente?", "Não. A relação profissional depende de análise, aceite e formalização apropriada."],
  ["Privacidade", "Como os meus dados serão utilizados?", "Para responder ao contato, organizar o atendimento e cumprir obrigações aplicáveis, conforme a política de privacidade."],
  ["Áreas de atuação", "Em quais áreas o escritório atua?", "Trabalhista, Família, Previdenciário e Empresarial, conforme descrito neste site demonstrativo."],
  ["Consulta", "Como saber se o escritório pode analisar meu caso?", "Entre em contato com um resumo. A equipe informará se a demanda está dentro das áreas atendidas."],
] as const;

export const disclaimer = "Este conteúdo possui finalidade exclusivamente informativa e não substitui a análise individual do caso por um profissional habilitado.";
