import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import Index from '@/pages/Index';

// Mock the components
vi.mock('@/components/AppLayout', () => ({
  default: () => <div data-testid="app-layout">App Layout Content</div>
}));

vi.mock('@/components/SEOOptimizer', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

vi.mock('@/hooks/useSEO', () => ({
  useSEO: vi.fn(),
  SEO_CONFIG: {
    home: {
      title: 'Montessori Life Skills App',
      description: 'Test',
      canonical: '/'
    }
  }
}));

describe('Index Page Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders AppLayout directly', () => {
      render(<Index />);
      expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    });

    it('renders without errors', () => {
      expect(() => render(<Index />)).not.toThrow();
    });

    it('shows app layout content', () => {
      render(<Index />);
      expect(screen.getByText('App Layout Content')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders quickly', () => {
      const startTime = performance.now();
      render(<Index />);
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(50);
    });
  });

  describe('Error Handling', () => {
    it('handles component errors gracefully', () => {
      expect(() => render(<Index />)).not.toThrow();
    });
  });
});
