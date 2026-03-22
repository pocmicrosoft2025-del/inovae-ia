# 🤖 inovae.ia — Site Institucional

> Site moderno, tecnológico e altamente profissional para empresa especializada em Agentes de Inteligência Artificial, automação empresarial e interfaces digitais avançadas.

---

## ✅ Funcionalidades Implementadas

### 🎨 Design & Visual
- Identidade visual completa com gradientes **roxo, violeta e neon** sobre fundo escuro
- Tipografia moderna (Inter + Space Grotesk via Google Fonts)
- Aparência de startup de tecnologia de alto nível
- Cartões com bordas suaves, glow e efeitos glassmorphism
- Elementos decorativos: orbs animados, linhas de luz neon, efeitos radial gradient

### ✨ Animações & Interações
- **Cursor customizado** neon que reage ao hover em elementos interativos
- **Canvas de partículas** com conexões dinâmicas e parallax ao mouse
- **Scroll progress bar** no topo com gradiente neon
- **AOS (Animate On Scroll)** customizado — elementos surgem ao entrar na viewport
- **Efeito tilt 3D** nos cards de serviços e estatísticas
- **Typewriter** na hero badge com rotação de frases
- **Orbs flutuantes** animados com parallax no scroll
- **Efeito mouse glow** nos cards (posição do cursor influencia o brilho)
- **Notificações flutuantes** no mockup do celular (WhatsApp, Instagram, Telegram, E-mail)
- **Chat demo animado** — simula conversa em loop no mockup do celular
- **Órbita animada** na seção de benefícios com ícones girando
- **Float stats** com animação up/down suave

### 📱 Seções do Site
1. **Navbar** — fixa com blur effect ao scroll, menu hamburguer no mobile, link ativo por seção
2. **Hero** — título impactante, CTA, mockup de celular com chat + notificações
3. **Problema** — 4 cards de estatísticas com contador animado e barras de progresso
4. **Serviços** — 4 cards com ícones, tags, features e hover effects
5. **Benefícios** — lista de benefícios + visual de órbita animada com integrações
6. **Diferencial** — 6 cards de diferenciais + banda de integrações
7. **CTA Final** — formulário de captura de leads com validação e feedback visual
8. **Footer** — links, redes sociais, CTA e créditos

### 🗃️ Banco de Dados
- Tabela `leads` criada com campos: nome, e-mail, telefone, empresa, segmento, data
- Formulário do site salva leads automaticamente via `POST tables/leads`

---

## 📂 Estrutura de Arquivos

```
index.html          — Página principal (todas as seções)
css/
  style.css         — Estilos completos (design system + animações + responsivo)
js/
  main.js           — JavaScript (cursor, partículas, AOS, chat, form, tilt, etc.)
README.md           — Esta documentação
```

---

## 🔗 URIs e Endpoints

| Rota | Descrição |
|------|-----------|
| `/` ou `index.html` | Página principal do site |
| `#hero` | Seção Hero |
| `#problem` | Seção Problema / Estatísticas |
| `#services` | Seção Serviços |
| `#benefits` | Seção Benefícios |
| `#diferencial` | Seção Diferencial |
| `#cta-final` | Seção CTA Final / Formulário |
| `tables/leads` (POST) | API para salvar leads captados pelo formulário |
| `tables/leads` (GET) | API para listar leads |

---

## 🗄️ Modelo de Dados — Tabela `leads`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | text | ID único (UUID automático) |
| `name` | text | Nome do lead |
| `email` | text | E-mail profissional |
| `phone` | text | WhatsApp / Telefone |
| `company` | text | Nome da empresa |
| `segment` | text | Interesse: vendas, agendamento, suporte, atendimento, todos |
| `date` | datetime | Data/hora de submissão |

---

## 🚀 Performance & Responsividade

- Layout **100% responsivo** (desktop, tablet, mobile)
- CSS com variáveis e media queries otimizadas
- Fontes via Google Fonts com `preconnect`
- `will-change` aplicado seletivamente para GPU acceleration
- Canvas de partículas com limite adaptável ao viewport
- IntersectionObserver para lazy render de animações
- Scroll events com `{ passive: true }`

---

## 🔧 Próximas Etapas Recomendadas

- [ ] Adicionar página de blog/artigos sobre IA
- [ ] Implementar seção de depoimentos/cases com carrossel
- [ ] Adicionar vídeo demo dos agentes em funcionamento
- [ ] Criar painel de administração para visualização de leads
- [ ] Integrar WhatsApp Business API no botão CTA
- [ ] Adicionar Google Analytics / Meta Pixel
- [ ] Implementar chat widget ao vivo no canto da tela
- [ ] Criar versão em inglês (i18n)

---

## 🎯 Objetivo

Transmitir **inovação, tecnologia e automação empresarial**, mostrando como a **inovae.ia** ajuda empresas a aumentar vendas, melhorar atendimento e automatizar processos com Agentes de Inteligência Artificial.

---

*Desenvolvido com tecnologia de ponta, design de alto nível e atenção a cada detalhe — inovae.ia 💜*
