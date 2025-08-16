import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import Home from '@/components/Home';

// Mock the SEO hook
vi.mock('@/hooks/useSEO', () => ({
  useSEO: vi.fn(),
  SEO_CONFIG: {
    home: {
      title: 'Montessori Life Skills App',
      description: 'Transform your child\'s learning journey',
      keywords: ['montessori', 'education', 'life skills'],
      canonical: '/'
    }
  }
}));

// Mock the hero image
vi.mock('@/assets/realistic-montessori-children.jpg', () => ({
  default: 'mocked-hero-image.jpg'
}));

describe('Home Component', () => {
  const mockProps = {
    onGetStarted: vi.fn(),
    onShopView: vi.fn(),
    onResourcesView: vi.fn(),
    onSubscriptionView: vi.fn(),
    onDashboardView: vi.fn(),
    onPracticalView: vi.fn(),
    onSensorialView: vi.fn(),
    onLanguageView: vi.fn(),
    onMathView: vi.fn(),
    onGeographyView: vi.fn(),
    onBotanyView: vi.fn(),
    onArtView: vi.fn(),
    onGraceCourtesyView: vi.fn(),
    onParentView: vi.fn(),
    onProfilesView: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the main heading correctly', () => {
      render(<Home {...mockProps} />);
      
      expect(screen.getByText('Montessori Life Skills')).toBeInTheDocument();
      expect(screen.getByText('for Every Child')).toBeInTheDocument();
    });

    it('renders the trust badge', () => {
      render(<Home {...mockProps} />);
      
      expect(screen.getByText(/Trusted by 10,000\+ families worldwide/)).toBeInTheDocument();
    });

    it('renders the hero image with correct alt text', () => {
      render(<Home {...mockProps} />);
      
      const heroImage = screen.getByAltText('Children learning with Montessori materials - puzzle and leaf');
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute('src', 'mocked-hero-image.jpg');
    });

    it('renders feature pills', () => {
      render(<Home {...mockProps} />);
      
      expect(screen.getByText('50+ Life Skills Activities')).toBeInTheDocument();
      expect(screen.getByText('100% Authentic Montessori')).toBeInTheDocument();
      expect(screen.getByText('Ages 2-6 Curriculum')).toBeInTheDocument();
      expect(screen.getByText('Safe & Secure Platform')).toBeInTheDocument();
    });

    it('renders feature section cards', () => {
      render(<Home {...mockProps} />);
      
      expect(screen.getByText('Child-Led Learning')).toBeInTheDocument();
      expect(screen.getByText('Hands-On Activities')).toBeInTheDocument();
      expect(screen.getByText('Expert Guidance')).toBeInTheDocument();
    });

    it('renders testimonials section', () => {
      render(<Home {...mockProps} />);
      
      expect(screen.getByText('Loved by Families Everywhere')).toBeInTheDocument();
      expect(screen.getByText(/My daughter loves the hands-on activities/)).toBeInTheDocument();
      expect(screen.getByText('Sarah M.')).toBeInTheDocument();
    });

    it('renders CTA section', () => {
      render(<Home {...mockProps} />);
      
      expect(screen.getByText('Ready to Transform Your Child\'s Learning?')).toBeInTheDocument();
      expect(screen.getByText(/No credit card required/)).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onGetStarted when Start Free Journey button is clicked', async () => {
      const user = userEvent.setup();
      render(<Home {...mockProps} />);
      
      const startButton = screen.getByText('Start Free Journey');
      await user.click(startButton);
      
      expect(mockProps.onGetStarted).toHaveBeenCalledTimes(1);
    });

    it('calls onGetStarted when Start Your Free Trial button is clicked', async () => {
      const user = userEvent.setup();
      render(<Home {...mockProps} />);
      
      const trialButton = screen.getByText('Start Your Free Trial');
      await user.click(trialButton);
      
      expect(mockProps.onGetStarted).toHaveBeenCalledTimes(1);
    });

    it('renders navigation menu with all props', () => {
      render(<Home {...mockProps} />);
      
      // Navigation menu should be present
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<Home {...mockProps} />);
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('has accessible buttons with proper labels', () => {
      render(<Home {...mockProps} />);
      
      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveAccessibleName();
      });
    });

    it('has properly structured testimonials', () => {
      render(<Home {...mockProps} />);
      
      // Check that testimonials have proper structure
      expect(screen.getByText('Sarah M.')).toBeInTheDocument();
      expect(screen.getByText('Maria K.')).toBeInTheDocument();
      expect(screen.getByText('David L.')).toBeInTheDocument();
    });
  });

  describe('Visual Elements', () => {
    it('renders star ratings in testimonials', () => {
      render(<Home {...mockProps} />);
      
      // Should have star icons for ratings
      const starElements = screen.getAllByText('★', { exact: false });
      expect(starElements.length).toBeGreaterThan(0);
    });

    it('renders feature icons', () => {
      render(<Home {...mockProps} />);
      
      // Check that feature cards have proper structure
      expect(screen.getByText('Child-Led Learning')).toBeInTheDocument();
      expect(screen.getByText('Hands-On Activities')).toBeInTheDocument();
      expect(screen.getByText('Expert Guidance')).toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    it('renders mobile-friendly layout', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<Home {...mockProps} />);
      
      // Should still render main content
      expect(screen.getByText('Montessori Life Skills')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders without performance issues', async () => {
      const startTime = performance.now();
      render(<Home {...mockProps} />);
      const endTime = performance.now();
      
      // Should render quickly (less than 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});