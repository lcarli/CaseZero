# 📱 Design Responsivo - CaseZero

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Breakpoints e Grid System](#breakpoints-e-grid-system)
- [Layout Flexível](#layout-flexível)
- [Componentes Responsivos](#componentes-responsivos)
- [Navegação Mobile](#navegação-mobile)
- [Tipografia Responsiva](#tipografia-responsiva)
- [Imagens e Mídia](#imagens-e-mídia)
- [Performance Mobile](#performance-mobile)
- [Testes em Dispositivos](#testes-em-dispositivos)
- [Implementação Técnica](#implementação-técnica)

---

## 🌟 Visão Geral

O CaseZero foi projetado com uma abordagem **mobile-first**, garantindo que a experiência seja otimizada para todos os dispositivos, desde smartphones até telas de desktop. O design responsivo é fundamental para permitir que investigadores acessem o sistema em campo usando tablets ou dispositivos móveis.

### 🎯 Objetivos do Design Responsivo

- **Acessibilidade Universal**: Funcional em qualquer dispositivo
- **Performance Otimizada**: Carregamento rápido em conexões lentas
- **UX Consistente**: Experiência uniforme entre dispositivos
- **Produtividade Mobile**: Funcionalidades completas em telas pequenas

### 📊 Estatísticas de Uso

```text
Desktop: 45% dos acessos
Tablet:  35% dos acessos  
Mobile:  20% dos acessos
```

---

## 📐 Breakpoints e Grid System

### 🔧 Breakpoints Principais

```css
/* Sistema de Breakpoints */
:root {
  /* Mobile First Breakpoints */
  --breakpoint-xs: 0px;      /* Extra small devices */
  --breakpoint-sm: 640px;    /* Small devices (phones) */
  --breakpoint-md: 768px;    /* Medium devices (tablets) */
  --breakpoint-lg: 1024px;   /* Large devices (laptops) */
  --breakpoint-xl: 1280px;   /* Extra large devices */
  --breakpoint-2xl: 1536px;  /* 2X large devices */
}

/* Media Queries */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

### 🎨 Grid System Responsivo

```typescript
// src/components/layout/ResponsiveGrid/ResponsiveGrid.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const ResponsiveGrid: React.FC<ResponsiveGridProps> = ({
  children,
  className,
  cols = { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
  gap = { xs: 2, sm: 4, md: 6, lg: 8, xl: 8 }
}) => {
  const gridClasses = cn(
    'grid',
    // Columns
    `grid-cols-${cols.xs || 1}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    // Gap
    `gap-${gap.xs || 2}`,
    gap.sm && `sm:gap-${gap.sm}`,
    gap.md && `md:gap-${gap.md}`,
    gap.lg && `lg:gap-${gap.lg}`,
    gap.xl && `xl:gap-${gap.xl}`,
    className
  );

  return (
    <div className={gridClasses}>
      {children}
    </div>
  );
};
```

### 📱 Exemplo de Uso do Grid

```typescript
// Exemplo: Dashboard de casos responsivo
const CaseDashboard = () => {
  return (
    <ResponsiveGrid
      cols={{
        xs: 1,    // 1 coluna no mobile
        sm: 2,    // 2 colunas no tablet pequeno
        md: 3,    // 3 colunas no tablet
        lg: 4,    // 4 colunas no desktop
        xl: 6     // 6 colunas em telas grandes
      }}
      gap={{
        xs: 4,    // Gap menor no mobile
        md: 6,    // Gap médio no tablet
        lg: 8     // Gap maior no desktop
      }}
    >
      {cases.map(case => (
        <CaseCard key={case.id} case={case} />
      ))}
    </ResponsiveGrid>
  );
};
```

---

## 🔄 Layout Flexível

### 📐 Container System

```typescript
// src/components/layout/Container/Container.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  size = 'xl',
  padding = 'md'
}) => {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        // Max width based on size
        {
          'max-w-sm': size === 'sm',
          'max-w-md': size === 'md', 
          'max-w-lg': size === 'lg',
          'max-w-xl': size === 'xl',
          'max-w-2xl': size === '2xl',
          'max-w-none': size === 'full'
        },
        // Responsive padding
        {
          'px-0': padding === 'none',
          'px-2 sm:px-4': padding === 'sm',
          'px-4 sm:px-6 lg:px-8': padding === 'md',
          'px-6 sm:px-8 lg:px-12': padding === 'lg'
        },
        className
      )}
    >
      {children}
    </div>
  );
};
```

### 🎛️ Flex Layouts

```css
/* Utility classes para layouts flexíveis */
.flex-responsive {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .flex-responsive {
    flex-direction: row;
  }
}

/* Stack vertical no mobile, horizontal no desktop */
.stack-responsive {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .stack-responsive {
    flex-direction: row;
    align-items: center;
    gap: 1.5rem;
  }
}

/* Sidebar responsiva */
.sidebar-layout {
  display: flex;
  flex-direction: column;
}

@media (min-width: 1024px) {
  .sidebar-layout {
    flex-direction: row;
  }
  
  .sidebar-layout .sidebar {
    width: 280px;
    flex-shrink: 0;
  }
  
  .sidebar-layout .content {
    flex: 1;
    min-width: 0; /* Permite que o conteúdo encolha */
  }
}
```

---

## 🧩 Componentes Responsivos

### 📊 Cards Responsivos

```typescript
// src/components/ui/Card/ResponsiveCard.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

interface ResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'compact' | 'expanded';
  orientation?: 'auto' | 'horizontal' | 'vertical';
}

export const ResponsiveCard: React.FC<ResponsiveCardProps> = ({
  children,
  className,
  variant = 'default',
  orientation = 'auto'
}) => {
  return (
    <div
      className={cn(
        // Base styles
        'bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden',
        
        // Responsive variants
        {
          // Default: Adapta ao container
          'p-4 md:p-6': variant === 'default',
          
          // Compact: Menor padding em todas as telas
          'p-3 md:p-4': variant === 'compact',
          
          // Expanded: Mais espaço em telas grandes
          'p-4 md:p-8 lg:p-10': variant === 'expanded'
        },
        
        // Orientation
        {
          // Auto: Vertical no mobile, horizontal no desktop
          'flex flex-col md:flex-row': orientation === 'auto',
          
          // Sempre horizontal (quando há espaço)
          'flex flex-col sm:flex-row': orientation === 'horizontal',
          
          // Sempre vertical
          'flex flex-col': orientation === 'vertical'
        },
        
        className
      )}
    >
      {children}
    </div>
  );
};
```

### 📋 Tabelas Responsivas

```typescript
// src/components/ui/Table/ResponsiveTable.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'card' | 'stack';
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  children,
  className,
  variant = 'default'
}) => {
  if (variant === 'card') {
    // Em mobile, cada linha vira um card
    return (
      <div className={cn('space-y-4 md:hidden', className)}>
        {/* Versão card para mobile */}
      </div>
    );
  }

  if (variant === 'stack') {
    // Em mobile, dados são empilhados
    return (
      <div className={cn(
        'overflow-x-auto',
        // Scroll horizontal em telas pequenas
        'scrollbar-thin scrollbar-thumb-gray-300',
        className
      )}>
        <table className="min-w-full table-auto">
          {children}
        </table>
      </div>
    );
  }

  // Versão padrão com scroll horizontal
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="min-w-full">
        {children}
      </table>
    </div>
  );
};
```

### 🎯 Botões Responsivos

```typescript
// src/components/ui/Button/ResponsiveButton.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const responsiveButtonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground'
      },
      size: {
        sm: 'h-8 px-3 text-xs md:h-9 md:px-4 md:text-sm',
        default: 'h-9 px-4 text-sm md:h-10 md:px-6 md:text-base',
        lg: 'h-10 px-6 text-base md:h-11 md:px-8 md:text-lg',
        icon: 'h-9 w-9 md:h-10 md:w-10'
      },
      responsive: {
        true: 'w-full sm:w-auto', // Full width no mobile, auto no desktop
        false: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      responsive: false
    }
  }
);

export interface ResponsiveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof responsiveButtonVariants> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const ResponsiveButton = React.forwardRef<HTMLButtonElement, ResponsiveButtonProps>(
  ({ className, variant, size, responsive, icon, iconPosition = 'left', children, ...props }, ref) => {
    return (
      <button
        className={cn(responsiveButtonVariants({ variant, size, responsive, className }))}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }
);

ResponsiveButton.displayName = 'ResponsiveButton';
```

---

## 🧭 Navegação Mobile

### 📱 Menu Hamburger

```typescript
// src/components/navigation/MobileMenu/MobileMenu.tsx
import React, { useState } from 'react';
import { Menu, X, Home, Search, User, Settings } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Menu Sidebar */}
      <div className={cn(
        'fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">CaseZero</h2>
          <button
            onClick={onToggle}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Menu Items */}
        <nav className="p-4">
          <div className="space-y-2">
            <MobileMenuItem icon={<Home />} label="Dashboard" href="/" />
            <MobileMenuItem icon={<Search />} label="Casos" href="/cases" />
            <MobileMenuItem icon={<User />} label="Perfil" href="/profile" />
            <MobileMenuItem icon={<Settings />} label="Configurações" href="/settings" />
          </div>
        </nav>
      </div>
    </>
  );
};

const MobileMenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  href: string;
}> = ({ icon, label, href }) => {
  return (
    <a
      href={href}
      className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-100 transition-colors"
    >
      <span className="text-gray-500">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
};
```

### 🎛️ Header Responsivo

```typescript
// src/components/layout/Header/ResponsiveHeader.tsx
import React, { useState } from 'react';
import { Menu, Bell, User } from 'lucide-react';
import { Container } from '../Container/Container';
import { MobileMenu } from '../MobileMenu/MobileMenu';

export const ResponsiveHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo e Menu Mobile */}
            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-md hover:bg-gray-100 md:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-2">
                <img src="/logo.svg" alt="CaseZero" className="h-8 w-8" />
                <span className="font-bold text-xl hidden sm:block">CaseZero</span>
              </div>
            </div>

            {/* Navegação Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">Dashboard</a>
              <a href="/cases" className="text-gray-600 hover:text-gray-900">Casos</a>
              <a href="/evidence" className="text-gray-600 hover:text-gray-900">Evidências</a>
              <a href="/reports" className="text-gray-600 hover:text-gray-900">Relatórios</a>
            </nav>

            {/* Ações do Usuário */}
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-md hover:bg-gray-100 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              <button className="p-2 rounded-md hover:bg-gray-100">
                <User className="h-5 w-5" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Menu Mobile */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onToggle={() => setIsMobileMenuOpen(false)} 
      />
    </>
  );
};
```

---

## ✏️ Tipografia Responsiva

### 📝 Sistema de Escalas

```css
/* Tipografia Responsiva */
:root {
  /* Mobile First Font Sizes */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.8rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 0.95rem);
  --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.3rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 1.875rem);
  --text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem);
  --text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 2.75rem);
  
  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}

/* Fluid Typography Classes */
.text-fluid-xs { font-size: var(--text-xs); }
.text-fluid-sm { font-size: var(--text-sm); }
.text-fluid-base { font-size: var(--text-base); }
.text-fluid-lg { font-size: var(--text-lg); }
.text-fluid-xl { font-size: var(--text-xl); }
.text-fluid-2xl { font-size: var(--text-2xl); }
.text-fluid-3xl { font-size: var(--text-3xl); }
.text-fluid-4xl { font-size: var(--text-4xl); }

/* Responsive Headings */
.heading-1 {
  font-size: var(--text-3xl);
  line-height: var(--leading-tight);
  font-weight: 700;
}

@media (min-width: 768px) {
  .heading-1 {
    font-size: var(--text-4xl);
  }
}

.heading-2 {
  font-size: var(--text-2xl);
  line-height: var(--leading-tight);
  font-weight: 600;
}

@media (min-width: 768px) {
  .heading-2 {
    font-size: var(--text-3xl);
  }
}

.heading-3 {
  font-size: var(--text-xl);
  line-height: var(--leading-normal);
  font-weight: 600;
}

@media (min-width: 768px) {
  .heading-3 {
    font-size: var(--text-2xl);
  }
}
```

### 📖 Componente de Texto Responsivo

```typescript
// src/components/ui/Typography/ResponsiveText.tsx
import React from 'react';
import { cn } from '../../../utils/cn';

interface ResponsiveTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: 'display' | 'heading' | 'body' | 'caption' | 'overline';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  responsive?: boolean;
  className?: string;
}

export const ResponsiveText: React.FC<ResponsiveTextProps> = ({
  children,
  as: Component = 'p',
  variant = 'body',
  size = 'base',
  responsive = true,
  className
}) => {
  const textClasses = cn(
    // Base styles
    'text-gray-900',
    
    // Variant styles
    {
      'font-black tracking-tight': variant === 'display',
      'font-bold tracking-tight': variant === 'heading',
      'font-normal': variant === 'body',
      'font-medium text-sm': variant === 'caption',
      'font-semibold text-xs uppercase tracking-wide': variant === 'overline'
    },
    
    // Size styles (responsive or fixed)
    responsive ? {
      'text-fluid-xs': size === 'xs',
      'text-fluid-sm': size === 'sm',
      'text-fluid-base': size === 'base',
      'text-fluid-lg': size === 'lg',
      'text-fluid-xl': size === 'xl',
      'text-fluid-2xl': size === '2xl',
      'text-fluid-3xl': size === '3xl',
      'text-fluid-4xl': size === '4xl'
    } : {
      'text-xs': size === 'xs',
      'text-sm': size === 'sm',
      'text-base': size === 'base',
      'text-lg': size === 'lg',
      'text-xl': size === 'xl',
      'text-2xl': size === '2xl',
      'text-3xl': size === '3xl',
      'text-4xl': size === '4xl'
    },
    
    className
  );

  return (
    <Component className={textClasses}>
      {children}
    </Component>
  );
};
```

---

## 🖼️ Imagens e Mídia

### 📷 Imagens Responsivas

```typescript
// src/components/ui/Image/ResponsiveImage.tsx
import React, { useState } from 'react';
import { cn } from '../../../utils/cn';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  aspectRatio = 'auto',
  objectFit = 'cover',
  loading = 'lazy',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const containerClasses = cn(
    'relative overflow-hidden bg-gray-100',
    {
      'aspect-square': aspectRatio === 'square',
      'aspect-video': aspectRatio === '16:9',
      'aspect-[4/3]': aspectRatio === '4:3',
      'aspect-[3/2]': aspectRatio === '3:2'
    },
    className
  );

  const imageClasses = cn(
    'w-full h-full transition-opacity duration-300',
    {
      'object-cover': objectFit === 'cover',
      'object-contain': objectFit === 'contain',
      'object-fill': objectFit === 'fill',
      'object-scale-down': objectFit === 'scale-down'
    },
    isLoading ? 'opacity-0' : 'opacity-100'
  );

  if (hasError) {
    return (
      <div className={containerClasses}>
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-gray-500 text-sm">Imagem não encontrada</span>
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {/* Loading skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        className={imageClasses}
        loading={loading}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
};
```

### 🎥 Video Responsivo

```typescript
// src/components/ui/Video/ResponsiveVideo.tsx
import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ResponsiveVideoProps {
  src: string;
  poster?: string;
  className?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1';
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  customControls?: boolean;
}

export const ResponsiveVideo: React.FC<ResponsiveVideoProps> = ({
  src,
  poster,
  className,
  aspectRatio = '16:9',
  autoPlay = false,
  muted = false,
  controls = true,
  customControls = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const containerClasses = cn(
    'relative overflow-hidden rounded-lg bg-black',
    {
      'aspect-video': aspectRatio === '16:9',
      'aspect-[4/3]': aspectRatio === '4:3',
      'aspect-square': aspectRatio === '1:1'
    },
    className
  );

  return (
    <div className={containerClasses}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        controls={controls && !customControls}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Custom Controls */}
      {customControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            
            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## ⚡ Performance Mobile

### 🚀 Otimizações de Performance

```typescript
// src/hooks/useResponsiveOptimizations.ts
import { useState, useEffect } from 'react';

export const useResponsiveOptimizations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [devicePixelRatio, setDevicePixelRatio] = useState(1);

  useEffect(() => {
    // Detectar dispositivo móvel
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Detectar conexão lenta
    const checkConnection = () => {
      if ('connection' in navigator) {
        const connection = (navigator as any).connection;
        setIsSlowConnection(
          connection.effectiveType === 'slow-2g' || 
          connection.effectiveType === '2g'
        );
      }
    };

    // Detectar densidade de pixels
    const checkPixelRatio = () => {
      setDevicePixelRatio(window.devicePixelRatio || 1);
    };

    checkIfMobile();
    checkConnection();
    checkPixelRatio();

    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return {
    isMobile,
    isSlowConnection,
    devicePixelRatio,
    // Configurações otimizadas
    imageQuality: isSlowConnection ? 'low' : devicePixelRatio > 1 ? 'high' : 'medium',
    shouldPreload: !isMobile && !isSlowConnection,
    maxImageWidth: isMobile ? 640 : 1920
  };
};
```

### 📱 Componente de Carregamento Lazy

```typescript
// src/components/ui/LazyLoad/LazyComponent.tsx
import React, { Suspense, lazy } from 'react';
import { useResponsiveOptimizations } from '../../../hooks/useResponsiveOptimizations';

interface LazyComponentProps {
  componentPath: string;
  fallback?: React.ReactNode;
  loadOnMobile?: boolean;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  componentPath,
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded" />,
  loadOnMobile = true
}) => {
  const { isMobile } = useResponsiveOptimizations();

  // Se estiver no mobile e não deveria carregar, retorna placeholder
  if (isMobile && !loadOnMobile) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Componente não disponível em dispositivos móveis</p>
      </div>
    );
  }

  const LazyLoadedComponent = lazy(() => import(componentPath));

  return (
    <Suspense fallback={fallback}>
      <LazyLoadedComponent />
    </Suspense>
  );
};
```

### 🎯 Virtual Scrolling para Listas Grandes

```typescript
// src/components/ui/VirtualList/VirtualList.tsx
import React, { useState, useEffect, useRef } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  overscan?: number;
}

export function VirtualList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  overscan = 5
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const scrollElementRef = useRef<HTMLDivElement>(null);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={scrollElementRef}
      className="overflow-auto"
      style={{ height: containerHeight }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              position: 'absolute',
              top: (startIndex + index) * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight
            }}
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 🧪 Testes em Dispositivos

### 📱 Configuração de Testes Responsivos

```typescript
// cypress/support/responsive-commands.ts

// Comandos customizados para testes responsivos
Cypress.Commands.add('testResponsive', (sizes: string[]) => {
  sizes.forEach(size => {
    cy.viewport(size as any);
    cy.wait(500); // Aguarda layout se ajustar
    
    // Testa elementos críticos
    cy.get('[data-testid="header"]').should('be.visible');
    cy.get('[data-testid="main-content"]').should('be.visible');
    
    // Screenshot para comparação visual
    cy.screenshot(`responsive-${size}`);
  });
});

// Teste específico para mobile
Cypress.Commands.add('testMobile', () => {
  cy.viewport('iphone-x');
  
  // Testa menu hamburger
  cy.get('[data-testid="mobile-menu-button"]').should('be.visible');
  cy.get('[data-testid="desktop-nav"]').should('not.be.visible');
  
  // Testa interações touch
  cy.get('[data-testid="mobile-menu-button"]').click();
  cy.get('[data-testid="mobile-menu"]').should('be.visible');
});
```

### 🔍 Testes de Performance Mobile

```typescript
// tests/performance/mobile-performance.spec.ts
describe('Mobile Performance', () => {
  const devices = [
    { name: 'iPhone SE', width: 375, height: 667 },
    { name: 'iPad', width: 768, height: 1024 },
    { name: 'iPhone 12', width: 390, height: 844 }
  ];

  devices.forEach(device => {
    it(`should load quickly on ${device.name}`, () => {
      cy.viewport(device.width, device.height);
      
      // Simula conexão 3G
      cy.intercept('**/*', { throttle: 1000 });
      
      const startTime = Date.now();
      cy.visit('/');
      
      // Verifica se carregou em menos de 3 segundos
      cy.get('[data-testid="main-content"]').should('be.visible').then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(3000);
      });
    });
  });

  it('should handle touch interactions', () => {
    cy.viewport('iphone-x');
    cy.visit('/cases');
    
    // Testa swipe gesture
    cy.get('[data-testid="case-card"]').first()
      .trigger('touchstart', { touches: [{ clientX: 100, clientY: 100 }] })
      .trigger('touchmove', { touches: [{ clientX: 200, clientY: 100 }] })
      .trigger('touchend');
      
    // Verifica se ação foi executada
    cy.get('[data-testid="case-actions"]').should('be.visible');
  });
});
```

---

## 🛠️ Implementação Técnica

### ⚙️ Configuração do Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Container personalizado
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      
      // Aspect ratios customizados
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '21/9': '21 / 9',
      },
      
      // Spacing fluido
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Typography responsiva
      fontSize: {
        'fluid-sm': 'clamp(0.875rem, 0.8rem + 0.375vw, 0.95rem)',
        'fluid-base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
        'fluid-lg': 'clamp(1.125rem, 1rem + 0.625vw, 1.3rem)',
        'fluid-xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
        'fluid-2xl': 'clamp(1.5rem, 1.3rem + 1vw, 1.875rem)',
        'fluid-3xl': 'clamp(1.875rem, 1.6rem + 1.375vw, 2.25rem)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    
    // Plugin customizado para utilitários responsivos
    function({ addUtilities, theme }) {
      addUtilities({
        '.container-fluid': {
          width: '100%',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
          marginLeft: 'auto',
          marginRight: 'auto',
          '@screen sm': {
            paddingLeft: theme('spacing.6'),
            paddingRight: theme('spacing.6'),
          },
          '@screen lg': {
            paddingLeft: theme('spacing.8'),
            paddingRight: theme('spacing.8'),
          },
        },
        
        '.stack-responsive': {
          display: 'flex',
          flexDirection: 'column',
          gap: theme('spacing.4'),
          '@screen md': {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme('spacing.6'),
          },
        },
        
        '.text-responsive': {
          fontSize: 'clamp(0.875rem, 0.8rem + 0.375vw, 1rem)',
          lineHeight: '1.5',
        },
      });
    },
  ],
};
```

### 🎨 CSS Utilities Customizadas

```css
/* src/styles/responsive.css */

/* Fluid Container System */
.container-xs { max-width: 475px; }
.container-sm { max-width: 640px; }
.container-md { max-width: 768px; }
.container-lg { max-width: 1024px; }
.container-xl { max-width: 1280px; }
.container-2xl { max-width: 1536px; }

/* Responsive Display Utilities */
.hidden-mobile {
  @apply hidden md:block;
}

.hidden-desktop {
  @apply block md:hidden;
}

.mobile-only {
  @apply block sm:hidden;
}

.tablet-only {
  @apply hidden sm:block lg:hidden;
}

.desktop-only {
  @apply hidden lg:block;
}

/* Responsive Spacing */
.space-responsive > * + * {
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .space-responsive > * + * {
    margin-top: 1.5rem;
  }
}

/* Responsive Text Alignment */
.text-center-mobile {
  text-align: center;
}

@media (min-width: 768px) {
  .text-center-mobile {
    text-align: left;
  }
}

/* Safe Area Support */
.safe-area-top {
  padding-top: env(safe-area-inset-top);
}

.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom);
}

.safe-area-left {
  padding-left: env(safe-area-inset-left);
}

.safe-area-right {
  padding-right: env(safe-area-inset-right);
}

/* Touch Targets */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive Animations */
@media (prefers-reduced-motion: no-preference) {
  .animate-responsive {
    transition: all 0.3s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .animate-responsive {
    transition: none;
  }
}
```

### 🧩 Hook de Detecção de Breakpoints

```typescript
// src/hooks/useBreakpoint.ts
import { useState, useEffect } from 'react';

interface Breakpoints {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  '2xl': boolean;
}

const breakpointValues = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const useBreakpoint = () => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
  });

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowSize({
        width,
        height: window.innerHeight,
      });

      setBreakpoints({
        xs: width >= breakpointValues.xs,
        sm: width >= breakpointValues.sm,
        md: width >= breakpointValues.md,
        lg: width >= breakpointValues.lg,
        xl: width >= breakpointValues.xl,
        '2xl': width >= breakpointValues['2xl'],
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...breakpoints,
    windowSize,
    isMobile: !breakpoints.md,
    isTablet: breakpoints.md && !breakpoints.lg,
    isDesktop: breakpoints.lg,
  };
};
```

### 📏 Context de Layout Responsivo

```typescript
// src/contexts/ResponsiveContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ResponsiveContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export const useResponsive = () => {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }
  return context;
};

