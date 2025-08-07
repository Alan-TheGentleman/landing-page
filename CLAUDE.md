# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Windows 95-themed landing page built with Angular 20, featuring a nostalgic desktop interface for a professional portfolio/service website.

## Essential Commands

```bash
# Development
bun start                                    # Start dev server at localhost:4200
bun run watch                               # Build and watch for changes

# Code Quality - ALWAYS run before committing
bun run check                               # Run Biome linter and formatter
bun run lint                                # Fix linting issues
bun test                                    # Run Karma/Jasmine tests

# Production
bun run build                               # Build for production
bun run serve:ssr:landing-page-old-school  # Run SSR server
```

## Architecture

### Tech Stack
- **Angular 20** with standalone components (no NgModules)
- **Zoneless change detection** for performance
- **Signal-based state management** (not RxJS subjects)
- **SSR with hydration** enabled
- **Biome** for linting/formatting (NOT ESLint/Prettier)
- **Bun** as package manager

### Project Structure
```
src/app/
├── core/          # Layout components (header, footer)
├── pages/         # Lazy-loaded feature pages
├── shared/        # Reusable Win95 UI components
└── services/      # Business logic with signals
```

### Key Patterns

1. **Always use inject() for DI**, not constructor injection:
```typescript
private router = inject(Router);  // ✓ Correct
constructor(private router: Router) {} // ✗ Avoid
```

2. **Use signals for state management**:
```typescript
protected openFolders = signal<Set<string>>(new Set());
```

3. **Components are standalone**:
```typescript
@Component({
  standalone: true,
  imports: [CommonModule, Win95HeaderComponent],
  // ...
})
```

4. **Path aliases configured**:
- `@shared/*` → `src/app/shared/*`
- `@src/*` → `src/*`

### Windows 95 Component Library

The app has a complete Win95 UI system in `src/app/shared/`:
- `Win95DesktopComponent` - Desktop environment
- `Win95ModalComponent` - Modal windows
- `Win95IconComponent` - Desktop icons
- `Win95HeaderComponent` - Window headers
- `Win95InfoBoxComponent` - Info displays
- `Win95GroupComponent` - Content groups
- `Win95BackButtonComponent` - Navigation

### Routing

Routes defined in `src/app/app.routes.ts`:
- `/home` - Main landing (default)
- `/private-mentoring` - Individual coaching
- `/corporate-training` - Team training
- `/about` - About page

### Important Configuration

**Biome Linting Rules** (biome.json):
- Kebab-case for filenames
- PascalCase for classes/interfaces
- camelCase for variables
- 80 character line limit
- Angular-specific globals configured

**Custom Grit Rules** (grits/angular-specific.grit):
- Enforces inject() over constructor DI
- Prefers [class]/[style] over ngClass/ngStyle
- Requires lifecycle hook interfaces
- Enforces readonly for Angular properties

### Development Notes

1. **Always run `npm run check` before committing** - Biome will fix formatting/linting
2. **Use signals instead of BehaviorSubjects** for state management
3. **Components should be standalone** - no NgModules
4. **Maintain Windows 95 aesthetic** - use existing Win95 components
5. **SSR is enabled** - ensure components are SSR-compatible
6. **Zoneless mode active** - use ChangeDetectorRef.markForCheck() if needed