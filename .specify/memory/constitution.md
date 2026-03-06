# HansRepublic Constitution

## Core Principles

### I. Code Quality (NON-NEGOTIABLE)
All code MUST meet the highest quality standards. This includes: strict TypeScript type safety with no implicit any; comprehensive unit tests for all business logic; ESLint and Prettier enforcement with zero warnings; proper error handling with meaningful messages; and documented public APIs. Code quality is not optional—it is the foundation of maintainable software.

### II. Clean Code
Code MUST be readable, maintainable, and follow the Single Responsibility Principle. Functions must do one thing and do it well, with descriptive names that avoid abbreviations. YAGNI (You Aren't Gonna Need It) MUST guide all additions—never implement features "just in case." Keep functions under 50 lines, classes under 200 lines. Remove dead code immediately. Technical debt MUST be addressed in dedicated refactoring sprints.

### III. Responsive Design (NON-NEGIABLE)
All user interfaces MUST be built mobile-first. Breakpoints MUST be defined using CSS custom properties for consistency. Touch targets MUST be at least 44x44 pixels. Images MUST use responsive techniques (srcset, modern formats). Typography MUST use fluid scales that adapt to viewport. Performance budgets: First Contentful Paint under 1.5s, Largest Contentful Paint under 2.5s on mobile.

### IV. Consistent User Experience
The user experience MUST be consistent across all touchpoints. Use a design system with defined tokens for colors, spacing, typography, and shadows. Components MUST follow consistent patterns for interaction, feedback, and transitions. Accessibility is not optional—WCAG 2.1 AA compliance is mandatory. All interactive elements MUST have proper focus management and keyboard navigation.

## Quality Standards

### Testing Requirements
- Unit tests: Minimum 80% coverage for business logic
- Integration tests: Required for all API endpoints and service interactions
- E2E tests: Required for critical user journeys only
- Tests MUST be written before implementation (TDD)
- All tests MUST pass before merge

### Code Review Standards
- All changes require at least one approving review
- Linting and formatting checks MUST pass
- Type checking MUST pass with strict mode
- Performance impact MUST be considered for UI changes
- Security implications MUST be reviewed

## Development Workflow

### Commit Standards
- Commits MUST follow conventional commits format
- Each commit MUST be atomic and functional
- Commit messages MUST describe what and why, not how
- Squash related commits before merging

### Documentation
- Public APIs MUST have JSDoc comments
- Complex logic MUST include explanatory comments
- README files MUST include setup, usage, and testing instructions
- Architecture decisions MUST be documented in ADR format

## Governance

### Amendment Procedure
Constitution amendments require: a proposal with rationale, review by at least two maintainers, and a migration plan if breaking changes are introduced. Version bumps follow semantic versioning: MAJOR for principle removals, MINOR for additions, PATCH for clarifications.

### Compliance Verification
Every pull request MUST verify compliance with these principles. The Constitution Check in plan.md serves as the gating mechanism. Violations MUST be documented with justification in the Complexity Tracking section.

**Version**: 1.0.0 | **Ratified**: 2026-03-06 | **Last Amended**: 2026-03-06
