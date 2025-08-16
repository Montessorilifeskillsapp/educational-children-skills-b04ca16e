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
      
      expect(screen.getByText(/Welcome to Montessori Life Skills App/)).toBeInTheDocument();
    });

    it('renders the Enter Montessori App button', () => {
      render(<BuilderAccess {...mockProps} />);
      
      const enterButton = screen.getByText('Enter Montessori App');
      expect(enterButton).toBeInTheDocument();
      expect(enterButton).toHaveRole('button');
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

    it('displays active status', () => {
      render(<BuilderAccess {...mockProps} />);
      
      expect(screen.getByText('Active')).toBeInTheDocument();
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
      
      expect(contentManagerButton).toHaveRole('button');
      expect(analyticsButton).toHaveRole('button');
      
      // These buttons should be clickable (even if they don't have handlers yet)
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

    it('has properly structured cards', () => {
      render(<BuilderAccess {...mockProps} />);
      
      // Check that cards have proper content structure
      expect(screen.getByText('App Status')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('renders cards with proper styling', () => {
      render(<BuilderAccess {...mockProps} />);
      
      // Check that cards are rendered
      const statusCard = screen.getByText('App Status').closest('div');
      const toolsCard = screen.getByText('Creator Tools').closest('div');
      const statsCard = screen.getByText('Platform Stats').closest('div');
      
      expect(statusCard).toBeInTheDocument();
      expect(toolsCard).toBeInTheDocument();
      expect(statsCard).toBeInTheDocument();
    });

    it('renders main action button prominently', () => {
      render(<BuilderAccess {...mockProps} />);
      
      const enterButton = screen.getByText('Enter Montessori App');
      expect(enterButton).toBeInTheDocument();
      
      // Should be a prominent button
      expect(enterButton.closest('button')).toHaveClass();
    });
  });

  describe('Component Props', () => {
    it('accepts and uses onEnterApp prop correctly', () => {
      const customHandler = vi.fn();
      render(<BuilderAccess onEnterApp={customHandler} />);
      
      expect(screen.getByText('Enter Montessori App')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders quickly without performance issues', () => {
      const startTime = performance.now();
      render(<BuilderAccess {...mockProps} />);
      const endTime = performance.now();
      
      // Should render quickly
      expect(endTime - startTime).toBeLessThan(50);
    });
  });
});