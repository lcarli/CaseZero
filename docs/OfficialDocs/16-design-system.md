# 🎨 Design System - CaseZero

Este documento define o sistema de design do CaseZero, incluindo componentes, cores, tipografia, espacamentos e padrões visuais para manter consistência e qualidade em toda a interface.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Paleta de Cores](#paleta-de-cores)
- [Tipografia](#tipografia)
- [Espacamentos](#espacamentos)
- [Componentes Base](#componentes-base)
- [Ícones e Ilustrações](#ícones-e-ilustrações)
- [Layout e Grid](#layout-e-grid)
- [Estados e Interações](#estados-e-interações)
- [Temas](#temas)
- [Tokens de Design](#tokens-de-design)

## 🎯 Visão Geral

O Design System do CaseZero foi criado para refletir a seriedade e profissionalismo necessários em um sistema de investigação policial, mantendo uma interface moderna, acessível e eficiente.

### Princípios de Design

```text
┌─────────────────────────────────────────────────────────┐
│ 🎨 PRINCÍPIOS DE DESIGN DO CASEZERO                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ 🔍 CLAREZA                                             │
│ ├── Informações organizadas hierarquicamente           │
│ ├── Contraste adequado para legibilidade               │
│ ├── Ícones intuitivos e universalmente reconhecidos    │
│ └── Feedback visual claro para todas as ações          │
│                                                         │
│ ⚡ EFICIÊNCIA                                           │
│ ├── Fluxos de trabalho otimizados                      │
│ ├── Acesso rápido a funções críticas                   │
│ ├── Redução de cliques e interações desnecessárias     │
│ └── Shortcuts e atalhos visuais                        │
│                                                         │
│ 🎯 CONSISTÊNCIA                                        │
│ ├── Padrões visuais uniformes em toda aplicação        │
│ ├── Comportamentos previsíveis dos componentes         │
│ ├── Linguagem visual coerente                          │
│ └── Reutilização de componentes                        │
│                                                         │
│ 🔒 CONFIABILIDADE                                      │
│ ├── Design que transmite segurança e profissionalismo │
│ ├── Validações visuais claras                          │
│ ├── Estados de erro bem definidos                      │
│ └── Confirmações para ações críticas                   │
│                                                         │
│ ♿ ACESSIBILIDADE                                       │
│ ├── Compatibilidade com leitores de tela               │
│ ├── Contraste mínimo WCAG AA                           │
│ ├── Navegação por teclado                              │
│ └── Suporte a diferentes tamanhos de fonte             │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Identidade Visual

- **Tom**: Profissional, confiável, moderno
- **Personalidade**: Sério mas acessível, técnico mas humano
- **Atmosfera**: Ambiente de trabalho focado e organizado
- **Inspiração**: Interfaces de sistemas corporativos e ferramentas profissionais

## 🎨 Paleta de Cores

### Cores Primárias

```css
/* Primary Colors - Azul Policial */
:root {
  /* Brand Blue - Cor principal do sistema */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6; /* Base */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;
}
```

### Cores Secundárias

```css
/* Secondary Colors - Cinza Neutro */
:root {
  /* Neutral Gray - Para textos e elementos secundários */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
}
```

### Cores Semânticas

```css
/* Semantic Colors - Estados e feedback */
:root {
  /* Success - Verde para sucesso */
  --color-success-50: #f0fdf4;
  --color-success-100: #dcfce7;
  --color-success-500: #22c55e;
  --color-success-600: #16a34a;
  --color-success-700: #15803d;
  
  /* Warning - Amarelo para avisos */
  --color-warning-50: #fffbeb;
  --color-warning-100: #fef3c7;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;
  
  /* Error - Vermelho para erros */
  --color-error-50: #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
  
  /* Info - Azul claro para informações */
  --color-info-50: #f0f9ff;
  --color-info-100: #e0f2fe;
  --color-info-500: #06b6d4;
  --color-info-600: #0891b2;
  --color-info-700: #0e7490;
}
```

### Cores Funcionais

```css
/* Functional Colors - Contextos específicos */
:root {
  /* Evidence Types */
  --color-evidence-photo: #8b5cf6;     /* Roxo para fotos */
  --color-evidence-document: #f59e0b;  /* Amarelo para documentos */
  --color-evidence-video: #ec4899;     /* Rosa para vídeos */
  --color-evidence-audio: #10b981;     /* Verde para áudio */
  --color-evidence-physical: #6366f1;  /* Índigo para objetos físicos */
  
  /* Case Status */
  --color-case-active: #22c55e;        /* Verde para casos ativos */
  --color-case-pending: #f59e0b;       /* Amarelo para pendentes */
  --color-case-closed: #6b7280;        /* Cinza para fechados */
  --color-case-urgent: #ef4444;        /* Vermelho para urgentes */
  
  /* Priority Levels */
  --color-priority-low: #22c55e;       /* Verde para baixa */
  --color-priority-medium: #f59e0b;    /* Amarelo para média */
  --color-priority-high: #f97316;      /* Laranja para alta */
  --color-priority-critical: #ef4444;  /* Vermelho para crítica */
}
```

### Mapa de Uso das Cores

```text
┌─────────────────────────────────────────────────────────┐
│ 🎨 APLICAÇÃO DAS CORES                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ PRIMÁRIAS (Azul)                                        │
│ ├── Botões principais e CTAs                            │
│ ├── Links e elementos interativos                       │
│ ├── Headers e navegação principal                       │
│ ├── Indicadores de progresso                            │
│ └── Elementos de marca                                   │
│                                                         │
│ NEUTRAS (Cinza)                                         │
│ ├── Textos e conteúdo                                   │
│ ├── Bordas e divisores                                  │
│ ├── Backgrounds secundários                             │
│ ├── Ícones informativos                                 │
│ └── Elementos de interface                               │
│                                                         │
│ SEMÂNTICAS                                              │
│ ├── Verde: Sucessos, confirmações, casos ativos         │
│ ├── Amarelo: Avisos, pendências, prioridade média       │
│ ├── Vermelho: Erros, falhas, prioridade alta            │
│ ├── Azul claro: Informações, dicas, notificações        │
│ └── Roxo: Evidências especiais, recursos premium        │
│                                                         │
│ FUNCIONAIS                                              │
│ ├── Tipos de evidência (cada tipo tem sua cor)          │
│ ├── Status de casos (ativo, pendente, fechado)          │
│ ├── Níveis de prioridade (baixa a crítica)              │
│ └── Departamentos e especialidades                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 📝 Tipografia

### Fonte Principal

```css
/* Typography System */
:root {
  /* Font Families */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', 'Source Code Pro', 
               'Menlo', 'Monaco', monospace;
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
}
```

### Escala Tipográfica

```css
/* Typography Scale */
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 1.875rem;   /* 30px */
  --text-4xl: 2.25rem;    /* 36px */
  --text-5xl: 3rem;       /* 48px */
  --text-6xl: 3.75rem;    /* 60px */
  
  /* Line Heights */
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### Estilos de Texto

```css
/* Typography Styles */
.text-display-1 {
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.text-display-2 {
  font-size: var(--text-5xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.text-heading-1 {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
}

.text-heading-2 {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-tight);
}

.text-heading-3 {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--leading-snug);
}

.text-heading-4 {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-snug);
}

.text-body-large {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-relaxed);
}

.text-body {
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-normal);
}

.text-body-small {
  font-size: var(--text-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-normal);
}

.text-caption {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--leading-normal);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.text-code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--leading-normal);
}
```

## 📏 Espacamentos

### Sistema de Espacamento

```css
/* Spacing System */
:root {
  /* Base unit: 4px */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-40: 10rem;    /* 160px */
  --space-48: 12rem;    /* 192px */
  --space-56: 14rem;    /* 224px */
  --space-64: 16rem;    /* 256px */
}
```

### Aplicação de Espacamentos

```text
┌─────────────────────────────────────────────────────────┐
│ 📏 GUIA DE ESPACAMENTOS                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ MICRO ESPACAMENTOS (1-3)                               │
│ ├── Padding interno de botões                          │
│ ├── Margens entre ícones e texto                       │
│ ├── Espaçamento entre elementos inline                 │
│ └── Bordas e divisores finos                           │
│                                                         │
│ PEQUENOS ESPACAMENTOS (4-6)                            │
│ ├── Padding de inputs e campos                         │
│ ├── Margens entre elementos relacionados               │
│ ├── Espaçamento interno de cards                       │
│ └── Gap entre itens de lista                           │
│                                                         │
│ MÉDIOS ESPACAMENTOS (8-12)                             │
│ ├── Margens entre seções                               │
│ ├── Padding de containers                              │
│ ├── Espaçamento entre grupos de elementos              │
│ └── Margens de componentes                             │
│                                                         │
│ GRANDES ESPACAMENTOS (16-24)                           │
│ ├── Separação entre módulos                            │
│ ├── Margens de layout principal                        │
│ ├── Espaçamento de cabeçalhos de seção                 │
│ └── Padding de modais e overlays                       │
│                                                         │
│ MUITO GRANDES ESPACAMENTOS (32+)                       │
│ ├── Margens de páginas                                 │
│ ├── Espaçamento entre blocos principais                │
│ ├── Padding de containers de nível superior            │
│ └── Separação de áreas funcionais                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🧩 Componentes Base

### Button Component

```typescript
// src/components/ui/Button/Button.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary'
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
```

### Input Component

```typescript
// src/components/ui/Input/Input.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-transparent text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        default: 'h-10 px-3 py-2',
        sm: 'h-9 px-3 py-2',
        lg: 'h-11 px-3 py-2'
      },
      variant: {
        default: '',
        error: 'border-destructive focus-visible:ring-destructive',
        success: 'border-success focus-visible:ring-success'
      }
    },
    defaultVariants: {
      size: 'default',
      variant: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, variant, label, error, helperText, leftIcon, rightIcon, ...props }, ref) => {
    const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          
          <input
            id={inputId}
            className={cn(
              inputVariants({ size, variant }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            aria-describedby={cn(errorId, helperTextId)}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} className="text-sm text-destructive">
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={helperTextId} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
```

### Card Component

```typescript
// src/components/ui/Card/Card.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: '',
        elevated: 'shadow-lg',
        outlined: 'border-2',
        ghost: 'border-transparent shadow-none'
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
      }
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md'
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding }), className)}
      {...props}
    />
  )
);

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants
};
```

### Badge Component

```typescript
// src/components/ui/Badge/Badge.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        success: 'border-transparent bg-success text-white hover:bg-success/80',
        warning: 'border-transparent bg-warning text-white hover:bg-warning/80',
        outline: 'text-foreground border-border',
        
        // Case status variants
        'case-active': 'border-transparent bg-green-100 text-green-800',
        'case-pending': 'border-transparent bg-yellow-100 text-yellow-800',
        'case-closed': 'border-transparent bg-gray-100 text-gray-800',
        'case-urgent': 'border-transparent bg-red-100 text-red-800',
        
        // Priority variants
        'priority-low': 'border-transparent bg-green-100 text-green-700',
        'priority-medium': 'border-transparent bg-yellow-100 text-yellow-700',
        'priority-high': 'border-transparent bg-orange-100 text-orange-700',
        'priority-critical': 'border-transparent bg-red-100 text-red-700',
        
        // Evidence type variants
        'evidence-photo': 'border-transparent bg-purple-100 text-purple-700',
        'evidence-document': 'border-transparent bg-amber-100 text-amber-700',
        'evidence-video': 'border-transparent bg-pink-100 text-pink-700',
        'evidence-audio': 'border-transparent bg-emerald-100 text-emerald-700',
        'evidence-physical': 'border-transparent bg-indigo-100 text-indigo-700'
      },
      size: {
        default: 'px-2.5 py-0.5',
        sm: 'px-2 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
```

### Alert Component

```typescript
// src/components/ui/Alert/Alert.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        info: 'border-info/50 text-info-foreground bg-info/10 [&>svg]:text-info',
        success: 'border-success/50 text-success-foreground bg-success/10 [&>svg]:text-success',
        warning: 'border-warning/50 text-warning-foreground bg-warning/10 [&>svg]:text-warning',
        destructive: 'border-destructive/50 text-destructive-foreground bg-destructive/10 [&>svg]:text-destructive'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

const getAlertIcon = (variant: string) => {
  switch (variant) {
    case 'success':
      return <CheckCircle className="h-4 w-4" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4" />;
    case 'destructive':
      return <AlertTriangle className="h-4 w-4" />;
    case 'info':
    default:
      return <Info className="h-4 w-4" />;
  }
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, icon, dismissible, onDismiss, children, ...props }, ref) => {
    const alertIcon = icon || getAlertIcon(variant || 'default');
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {alertIcon}
        <div className="flex-1">
          {children}
        </div>
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="absolute right-4 top-4 text-foreground/50 hover:text-foreground"
            aria-label="Fechar alerta"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));

AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));

AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertTitle, AlertDescription, alertVariants };
```

## 🎭 Ícones e Ilustrações

### Sistema de Ícones

```typescript
// src/components/ui/Icon/Icon.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface IconProps {
  icon: LucideIcon;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const iconSizes = {
  xs: 'w-3 h-3',   // 12px
  sm: 'w-4 h-4',   // 16px
  md: 'w-5 h-5',   // 20px
  lg: 'w-6 h-6',   // 24px
  xl: 'w-8 h-8'    // 32px
};

export const Icon: React.FC<IconProps> = ({ 
  icon: IconComponent, 
  size = 'md', 
  className 
}) => {
  return (
    <IconComponent 
      className={cn(iconSizes[size], className)} 
    />
  );
};
```

### Mapeamento de Ícones por Contexto

```typescript
// src/constants/icons.ts
import {
  // Navigation
  Home, Search, Settings, User, Bell, Menu, X,
  
  // Actions
  Plus, Edit, Trash2, Download, Upload, Save, Copy,
  
  // Status
  CheckCircle, AlertTriangle, XCircle, Info, Clock,
  
  // Evidence Types
  Camera, FileText, Video, Volume2, Package,
  
  // Case Management
  FolderOpen, Calendar, MapPin, Users, Shield,
  
  // Analysis
  Microscope, FlaskConical, Fingerprint, Dna,
  
  // System
  Database, Server, Wifi, WifiOff, Loader2
} from 'lucide-react';

// Mapeamento de ícones por contexto
export const ICONS = {
  // Navigation
  navigation: {
    home: Home,
    search: Search,
    settings: Settings,
    profile: User,
    notifications: Bell,
    menu: Menu,
    close: X
  },
  
  // Actions
  actions: {
    add: Plus,
    edit: Edit,
    delete: Trash2,
    download: Download,
    upload: Upload,
    save: Save,
    copy: Copy
  },
  
  // Status
  status: {
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    info: Info,
    pending: Clock,
    loading: Loader2
  },
  
  // Evidence Types
  evidence: {
    photo: Camera,
    document: FileText,
    video: Video,
    audio: Volume2,
    physical: Package
  },
  
  // Case Management
  cases: {
    folder: FolderOpen,
    calendar: Calendar,
    location: MapPin,
    team: Users,
    priority: Shield
  },
  
  // Analysis
  analysis: {
    microscope: Microscope,
    lab: FlaskConical,
    fingerprint: Fingerprint,
    dna: Dna
  },
  
  // System
  system: {
    database: Database,
    server: Server,
    online: Wifi,
    offline: WifiOff
  }
};

// Helper para obter ícone por categoria e nome
export const getIcon = (category: keyof typeof ICONS, name: string) => {
  return ICONS[category]?.[name as keyof typeof ICONS[keyof typeof ICONS]];
};
```

### Iconografia Customizada

```typescript
// src/components/ui/CustomIcons/PoliceIcons.tsx
import React from 'react';

// Ícone customizado para distintivo policial
export const BadgeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L3 7l9 13 9-13-9-5z" />
    <path d="M12 8v4" />
    <path d="M10 12h4" />
  </svg>
);

// Ícone para evidência criminal
export const EvidenceIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <circle cx="10" cy="15" r="2" />
    <line x1="8" y1="17" x2="12" y2="13" />
  </svg>
);

// Ícone para investigação
export const InvestigationIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <circle cx="11" cy="11" r="3" />
  </svg>
);

// Ícone para relatório policial
export const ReportIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);
```

## 📐 Layout e Grid

### Sistema de Grid

```css
/* Grid System */
:root {
  /* Container sizes */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  
  /* Grid columns */
  --grid-cols-1: repeat(1, minmax(0, 1fr));
  --grid-cols-2: repeat(2, minmax(0, 1fr));
  --grid-cols-3: repeat(3, minmax(0, 1fr));
  --grid-cols-4: repeat(4, minmax(0, 1fr));
  --grid-cols-6: repeat(6, minmax(0, 1fr));
  --grid-cols-12: repeat(12, minmax(0, 1fr));
  
  /* Gap sizes */
  --gap-1: 0.25rem;
  --gap-2: 0.5rem;
  --gap-4: 1rem;
  --gap-6: 1.5rem;
  --gap-8: 2rem;
}

/* Container classes */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container { max-width: var(--container-sm); }
}

@media (min-width: 768px) {
  .container { max-width: var(--container-md); }
}

@media (min-width: 1024px) {
  .container { max-width: var(--container-lg); }
}

@media (min-width: 1280px) {
  .container { max-width: var(--container-xl); }
}

@media (min-width: 1536px) {
  .container { max-width: var(--container-2xl); }
}

/* Grid utilities */
.grid {
  display: grid;
}

.grid-cols-1 { grid-template-columns: var(--grid-cols-1); }
.grid-cols-2 { grid-template-columns: var(--grid-cols-2); }
.grid-cols-3 { grid-template-columns: var(--grid-cols-3); }
.grid-cols-4 { grid-template-columns: var(--grid-cols-4); }
.grid-cols-6 { grid-template-columns: var(--grid-cols-6); }
.grid-cols-12 { grid-template-columns: var(--grid-cols-12); }

.gap-1 { gap: var(--gap-1); }
.gap-2 { gap: var(--gap-2); }
.gap-4 { gap: var(--gap-4); }
.gap-6 { gap: var(--gap-6); }
.gap-8 { gap: var(--gap-8); }
```

### Layout Components

```typescript
// src/components/layout/Container/Container.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: boolean;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'xl',
  padding = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        {
          'max-w-sm': size === 'sm',
          'max-w-md': size === 'md',
          'max-w-lg': size === 'lg',
          'max-w-xl': size === 'xl',
          'max-w-2xl': size === '2xl',
          'max-w-none': size === 'full'
        },
        padding && 'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```

```typescript
// src/components/layout/Grid/Grid.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 1 | 2 | 4 | 6 | 8;
  responsive?: {
    sm?: 1 | 2 | 3 | 4 | 6 | 12;
    md?: 1 | 2 | 3 | 4 | 6 | 12;
    lg?: 1 | 2 | 3 | 4 | 6 | 12;
  };
}

export const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = 1,
  gap = 4,
  responsive,
  ...props
}) => {
  return (
    <div
      className={cn(
        'grid',
        {
          'grid-cols-1': cols === 1,
          'grid-cols-2': cols === 2,
          'grid-cols-3': cols === 3,
          'grid-cols-4': cols === 4,
          'grid-cols-6': cols === 6,
          'grid-cols-12': cols === 12
        },
        {
          'gap-1': gap === 1,
          'gap-2': gap === 2,
          'gap-4': gap === 4,
          'gap-6': gap === 6,
          'gap-8': gap === 8
        },
        responsive && {
          [`sm:grid-cols-${responsive.sm}`]: responsive.sm,
          [`md:grid-cols-${responsive.md}`]: responsive.md,
          [`lg:grid-cols-${responsive.lg}`]: responsive.lg
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
```

## ⚡ Estados e Interações

### Estados de Interação

```css
/* Interactive States */
:root {
  /* Transition durations */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  
  /* Transition timings */
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Focus ring */
  --focus-ring-width: 2px;
  --focus-ring-offset: 2px;
  --focus-ring-color: var(--color-primary-500);
  
  /* Hover opacity */
  --hover-opacity: 0.8;
  --active-opacity: 0.9;
}

/* Focus styles */
.focus-ring {
  outline: none;
  box-shadow: 0 0 0 var(--focus-ring-offset) transparent,
              0 0 0 calc(var(--focus-ring-width) + var(--focus-ring-offset)) var(--focus-ring-color);
}

/* Interactive element base */
.interactive {
  transition: all var(--duration-normal) var(--ease-out);
  cursor: pointer;
}

.interactive:hover {
  opacity: var(--hover-opacity);
}

.interactive:active {
  opacity: var(--active-opacity);
  transform: scale(0.98);
}

.interactive:focus-visible {
  @apply focus-ring;
}

.interactive:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Loading state */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.loading {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Skeleton loading */
.skeleton {
  background: linear-gradient(90deg, 
    var(--color-gray-200) 25%, 
    var(--color-gray-100) 50%, 
    var(--color-gray-200) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Micro-interações

```typescript
// src/hooks/useRipple.ts
import { useCallback } from 'react';

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

export const useRipple = () => {
  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: currentColor;
      opacity: 0.3;
      transform: scale(0);
      animation: ripple 600ms linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;
    
    // Adicionar CSS da animação se não existir
    if (!document.getElementById('ripple-styles')) {
      const style = document.createElement('style');
      style.id = 'ripple-styles';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    // Remover após animação
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  return { createRipple };
};
```

## 🌙 Temas

### Sistema de Temas

```css
/* Theme System */
:root {
  /* Light theme (default) */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  
  --radius: 0.5rem;
}

/* Dark theme */
[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  
  --popover: 222.2 84% 4.9%;
  --popover-foreground: 210 40% 98%;
  
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 84% 4.9%;
  
  --secondary: 217.2 32.6% 17.5%;
  --secondary-foreground: 210 40% 98%;
  
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 210 40% 98%;
  
  --border: 217.2 32.6% 17.5%;
  --input: 217.2 32.6% 17.5%;
  --ring: 224.3 76.3% 94.1%;
}

/* High contrast theme */
[data-theme="high-contrast"] {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  
  --primary: 0 0% 0%;
  --primary-foreground: 0 0% 100%;
  
  --secondary: 0 0% 10%;
  --secondary-foreground: 0 0% 100%;
  
  --border: 0 0% 0%;
  --input: 0 0% 0%;
  
  /* Enhanced contrast for accessibility */
  --focus-ring-color: #000000;
  --focus-ring-width: 3px;
}
```

### Theme Provider

```typescript
// src/components/providers/ThemeProvider.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'high-contrast' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = 'system',
  storageKey = 'casezero-theme'
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  // Detectar tema do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Carregar tema salvo
  useEffect(() => {
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [storageKey]);

  // Aplicar tema
  useEffect(() => {
    const root = document.documentElement;
    
    // Remover classes de tema anteriores
    root.classList.remove('light', 'dark', 'high-contrast');
    
    // Determinar tema atual
    let currentTheme = theme;
    if (theme === 'system') {
      currentTheme = systemTheme;
    }
    
    // Aplicar tema
    root.setAttribute('data-theme', currentTheme);
    root.classList.add(currentTheme);
    
    // Salvar no localStorage
    localStorage.setItem(storageKey, theme);
  }, [theme, systemTheme, storageKey]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme: handleSetTheme,
      systemTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## 🎨 Tokens de Design

### Design Tokens Structure

```typescript
// src/design-system/tokens.ts
export const designTokens = {
  // Colors
  colors: {
    primary: {
      50: 'hsl(214, 100%, 97%)',
      100: 'hsl(214, 95%, 93%)',
      200: 'hsl(213, 97%, 87%)',
      300: 'hsl(212, 96%, 78%)',
      400: 'hsl(213, 94%, 68%)',
      500: 'hsl(217, 91%, 60%)', // Base
      600: 'hsl(221, 83%, 53%)',
      700: 'hsl(224, 76%, 48%)',
      800: 'hsl(226, 71%, 40%)',
      900: 'hsl(224, 64%, 33%)',
      950: 'hsl(226, 55%, 21%)'
    },
    
    semantic: {
      success: {
        light: 'hsl(142, 76%, 36%)',
        DEFAULT: 'hsl(142, 71%, 45%)',
        dark: 'hsl(142, 69%, 58%)'
      },
      warning: {
        light: 'hsl(43, 96%, 56%)',
        DEFAULT: 'hsl(38, 92%, 50%)',
        dark: 'hsl(32, 95%, 44%)'
      },
      error: {
        light: 'hsl(0, 84%, 60%)',
        DEFAULT: 'hsl(0, 72%, 51%)',
        dark: 'hsl(0, 74%, 42%)'
      }
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.25rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }]
    },
    
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  },
  
  // Spacing
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    32: '8rem'
  },
  
  // Shadows
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  },
  
  // Border radius
  borderRadius: {
    none: '0px',
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },
  
  // Transitions
  transitionDuration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms'
  },
  
  // Breakpoints
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
};

// Utility function to access nested tokens
export const getToken = (path: string) => {
  return path.split('.').reduce((obj, key) => obj?.[key], designTokens);
};
```

### Token Usage Examples

```typescript
// src/components/examples/TokenUsage.tsx
import React from 'react';
import { designTokens } from '../../design-system/tokens';

// Exemplo de uso dos tokens
export const TokenUsageExample = () => {
  return (
    <div className="space-y-8 p-8">
      {/* Cores */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cores</h2>
        <div className="grid grid-cols-5 gap-2">
          {Object.entries(designTokens.colors.primary).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="w-16 h-16 rounded-lg border border-gray-200 mb-2"
                style={{ backgroundColor: value }}
              />
              <div className="text-sm font-mono">
                <div>{key}</div>
                <div className="text-gray-500">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografia */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Tipografia</h2>
        <div className="space-y-3">
          {Object.entries(designTokens.typography.fontSize).map(([key, [size, { lineHeight }]]) => (
            <div key={key} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-mono text-gray-500">{key}</div>
              <div style={{ fontSize: size, lineHeight }}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="text-sm text-gray-500 font-mono">
                {size} / {lineHeight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Espacamentos */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Espacamentos</h2>
        <div className="space-y-2">
          {Object.entries(designTokens.spacing).slice(0, 10).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-4">
              <div className="w-8 text-sm font-mono text-gray-500">{key}</div>
              <div
                className="bg-blue-500"
                style={{ width: value, height: '1rem' }}
              />
              <div className="text-sm text-gray-500 font-mono">{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Sombras */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Sombras</h2>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(designTokens.boxShadow).map(([key, value]) => (
            <div key={key} className="text-center">
              <div
                className="w-24 h-24 bg-white rounded-lg border border-gray-100 mb-2 mx-auto"
                style={{ boxShadow: value }}
              />
              <div className="text-sm font-mono">
                <div>{key}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
```

---

**Conclusão**: Este Design System fornece uma base sólida e escalável para a interface do CaseZero, garantindo consistência visual, acessibilidade e facilidade de manutenção em toda a aplicação.

**Próximo**: [17-responsive-design.md](17-responsive-design.md) - Design Responsivo

---


[**Retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
