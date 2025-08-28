# Copilot Instructions for Vocdoni UI Scaffold

This file provides GitHub Copilot with context about the Vocdoni UI Scaffold project to generate better code suggestions.

## Project Overview

Vocdoni UI Scaffold is a multi-tenant SaaS platform for creating and managing blockchain-based voting processes. The application enables organizations to create secure, transparent elections with Web3 wallet integration.

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Chakra UI for components and theming
- **State Management**: TanStack Query for server state, React Hook Form for forms
- **Routing**: React Router v6
- **Web3**: Wagmi + RainbowKit for wallet integration
- **Blockchain**: Vocdoni SDK for voting protocol
- **Internationalization**: i18next (English, Spanish, Catalan)
- **Styling**: Emotion (via Chakra UI)

## Code Conventions

### Imports and File Structure
- Use `~` alias for src root imports: `import { Component } from '~components/Feature'`
- Prefer absolute imports over relative imports
- Components import from `@vocdoni/chakra-components` for shared UI elements

### Naming Conventions
- **Components**: PascalCase (e.g., `SignIn.tsx`, `Dashboard/Organization.tsx`)
- **Hooks and utilities**: camelCase (e.g., `use-account-health-tools.tsx`)
- **Route directories**: kebab-case when nested
- **Types and interfaces**: PascalCase with descriptive names

### Code Style
- **NEVER add comments unless explicitly requested**
- Follow existing code patterns and conventions in each file
- Use functional components with hooks
- Prefer const assertions and explicit typing when beneficial
- Use existing libraries and utilities already in the codebase
- Prefer array destructuring over direct index access

## Architecture Patterns

### Provider Hierarchy
The app uses a nested provider structure in `src/Providers.tsx`:
```
Theme → WagmiConfig → QueryClientProvider → ClientProvider → SaasProviders → RoutesProvider
```
Where `SaasProviders` wraps: `AuthProvider → SubscriptionProvider → SaasAccountProvider`

### Component Organization
- `src/components/` - Feature-based components (Auth, Organization, Process, etc.)
- `src/components/shared/` - Reusable UI components
- `src/elements/` - Page-level components combining multiple features
- `src/theme/` - Chakra UI theme customizations

### State Management Patterns
- **TanStack Query** for all server state with query keys in `src/queries/keys.ts`
- **Context providers** for auth, subscription, and organization state
- **React Hook Form** for form state management
- **Chakra UI** for theme and UI state

### Route Protection
- Use `AccountProtectedRoute` for authentication-required routes
- Use `OrganizationProtectedRoute` for organization-specific routes
- Routes organized in `src/router/routes/` with hooks returning configurations

## Technology-Specific Guidelines

### React Patterns
- Use functional components with hooks
- Prefer `useCallback` and `useMemo` for performance optimization
- Use `useEffect` with proper dependency arrays
- Handle loading and error states consistently

### Chakra UI
- Use Chakra's built-in responsive design patterns
- Follow the design system tokens for spacing, colors, and typography
- Prefer Chakra components over custom HTML elements
- Use `useColorModeValue` for dark/light mode support

### TanStack Query
- Define query keys in `src/queries/keys.ts`
- Use consistent patterns for queries, mutations, and invalidation
- Handle loading, error, and success states
- Implement optimistic updates for better UX
- Store queries alongside their related components

### React Hook Form
- Use `useForm` with TypeScript types
- Implement proper validation with clear error messages
- Use `FormProvider` for complex forms with nested components
- Handle form submission with proper error handling

### Internationalization with i18next
- Always use `useTranslation` hook: `const { t } = useTranslation()`
- For complex text with formatting and/or interpolation, use `<Trans />` component
- Define translatable strings in locale files
- Use descriptive keys for translation strings

### Web3/Wagmi Integration
- Use Wagmi hooks for wallet operations
- Handle wallet connection states properly
- Implement proper error handling for blockchain transactions
- Use RainbowKit for wallet connection UI

### Environment Variables
- Access environment variables via `import.meta.env.VARIABLE_NAME`
- Use environment-specific configurations from `src/constants/index.ts`
- Support multiple environments: dev, stg, prod

## Development Workflow

### Commands
- `yarn dev` or `yarn start` - Development server (http://localhost:5173)
- `yarn build` - Production build
- `yarn lint` - TypeScript compiler and Prettier checks
- `yarn lint:fix` - Fix formatting with Prettier
- `yarn translations` - Extract i18n strings

### Quality Assurance
- Always run `yarn lint` after making changes
- Ensure TypeScript compilation passes
- Test manually (no automated test runner configured)
- Verify responsive design and accessibility

## Common Patterns

### API Integration
- Use TanStack Query for all API calls
- Implement proper error handling with toast notifications
- Use consistent loading states across components
- Handle authentication errors appropriately

### Form Handling
- Use React Hook Form with TypeScript
- Implement validation with clear user feedback
- Handle submission states (loading, success, error)
- Use Chakra UI form components consistently

### Routing
- Use React Router v6 patterns
- Implement protected routes with proper redirects
- Handle route parameters and search params
- Use navigation hooks appropriately

### Error Handling
- Use Chakra UI toast for user notifications
- Implement error boundaries where appropriate
- Provide meaningful error messages
- Handle network and authentication errors gracefully

## Multi-tenant Features
- Organization switching and management
- User role management (admin, member)
- Subscription-based feature gating
- White-label customization support

## Deployment Architecture
- `develop` branch → app-dev.vocdoni.io (dev environment)
- `stage` branch → app-stg.vocdoni.io (staging environment)
- `main` branch → app.vocdoni.io (production environment)

When generating code suggestions, prioritize patterns and conventions already established in the codebase. Always consider the multi-tenant nature of the application and the Web3/blockchain integration requirements.

Do not reinterpret the application logic or make assumptions about the flow. Do not propose adjustments unless there is a clear contradiction with what is documented or stated in comments. If the flow seems incomplete or ambiguous, stick to the existing patterns and comments without inventing alternatives.
