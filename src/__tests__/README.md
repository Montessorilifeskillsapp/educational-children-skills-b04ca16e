# Frontend Tests

This directory contains comprehensive tests for the Montessori Life Skills App frontend.

## Test Structure

### Unit Tests
- `components/Home.test.tsx` - Tests for the Home/landing page component
- `components/BuilderAccess.test.tsx` - Tests for the builder access component
- `pages/Index.test.tsx` - Tests for the main index page

### Integration Tests
- `integration/FrontPage.integration.test.tsx` - End-to-end integration tests for the complete front page flow

## Test Coverage

### Home Component Tests
- ✅ Component rendering with all sections
- ✅ User interaction handling (button clicks)
- ✅ Accessibility compliance
- ✅ SEO integration
- ✅ Visual elements and icons
- ✅ Responsive design
- ✅ Performance benchmarks

### BuilderAccess Component Tests
- ✅ Basic rendering
- ✅ Navigation functionality
- ✅ Accessibility features
- ✅ Interactive elements

### Index Page Tests
- ✅ State management (BuilderAccess → AppLayout transition)
- ✅ Component integration
- ✅ Focus management
- ✅ Error handling

### Integration Tests
- ✅ Complete user flow from entry to main app
- ✅ Navigation integration
- ✅ Content ordering and structure
- ✅ Performance integration
- ✅ Accessibility integration

## Running Tests

```bash
# Run all tests
npm run test

# Run tests with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Run specific test file
npx vitest src/__tests__/components/Home.test.tsx

# Run in watch mode (default for development)
npx vitest
```

## Test Configuration

- **Testing Framework**: Vitest
- **Testing Library**: @testing-library/react
- **User Events**: @testing-library/user-event
- **DOM Testing**: @testing-library/dom
- **Assertions**: @testing-library/jest-dom
- **Environment**: jsdom

## Key Testing Principles

### 1. User-Centric Testing
Tests focus on what users actually see and interact with, not implementation details.

### 2. Accessibility First
All tests include accessibility checks to ensure the app is usable by everyone.

### 3. Performance Monitoring
Tests include performance benchmarks to catch regressions early.

### 4. Real User Flows
Integration tests simulate actual user journeys through the application.

### 5. Comprehensive Coverage
Tests cover rendering, interactions, edge cases, and error states.

## Test Utilities

### Custom Render
The `test-utils.tsx` file provides a custom render function that wraps components with all necessary providers:
- ThemeProvider
- ProfileProvider
- SubscriptionProvider
- AppProvider
- CartProvider
- Router

### Mocking Strategy
- SEO hooks are mocked for predictable testing
- Image assets are mocked to avoid loading issues
- Supabase is mocked for isolated unit tests
- Performance APIs are used for benchmark testing

## Best Practices

1. **Test Behavior, Not Implementation** - Focus on what the user experiences
2. **Use Semantic Queries** - Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Test Accessibility** - Include screen reader and keyboard navigation tests
4. **Mock External Dependencies** - Keep tests focused and fast
5. **Test Error States** - Ensure graceful handling of edge cases

## Continuous Integration

These tests are designed to run in CI/CD pipelines and will:
- Catch regressions in user-facing functionality
- Ensure accessibility compliance
- Monitor performance characteristics
- Validate complete user flows

## Contributing

When adding new features:
1. Add unit tests for new components
2. Update integration tests for new user flows
3. Include accessibility tests
4. Add performance benchmarks for critical paths
5. Update this README with new test descriptions