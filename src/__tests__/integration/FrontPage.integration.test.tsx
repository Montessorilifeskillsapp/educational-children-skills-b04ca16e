import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';

// Mock the complex components to focus on integration
vi.mock('@/hooks/useSEO', () => ({
  useSEO: vi.fn(),
  SEO_CONFIG: {
    home: {
      title: 'Montessori Life Skills App',
      description: 'Transform your child\'s learning journey',
      canonical: '/'
    }
  }
}));

vi.mock('@/assets/realistic-montessori-children.jpg', () => ({
  default: 'mocked-hero-image.jpg'
}));

// Mock Supabase
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({ data: [], error: null })
      })
    }),
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } })
    }
  }
}));

describe('Front Page Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete User Flow', () => {
    it('shows BuilderAccess by default and allows entry to app', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      // Should show BuilderAccess initially
      expect(screen.getByText('Enter Montessori App')).toBeInTheDocument();
      
      // Click to enter the app
      await user.click(screen.getByText('Enter Montessori App'));
      
      // Should now show the main app content (Home component)
      expect(screen.getByText('Montessori Life Skills')).toBeInTheDocument();
      expect(screen.getByText('for Every Child')).toBeInTheDocument();
    });

    it('displays complete landing page content after entering app', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      // Enter the app
      await user.click(screen.getByText('Enter Montessori App'));
      
      // Check main sections are present
      expect(screen.getByText('Montessori Life Skills')).toBeInTheDocument();
      expect(screen.getByText(/Trusted by.*families worldwide/)).toBeInTheDocument();
      expect(screen.getByText('Why Parents Choose Our Platform')).toBeInTheDocument();
      expect(screen.getByText('Loved by Families Everywhere')).toBeInTheDocument();
      expect(screen.getByText('Ready to Transform Your Child\'s Learning?')).toBeInTheDocument();
    });

    it('shows all feature highlights', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      await user.click(screen.getByText('Enter Montessori App'));
      
      // Check feature pills
      expect(screen.getByText('50+ Life Skills Activities')).toBeInTheDocument();
      expect(screen.getByText('100% Authentic Montessori')).toBeInTheDocument();
      expect(screen.getByText('Ages 2-6 Curriculum')).toBeInTheDocument();
      expect(screen.getByText('Safe & Secure Platform')).toBeInTheDocument();
    });

    it('displays testimonials section correctly', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      await user.click(screen.getByText('Enter Montessori App'));
      
      // Check testimonials
      expect(screen.getByText(/My daughter loves the hands-on activities/)).toBeInTheDocument();
      expect(screen.getByText(/Finally, authentic Montessori education/)).toBeInTheDocument();
      expect(screen.getByText(/The progress tracking helps me see/)).toBeInTheDocument();
      
      // Check testimonial authors
      expect(screen.getByText('Sarah M.')).toBeInTheDocument();
      expect(screen.getByText('Maria K.')).toBeInTheDocument();
      expect(screen.getByText('David L.')).toBeInTheDocument();
    });

    it('has multiple CTA buttons that work', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      await user.click(screen.getByText('Enter Montessori App'));
      
      // Should have Start Free Journey and Start Your Free Trial buttons
      const startFreeJourneyButton = screen.getByText('Start Free Journey');
      const startFreeTrialButton = screen.getByText('Start Your Free Trial');
      
      expect(startFreeJourneyButton).toBeInTheDocument();
      expect(startFreeTrialButton).toBeInTheDocument();
      
      // Both should be clickable
      expect(startFreeJourneyButton).toBeEnabled();
      expect(startFreeTrialButton).toBeEnabled();
    });
  });

  describe('Navigation Integration', () => {
    it('shows navigation menu when in main app', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      await user.click(screen.getByText('Enter Montessori App'));
      
      // Navigation should be present
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('loads the complete front page quickly', async () => {
      const user = userEvent.setup();
      
      const startTime = performance.now();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      await user.click(screen.getByText('Enter Montessori App'));
      
      const endTime = performance.now();
      
      // Complete flow should be fast
      expect(endTime - startTime).toBeLessThan(200);
    });
  });

  describe('Accessibility Integration', () => {
    it('maintains proper focus management throughout flow', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      const enterButton = screen.getByText('Enter Montessori App');
      enterButton.focus();
      expect(enterButton).toHaveFocus();
      
      await user.click(enterButton);
      
      // After entering app, should have proper heading structure
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it('has proper semantic structure throughout', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      await user.click(screen.getByText('Enter Montessori App'));
      
      // Should have proper heading hierarchy
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      
      // Should have navigation
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      
      // Should have buttons
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Content Integration', () => {
    it('displays all required content sections in correct order', async () => {
      const user = userEvent.setup();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      await user.click(screen.getByText('Enter Montessori App'));
      
      // Get all text content
      const bodyText = document.body.textContent || '';
      
      // Check that sections appear in logical order
      const heroIndex = bodyText.indexOf('Montessori Life Skills');
      const trustIndex = bodyText.indexOf('Trusted by');
      const featuresIndex = bodyText.indexOf('Why Parents Choose');
      const testimonialsIndex = bodyText.indexOf('Loved by Families');
      const ctaIndex = bodyText.indexOf('Ready to Transform');
      
      // Sections should appear in order
      expect(heroIndex).toBeLessThan(trustIndex);
      expect(trustIndex).toBeLessThan(featuresIndex);
      expect(featuresIndex).toBeLessThan(testimonialsIndex);
      expect(testimonialsIndex).toBeLessThan(ctaIndex);
    });
  });
});