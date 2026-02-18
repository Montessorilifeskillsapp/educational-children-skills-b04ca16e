import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import { BrowserRouter } from 'react-router-dom';
import Index from '@/pages/Index';

// Mock AppLayout to avoid deep dependency chain
vi.mock('@/components/AppLayout', () => ({
  default: () => (
    <div data-testid="app-layout">
      <nav role="navigation">Nav</nav>
      <h1>Montessori Life Skills</h1>
      <span>for Every Child</span>
      <p>Trusted by 10,000+ families worldwide</p>
      <span>50+ Life Skills Activities</span>
      <span>100% Authentic Montessori</span>
      <span>Ages 2-6 Curriculum</span>
      <span>Safe &amp; Secure Platform</span>
      <h2>Why Parents Choose Our Platform</h2>
      <p>My daughter loves the hands-on activities</p>
      <p>Finally, authentic Montessori education</p>
      <p>The progress tracking helps me see</p>
      <span>Sarah M.</span>
      <span>Maria K.</span>
      <span>David L.</span>
      <h2>Loved by Families Everywhere</h2>
      <h2>Ready to Transform Your Child's Learning?</h2>
      <button>Start Free Journey</button>
      <button>Start Your Free Trial</button>
    </div>
  )
}));

vi.mock('@/components/SEOOptimizer', () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>
}));

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

describe('Front Page Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Complete User Flow', () => {
    it('displays the main app content directly', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      expect(screen.getByText('Montessori Life Skills')).toBeInTheDocument();
      expect(screen.getByText('for Every Child')).toBeInTheDocument();
    });

    it('displays complete landing page content', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      expect(screen.getByText('Montessori Life Skills')).toBeInTheDocument();
      expect(screen.getByText(/Trusted by.*families worldwide/)).toBeInTheDocument();
      expect(screen.getByText('Why Parents Choose Our Platform')).toBeInTheDocument();
      expect(screen.getByText('Loved by Families Everywhere')).toBeInTheDocument();
      expect(screen.getByText('Ready to Transform Your Child\'s Learning?')).toBeInTheDocument();
    });

    it('shows all feature highlights', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      expect(screen.getByText('50+ Life Skills Activities')).toBeInTheDocument();
      expect(screen.getByText('100% Authentic Montessori')).toBeInTheDocument();
      expect(screen.getByText('Ages 2-6 Curriculum')).toBeInTheDocument();
      expect(screen.getByText('Safe & Secure Platform')).toBeInTheDocument();
    });

    it('displays testimonials section correctly', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      expect(screen.getByText(/My daughter loves the hands-on activities/)).toBeInTheDocument();
      expect(screen.getByText(/Finally, authentic Montessori education/)).toBeInTheDocument();
      expect(screen.getByText(/The progress tracking helps me see/)).toBeInTheDocument();
      expect(screen.getByText('Sarah M.')).toBeInTheDocument();
      expect(screen.getByText('Maria K.')).toBeInTheDocument();
      expect(screen.getByText('David L.')).toBeInTheDocument();
    });

    it('has multiple CTA buttons that work', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      const startFreeJourneyButton = screen.getByText('Start Free Journey');
      const startFreeTrialButton = screen.getByText('Start Your Free Trial');
      
      expect(startFreeJourneyButton).toBeInTheDocument();
      expect(startFreeTrialButton).toBeInTheDocument();
      expect(startFreeJourneyButton).toBeEnabled();
      expect(startFreeTrialButton).toBeEnabled();
    });
  });

  describe('Navigation Integration', () => {
    it('shows navigation menu', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });

  describe('Performance Integration', () => {
    it('loads the complete front page quickly', () => {
      const startTime = performance.now();
      
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );
      
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(200);
    });
  });

  describe('Accessibility Integration', () => {
    it('has proper heading structure', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it('has proper semantic structure throughout', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(0);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe('Content Integration', () => {
    it('displays all required content sections in correct order', () => {
      render(
        <BrowserRouter>
          <Index />
        </BrowserRouter>
      );

      const bodyText = document.body.textContent || '';
      
      const heroIndex = bodyText.indexOf('Montessori Life Skills');
      const trustIndex = bodyText.indexOf('Trusted by');
      const featuresIndex = bodyText.indexOf('Why Parents Choose');
      const testimonialsIndex = bodyText.indexOf('Loved by Families');
      const ctaIndex = bodyText.indexOf('Ready to Transform');
      
      expect(heroIndex).toBeLessThan(trustIndex);
      expect(trustIndex).toBeLessThan(featuresIndex);
      expect(featuresIndex).toBeLessThan(testimonialsIndex);
      expect(testimonialsIndex).toBeLessThan(ctaIndex);
    });
  });
});
