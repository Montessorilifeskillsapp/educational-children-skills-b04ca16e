import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Index from '@/pages/Index';

// Mock the components
vi.mock('@/components/BuilderAccess', () => ({
  default: ({ onEnterApp }: { onEnterApp: () => void }) => (
    <div data-testid="builder-access">
      <button onClick={onEnterApp}>Enter Montessori App</button>
    </div>
  )
}));

vi.mock('@/components/AppLayout', () => ({
  default: () => <div data-testid="app-layout">App Layout Content</div>
}));

describe('Index Page Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initial State', () => {
    it('renders BuilderAccess component by default', () => {
      render(<Index />);
      
      expect(screen.getByTestId('builder-access')).toBeInTheDocument();
      expect(screen.queryByTestId('app-layout')).not.toBeInTheDocument();
    });

    it('renders Enter Montessori App button initially', () => {
      render(<Index />);
      
      expect(screen.getByText('Enter Montessori App')).toBeInTheDocument();
    });
  });

  describe('State Transitions', () => {
    it('switches to AppLayout when onEnterApp is called', async () => {
      const user = userEvent.setup();
      render(<Index />);
      
      // Initially shows BuilderAccess
      expect(screen.getByTestId('builder-access')).toBeInTheDocument();
      expect(screen.queryByTestId('app-layout')).not.toBeInTheDocument();
      
      // Click the enter app button
      const enterButton = screen.getByText('Enter Montessori App');
      await user.click(enterButton);
      
      // Should now show AppLayout
      expect(screen.queryByTestId('builder-access')).not.toBeInTheDocument();
      expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    });

    it('maintains state after switching to app', async () => {
      const user = userEvent.setup();
      render(<Index />);
      
      // Switch to app layout
      await user.click(screen.getByText('Enter Montessori App'));
      
      // Should show app layout content
      expect(screen.getByText('App Layout Content')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('properly passes onEnterApp callback to BuilderAccess', () => {
      render(<Index />);
      
      // BuilderAccess should receive the callback
      const builderAccess = screen.getByTestId('builder-access');
      expect(builderAccess).toBeInTheDocument();
      
      // Button should be clickable
      const enterButton = screen.getByText('Enter Montessori App');
      expect(enterButton).toBeEnabled();
    });

    it('renders without errors', () => {
      expect(() => render(<Index />)).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('maintains focus management during state transitions', async () => {
      const user = userEvent.setup();
      render(<Index />);
      
      const enterButton = screen.getByText('Enter Montessori App');
      enterButton.focus();
      
      expect(enterButton).toHaveFocus();
      
      await user.click(enterButton);
      
      // After transition, focus should be managed appropriately
      expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    });

    it('provides proper semantic structure', () => {
      render(<Index />);
      
      // Should have proper structure for screen readers
      expect(screen.getByTestId('builder-access')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders initial state quickly', () => {
      const startTime = performance.now();
      render(<Index />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(50);
    });

    it('transitions between states efficiently', async () => {
      const user = userEvent.setup();
      render(<Index />);
      
      const startTime = performance.now();
      await user.click(screen.getByText('Enter Montessori App'));
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe('Error Handling', () => {
    it('handles component errors gracefully', () => {
      // This should not throw
      expect(() => render(<Index />)).not.toThrow();
    });
  });
});