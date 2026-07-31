# Auréa Advocacia

Site institucional demonstrativo e independente para escritório de advocacia.

## Tecnologias

- Next.js com App Router, React e TypeScript.
- Tailwind CSS.
- Formulário validado com React Hook Form e Zod.
- Testes com Vitest e Playwright.

O conteúdo institucional é carregado localmente a partir do código do projeto. Não há banco de dados externo configurado.

## Desenvolvimento local

```bash
pnpm install
pnpm dev
```

Abra `http://localhost:3200`.

## Validação

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Variáveis opcionais

Consulte `.env.example` para integrações opcionais de contato, proteção e monitoramento. Nunca prefixe segredos com `NEXT_PUBLIC_`.

## Antes da publicação

- Substitua nomes, registros profissionais, contatos e demais dados demonstrativos.
- Revise os textos jurídicos, as regras de publicidade profissional e as políticas de privacidade.
- Configure o serviço de e-mail somente se o formulário precisar realizar envios reais.
- Valide acessibilidade, responsividade, cookies, formulário, sitemap e robots.