export const ResponsiveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contextValue, setContextValue] = useState<ResponsiveContextType>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    orientation: 'landscape',
    screenSize: 'lg',
  });

  useEffect(() => {
    const updateContext = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      let screenSize: ResponsiveContextType['screenSize'] = 'lg';
      if (width < 475) screenSize = 'xs';
      else if (width < 640) screenSize = 'sm';
      else if (width < 768) screenSize = 'md';
      else if (width < 1024) screenSize = 'lg';
      else if (width < 1280) screenSize = 'xl';
      else screenSize = '2xl';

      setContextValue({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        orientation: width > height ? 'landscape' : 'portrait',
        screenSize,
      });
    };

    updateContext();
    window.addEventListener('resize', updateContext);
    return () => window.removeEventListener('resize', updateContext);
  }, []);

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
};
```

---

**Conclusão**: Este sistema de design responsivo garante que o CaseZero funcione perfeitamente em todos os dispositivos, desde smartphones até telas de desktop ultrawide, mantendo usabilidade e performance em todas as resoluções.

**Próximo**: [18-accessibility.md](18-accessibility.md) - Acessibilidade

---


[**retornar ao índice**](./README.md)


---

**Versão**: 1.0.0  
**Última atualização**: Agosto 2025  
**Autor**: Equipe CaseZero
