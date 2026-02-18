import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import BuilderAccess from '@/components/BuilderAccess';

describe('BuilderAccess Component', () => {
  const mockProps = {
    onEnterApp: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the main heading', () => {
      render(<BuilderAccess {...mockProps} />);
      expect(screen.getByText(/Builder Access Panel/)).toBeInTheDocument();
    });

    it('renders the Enter Montessori App button', () => {
      render(<BuilderAccess {...mockProps} />);
      const enterButton = screen.getByText('Enter Montessori App');
      expect(enterButton).toBeInTheDocument();
    });

    it('renders all status cards', () => {
      render(<BuilderAccess {...mockProps} />);
      expect(screen.getByText('App Status')).toBeInTheDocument();
      expect(screen.getByText('Creator Tools')).toBeInTheDocument();
      expect(screen.getByText('Platform Stats')).toBeInTheDocument();
    });

    it('renders creator tool buttons', () => {
      render(<BuilderAccess {...mockProps} />);
      expect(screen.getByText('Content Manager')).toBeInTheDocument();
      expect(screen.getByText('Analytics')).toBeInTheDocument();
    });

    it('displays build status', () => {
      render(<BuilderAccess {...mockProps} />);
      expect(screen.getByText('✓ Ready')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onEnterApp when Enter Montessori App button is clicked', async () => {
      const user = userEvent.setup();
      render(<BuilderAccess {...mockProps} />);
      
      const enterButton = screen.getByText('Enter Montessori App');
      await user.click(enterButton);
      
      expect(mockProps.onEnterApp).toHaveBeenCalledTimes(1);
    });

    it('renders clickable creator tool buttons', async () => {
      const user = userEvent.setup();
      render(<BuilderAccess {...mockProps} />);
      
      const contentManagerButton = screen.getByText('Content Manager');
      const analyticsButton = screen.getByText('Analytics');
      
      await user.click(contentManagerButton);
      await user.click(analyticsButton);
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<BuilderAccess {...mockProps} />);
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
    });

    it('has accessible buttons', () => {
      render(<BuilderAccess {...mockProps} />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });
  });

  describe('Performance', () => {
    it('renders quickly without performance issues', () => {
      const startTime = performance.now();
      render(<BuilderAccess {...mockProps} />);
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(50);
    });
  });
});
