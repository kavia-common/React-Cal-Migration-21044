# React-Cal-Migration

Modern React calculator migrated from a jQuery implementation.

## Features
- Component architecture: Calculator (container), Display, Keypad, Button.
- Pure calc engine in `src/utils/calcEngine.ts`.
- Hook-based state and keyboard support in `src/hooks/useCalculator.ts`.
- Operations: +, -, ×, ÷, decimal, percent, +/- toggle, clear (AC), equals (=), backspace (⌫).
- Accessibility: aria-live display, labeled controls, focus rings.
- Responsive styling with CSS Grid.

## Getting Started
1. Install dependencies
   - npm: `npm install`
   - pnpm: `pnpm install`
   - yarn: `yarn`

2. Run the app (Vite)
   - `npm run dev`
   - Open http://localhost:5173

3. Build
   - `npm run build` (unit tests are run with Vitest; test files are excluded from the TypeScript build)

4. Tests (Vitest)
   - `npm test`
   - Watch: `npm run test:watch`

## Keyboard Shortcuts
- Digits 0–9: enter numbers
- Decimal: `.` or `,`
- Operators: `+`, `-`, `*` (`x`), `/`
- Evaluate: `Enter` or `=`
- Clear: `Esc`
- Delete: `Backspace`
- Percent: `%`

## Files of Interest
- `src/components/calculator/Calculator.tsx`
- `src/components/calculator/Display.tsx`
- `src/components/calculator/Keypad.tsx`
- `src/components/calculator/Button.tsx`
- `src/hooks/useCalculator.ts`
- `src/utils/calcEngine.ts`
- `src/styles/calculator.css`
- `src/__tests__/calcEngine.test.ts`

## Accessibility
- Buttons are reachable via keyboard tab order.
- Display announces changes via aria-live region.
- Visible focus ring for keyboard users.

Refer to docs/migration/jquery-to-react-calculator-migration.md for architectural guidance.
