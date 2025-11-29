# GuiaLocal - Aplicativo Nuxt 4

## 📁 Estrutura do Projeto

Este é um projeto Nuxt 4 com Tailwind CSS, seguindo as melhores práticas e padrões recomendados.

### Estrutura de Diretórios

```
nuxt-app/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── tailwind.css          # Estilos globais do Tailwind
│   ├── components/
│   │   ├── home/                     # Componentes da página inicial
│   │   │   ├── CategoryGrid.vue
│   │   │   ├── HeroBanner.vue
│   │   │   └── SearchBar.vue
│   │   ├── layout/                   # Componentes de layout
│   │   │   ├── AppFooter.vue
│   │   │   └── AppHeader.vue
│   │   └── store/                    # Componentes relacionados a lojas
│   │       └── StoreCard.vue
│   ├── composables/                  # Composables Vue (equivalente aos hooks React)
│   │   ├── useFavorites.ts
│   │   └── useIsMobile.ts
│   ├── pages/                        # Páginas do aplicativo (roteamento automático)
│   │   ├── index.vue                 # Página inicial (/)
│   │   ├── explorar.vue              # Página de exploração (/explorar)
│   │   ├── favoritos.vue             # Página de favoritos (/favoritos)
│   │   ├── promocoes.vue             # Página de promoções (/promocoes)
│   │   └── loja/
│   │       └── [slug].vue            # Página dinâmica de detalhes da loja
│   ├── types/                        # Definições de tipos TypeScript
│   │   └── index.ts
│   ├── utils/                        # Funções utilitárias
│   │   ├── cn.ts                     # Utility para classes CSS
│   │   └── mockData.ts               # Dados mockados
│   └── app.vue                       # Componente raiz do aplicativo
├── public/                           # Arquivos públicos estáticos
│   └── robots.txt
├── nuxt.config.ts                    # Configuração do Nuxt
├── package.json                      # Dependências do projeto
├── tailwind.config.ts                # Configuração do Tailwind CSS
└── tsconfig.json                     # Configuração do TypeScript
```

## 🚀 Tecnologias Utilizadas

- **Nuxt 4** - Framework Vue.js com SSR/SSG
- **Vue 3** - Framework JavaScript reativo
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Lucide Vue Next** - Ícones
- **clsx & tailwind-merge** - Utilitários para classes CSS

## 📦 Dependências Instaladas

```json
{
  "@nuxtjs/tailwindcss": "^6.14.0",
  "nuxt": "^4.2.1",
  "vue": "^3.5.25",
  "vue-router": "^4.6.3",
  "clsx": "latest",
  "tailwind-merge": "latest",
  "lucide-vue-next": "latest",
  "@vueuse/core": "latest"
}
```

## 🎨 Padrões Nuxt 4

### 1. **Auto-imports**
- Todos os composables em `composables/` são importados automaticamente
- Componentes em `components/` são importados automaticamente
- APIs do Vue e Nuxt são auto-importadas (ref, computed, useState, etc.)

### 2. **Roteamento Baseado em Arquivos**
- Páginas em `pages/` geram rotas automaticamente
- `pages/index.vue` → `/`
- `pages/explorar.vue` → `/explorar`
- `pages/loja/[slug].vue` → `/loja/:slug` (rota dinâmica)

### 3. **Composables**
- Use composables para lógica reutilizável
- Prefixo `use` (ex: `useFavorites`, `useIsMobile`)
- Estado global com `useState()`

### 4. **Componentes**
- Nomeados com PascalCase
- Auto-importados quando usados em templates
- Estrutura organizada por funcionalidade

### 5. **TypeScript**
- Tipos definidos em `types/`
- Importação com `~/types`
- Props tipadas com `defineProps<Props>()`

## 🎯 Recursos Implementados

### Páginas
- ✅ **Home** - Página inicial com banner, categorias e destaques
- ✅ **Explorar** - Lista de todas as lojas
- ✅ **Favoritos** - Lojas favoritadas pelo usuário
- ✅ **Promoções** - Lista de promoções ativas
- ✅ **Detalhes da Loja** - Informações completas de uma loja

### Componentes
- ✅ **AppHeader** - Cabeçalho com navegação e seletor de cidade
- ✅ **AppFooter** - Rodapé com links e informações
- ✅ **HeroBanner** - Banner rotativo com promoções
- ✅ **SearchBar** - Barra de pesquisa
- ✅ **CategoryGrid** - Grid de categorias
- ✅ **StoreCard** - Card de loja com informações

### Funcionalidades
- ✅ Favoritar/desfavoritar lojas (localStorage)
- ✅ Navegação entre páginas
- ✅ Seleção de cidade
- ✅ Design responsivo
- ✅ Tema customizado com Tailwind

## 🎨 Sistema de Design

### Cores (CSS Variables)
```css
--primary: 24 95% 53%        /* Laranja/Vermelho */
--secondary: 240 4.8% 95.9%  /* Cinza claro */
--accent: 240 4.8% 95.9%     /* Cinza claro */
--background: 0 0% 100%      /* Branco */
--foreground: 240 10% 3.9%   /* Preto/Cinza escuro */
```

### Gradientes
- `.gradient-warm` - Laranja para vermelho
- `.gradient-cool` - Azul para roxo

### Fontes
- **Sans**: Inter - Texto geral
- **Display**: Poppins - Títulos e destaques

## 🚀 Como Executar

### Desenvolvimento
```bash
cd nuxt-app
npm run dev
```

Acesse: http://localhost:3000

### Build para Produção
```bash
npm run build
npm run preview
```

### Gerar Site Estático
```bash
npm run generate
```

## 📝 Próximos Passos (Opcional)

1. **Integração com API** - Substituir mockData por chamadas de API
2. **Autenticação** - Sistema de login/registro
3. **Filtros Avançados** - Adicionar filtros na página Explorar
4. **Mapa Interativo** - Integração com Google Maps
5. **Sistema de Reviews** - Permitir avaliações de usuários
6. **Notificações** - Sistema de notificações push
7. **PWA** - Transformar em Progressive Web App
8. **Testes** - Adicionar testes unitários e E2E

## 🔧 Configurações Importantes

### nuxt.config.ts
- Módulos: Tailwind CSS
- CSS global configurado
- Meta tags para SEO
- Fontes Google configuradas

### tailwind.config.ts
- Tema customizado com cores do design system
- Variáveis CSS para fácil manutenção
- Plugins e utilitários adicionais

## 📚 Documentação Útil

- [Nuxt 4 Docs](https://nuxt.com)
- [Vue 3 Docs](https://vuejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

---

**Desenvolvido com Nuxt 4 e Tailwind CSS** 🚀
