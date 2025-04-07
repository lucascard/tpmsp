# Design System - TPMSP

## Cores

Nosso sistema de cores é baseado em variáveis HSL para maior flexibilidade e consistência:

```css
--background: 0 0% 100%        /* Fundo principal */
--foreground: 222.2 84% 4.9%   /* Texto principal */
--primary: 221.2 83.2% 53.3%   /* Cor de destaque principal */
--muted: 210 40% 96.1%         /* Elementos secundários/desabilitados */
--card: 0 0% 100%              /* Fundo de cards */
```

### Uso das Cores

- **Texto Principal**: `text-foreground`
- **Texto Secundário**: `text-muted-foreground`
- **Elementos Ativos**: `text-primary`
- **Hover States**: Usar variações com opacidade (ex: `bg-primary/10`)
- **Bordas**: `border-border` (tom sutil para divisões)

## Tipografia

### Hierarquia de Texto

- **Títulos Principais**: `text-2xl font-bold tracking-tight`
- **Subtítulos**: `text-lg font-medium`
- **Texto de Menu**: `text-sm font-medium`
- **Texto de Card**: `text-sm text-muted-foreground`
- **Labels**: `text-sm font-medium text-muted-foreground`

### Espaçamento de Texto

- Usar `leading-normal` para texto regular
- `tracking-tight` para títulos
- `gap-2` ou `gap-3` para espaçamento entre elementos de texto e ícones

## Componentes

### Sidebar

```tsx
// Estrutura base
<aside className="w-64 border-r bg-card">
  {/* Cabeçalho */}
  <div className="flex h-16 items-center border-b px-6">
    <span className="text-lg font-semibold">TPMSP</span>
  </div>
  
  {/* Menu de Navegação */}
  <nav className="space-y-1 p-2">
    {/* Itens do Menu */}
  </nav>
</aside>
```

#### Item de Menu
- Estado Normal: `text-muted-foreground hover:bg-muted hover:text-foreground`
- Estado Ativo: `bg-primary/10 text-primary hover:bg-primary/15`
- Padding: `px-3 py-2`
- Borda: `rounded-lg`
- Transições: `transition-colors`

### Cards

```tsx
<div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
  <div className="flex flex-col space-y-1.5">
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
</div>
```

### Botões

#### Variantes
- **Default**: `bg-primary text-primary-foreground shadow hover:bg-primary/90`
- **Ghost**: `hover:bg-accent hover:text-accent-foreground`
- **Secondary**: `bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`

#### Tamanhos
- **Default**: `h-9 px-4 py-2`
- **Icon**: `h-9 w-9`
- **Small**: `h-8 rounded-md px-3 text-xs`
- **Large**: `h-10 rounded-md px-8`

## Layout

### Espaçamento

- **Padding de Container**: `p-6`
- **Gap entre Cards**: `gap-4`
- **Margin entre Seções**: `space-y-6`
- **Padding de Menu**: `p-2`

### Grid

```tsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  {/* Cards */}
</div>
```

### Responsividade

- **Mobile First**: Começar com layout simples
- **Breakpoints**:
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

## Ícones

- Usar `lucide-react` como biblioteca principal
- Tamanho padrão: `h-5 w-5`
- Cor: Herdar do texto ou usar `text-muted-foreground`

## Animações e Transições

- Transições suaves: `transition-colors`, `transition-transform`
- Duração: 200ms (padrão)
- Hover states: Usar escalas sutis ou mudanças de opacidade
- Feedback visual: Alterações de cor e background

## Boas Práticas

1. **Consistência**
   - Usar as classes utilitárias do Tailwind
   - Manter padrões de espaçamento
   - Seguir a hierarquia de tipografia

2. **Acessibilidade**
   - Incluir `data-testid` para testes
   - Usar contraste adequado
   - Incluir estados de foco visíveis

3. **Manutenção**
   - Componentizar elementos reutilizáveis
   - Documentar variações de componentes
   - Manter consistência nas nomenclaturas

4. **Performance**
   - Evitar aninhamento excessivo de elementos
   - Usar lazy loading quando apropriado
   - Otimizar imagens e assets

## Exemplos de Uso

### Layout Principal
```tsx
<div className="min-h-screen">
  <TopBar />
  <div className="flex">
    <AppSidebar />
    <main className="flex-1 p-6 overflow-auto">
      {/* Conteúdo */}
    </main>
  </div>
</div>
```

### Seção de Dashboard
```tsx
<div className="space-y-6">
  <div>
    <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
    <p className="text-muted-foreground">Bem-vindo ao TPMSP</p>
  </div>
  {/* Cards e Conteúdo */}
</div>
``` 