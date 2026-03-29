import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
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

// Mock AuthProvider
vi.mock('@/components/AuthProvider', () => ({
  useAuthContext: () => ({
    user: null,
    loading: false,
    signIn: vi.fn(),
    signUp: vi.fn(),
    signOut: vi.fn(),
    signInWithGoogle: vi.fn(),
    signInWithApple: vi.fn(),
  })
}));

// Mock MobileSecurityProvider
vi.mock('@/components/MobileSecurityProvider', () => ({
  useMobileSecurity: () => ({
    isSecure: true,
    securityStatus: 'secure',
  }),
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('@/hooks/useMobileSecurity', () => ({
  useMobileSecurity: () => ({
    isSecure: true,
    securityStatus: 'secure',
  }),
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

const renderHome = (props = {}) => {
  const defaultProps = {
    onGetStarted: vi.fn(),
    onShopView: vi.fn(),
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
    ...props,
  };

  return render(
    <BrowserRouter>
      <Home {...defaultProps} />
    </BrowserRouter>
  );
};

describe('Home Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the main heading correctly', () => {
      renderHome();
      expect(screen.getByText('Montessori Life Skills')).toBeInTheDocument();
      expect(screen.getByText('for Every Child')).toBeInTheDocument();
    });

    it('renders the trust badge', () => {
      renderHome();
      expect(screen.getByText(/Trusted by 10,000\+ families worldwide/)).toBeInTheDocument();
    });

    it('renders the hero image with correct alt text', () => {
      renderHome();
      const heroImage = screen.getByAltText('Children learning with Montessori materials - puzzle and leaf');
      expect(heroImage).toBeInTheDocument();
      expect(heroImage).toHaveAttribute('src', 'mocked-hero-image.jpg');
    });

    it('renders feature pills', () => {
      renderHome();
      expect(screen.getByText('50+ Life Skills Activities')).toBeInTheDocument();
      expect(screen.getByText('100% Authentic Montessori')).toBeInTheDocument();
      expect(screen.getByText('Ages 2-6 Curriculum')).toBeInTheDocument();
      expect(screen.getByText('Safe & Secure Platform')).toBeInTheDocument();
    });

    it('renders feature section cards', () => {
      renderHome();
      expect(screen.getByText('Child-Led Learning')).toBeInTheDocument();
      expect(screen.getByText('Hands-On Activities')).toBeInTheDocument();
      expect(screen.getByText('Expert Guidance')).toBeInTheDocument();
    });

    it('renders testimonials section', () => {
      renderHome();
      expect(screen.getByText('Loved by Families Everywhere')).toBeInTheDocument();
      expect(screen.getByText(/My daughter loves the hands-on activities/)).toBeInTheDocument();
      expect(screen.getByText('Sarah M.')).toBeInTheDocument();
    });

    it('renders CTA section', () => {
      renderHome();
      expect(screen.getByText('Ready to Transform Your Child\'s Learning?')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('calls onGetStarted when Start Free Journey button is clicked', async () => {
      const onGetStarted = vi.fn();
      const user = userEvent.setup();
      renderHome({ onGetStarted });
      
      const startButton = screen.getByText('Start Free Journey');
      await user.click(startButton);
      
      expect(onGetStarted).toHaveBeenCalledTimes(1);
    });

    it('calls onGetStarted when Start Your Free Trial button is clicked', async () => {
      const onGetStarted = vi.fn();
      const user = userEvent.setup();
      renderHome({ onGetStarted });
      
      const trialButton = screen.getByText('Start Your Free Trial');
      await user.click(trialButton);
      
      expect(onGetStarted).toHaveBeenCalledTimes(1);
    });

    it('renders menu button', () => {
      renderHome();
      expect(screen.getByText('Menu')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderHome();
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('has properly structured testimonials', () => {
      renderHome();
      expect(screen.getByText('Sarah M.')).toBeInTheDocument();
      expect(screen.getByText('Maria K.')).toBeInTheDocument();
      expect(screen.getByText('David L.')).toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders without performance issues', async () => {
      const startTime = performance.now();
      renderHome();
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100);
    });
  });
});
