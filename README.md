# Ferraz, Oliveira & Martins Advocacia

Modelo demonstrativo, completo e reutilizável de site institucional para escritórios de advocacia. Todos os nomes, registros, imagens e dados são fictícios e devem ser substituídos antes da publicação.

## Arquitetura e stack

- Next.js 16.2 (App Router), React 19, TypeScript strict e Tailwind CSS 4.
- Server Components por padrão; componentes cliente apenas para menu, formulário, filtros, cookies e login.
- Supabase/PostgreSQL com Auth, Storage, migrations, seed, RLS e service role restrita ao servidor.
- React Hook Form + Zod; Resend; Upstash Redis; Turnstile opcional; Lucide.
- Vitest e Playwright; ESLint e Prettier; Vercel como destino principal.

Rotas públicas: `/`, `/escritorio`, quatro rotas `/areas/[slug]`, quatro `/equipe/[slug]`, `/conteudos`, quatro `/conteudos/[slug]`, `/duvidas` e quatro páginas legais. Rotas administrativas protegidas: `/admin`, `/admin/contatos`, `/admin/areas`, `/admin/equipe`, `/admin/artigos`, `/admin/duvidas`, `/admin/configuracoes` e `/admin/login`.

## Banco de dados

A migration cria `practice_areas`, `team_members`, `articles`, `faq_items`, `site_settings`, `contact_submissions`, `admin_profiles` e `audit_logs`, tipos enumerados, índices, funções de autorização, buckets público/privado e policies explícitas.

RLS: o público lê somente conteúdo publicado; ninguém insere contatos diretamente pelo navegador; equipe ativa lê/edita conteúdo e contatos; somente administradores gerenciam perfis, configurações críticas e exclusões; logs não podem ser alterados. A service role é usada apenas pelo Route Handler.

## Instalação

Pré-requisitos: Node.js 20+, pnpm, projeto Supabase e conta Resend.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

No Supabase, aplique `supabase/migrations/202607220001_initial_schema.sql` e depois `supabase/seed.sql`. Crie o primeiro usuário no painel do Supabase Auth e insira manualmente um perfil `admin` em `admin_profiles`; não há cadastro público.

## Variáveis de ambiente

Públicas: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_ANALYTICS_PROVIDER`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

Privadas: `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CONTACT_NOTIFICATION_EMAIL`, `EMAIL_FROM`, `TURNSTILE_SECRET_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`, `SENTRY_DSN`, `IP_HASH_SECRET`, `CRON_SECRET`.

Nunca prefixe segredos com `NEXT_PUBLIC_`. Em produção, defina `IP_HASH_SECRET` com valor aleatório longo. Sem Resend no desenvolvimento, o sistema registra apenas o evento de simulação, sem dados completos. Sem Upstash, o fallback em memória serve apenas ao desenvolvimento e não é adequado a serverless distribuído.

## Integrações

- Supabase: configure URL/chaves, aplique migration e seed. As páginas autenticadas são dinâmicas e a sessão usa cookies SSR.
- Resend: autentique o domínio, configure `EMAIL_FROM` e `CONTACT_NOTIFICATION_EMAIL`; publique SPF e DKIM e adote DMARC.
- WhatsApp: o número é normalizado; a URL contém somente uma mensagem inicial configurada, nunca o texto do formulário.
- Turnstile: chaves opcionais. A interface está preparada para ativação; valide o token no Route Handler antes de habilitar em produção.
- Analytics: desativado por padrão. Escolha um único provedor e só carregue após consentimento; prefira Plausible/Umami se apropriado.
- Sentry: integração opcional; desative PII, request bodies e headers sensíveis antes de ativar.

## Segurança e privacidade

Validação strict no cliente/servidor, limites de payload, Unicode NFKC, bloqueio de controles, honeypot, tempo mínimo, URLs excessivas, hash de IP/sessão/e-mail, rate limit e respostas genéricas. CSP e demais headers ficam em `next.config.ts`. O banco usa RLS, grants e queries do cliente oficial; segredos nunca vão ao navegador. Contatos têm exclusão lógica e revisão inicial em 180 dias, sem exclusão irreversível automática.

Uploads devem aceitar apenas JPEG/PNG/WebP até 5 MB, confirmar MIME real, remover EXIF, renomear com UUID e bloquear SVG. A migration limita buckets e MIME; o processamento de imagem deve ser implementado no fluxo administrativo antes de liberar uploads em produção.

## Testes e build

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

O Playwright inicia o ambiente local. Para testar envio real, configure Supabase/Resend e use dados de teste controlados. Teste também teclado, leitor de tela, Axe, zoom a 200%, mobile e os estados de erro/429.

## Deploy na Vercel

Importe o repositório, configure todas as variáveis nos ambientes corretos, aplique migration/seed no Supabase, autentique o domínio no Resend e execute o build. Após publicar, valide HTTPS, CSP, cookies, formulário, Auth, sitemap, robots, Open Graph e restauração de backup. Backups do banco não incluem automaticamente objetos do Storage; defina estratégia separada.

## Checklist obrigatório antes da publicação

- [ ] Substituir nome, logo, fachada e fotos da equipe.
- [ ] Confirmar registros OAB, áreas, tempo real de atuação e remover afirmações não comprovadas.
- [ ] Validar endereço, telefone, WhatsApp e e-mail.
- [ ] Revisar textos jurídicos, publicidade da OAB, políticas, termos e aviso legal.
- [ ] Definir controlador, operadores, canal de privacidade, bases legais e retenção.
- [ ] Configurar domínio, HTTPS, SPF, DKIM e DMARC.
- [ ] Rotacionar segredos; ativar backups e testar restauração.
- [ ] Finalizar validação Turnstile e processamento seguro de uploads antes de ativá-los.
- [ ] Testar formulário, consentimento, acessibilidade, teclado, leitor de tela, zoom e dispositivos móveis.
- [ ] Verificar `robots.txt`, sitemap, analytics escolhido e CSP.
- [ ] Executar lint, typecheck, testes unitários, integração, Playwright e build de produção.

## Limitações e decisões pendentes

Sem credenciais reais, não é possível confirmar gravação, e-mail ou login contra serviços externos. As telas administrativas estabelecem proteção, navegação e contratos de dados, mas o CRUD visual final deve ser ligado ao projeto Supabase do cliente. Turnstile adaptativo, Sentry e um provedor de analytics dependem de escolha/configuração. O conteúdo jurídico e as práticas LGPD exigem revisão profissional; este projeto não declara conformidade absoluta.
