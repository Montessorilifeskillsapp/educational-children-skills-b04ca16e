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
    it('renders the brand wordmark', () => {
      renderHome();
      expect(screen.getAllByText('Montessori Life Skills').length).toBeGreaterThan(0);
    });

    it('renders curriculum nav links', () => {
      renderHome();
      expect(screen.getAllByText('Practical Life').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Sensorial').length).toBeGreaterThan(0);
      expect(screen.getAllByText('Math').length).toBeGreaterThan(0);
    });

    it('identifies the app as an adult preparation guide', () => {
      renderHome();
      expect(screen.getByRole('heading', { name: /Montessori presentation guidance for adults/ })).toBeInTheDocument();
      expect(screen.getByText(/the child’s work takes place with real materials, away from the screen/i)).toBeInTheDocument();
    });

    it('renders CTA section', () => {
      renderHome();
      expect(screen.getAllByText(/Start Free/i).length).toBeGreaterThan(0);
    });
  });

  describe('User Interactions', () => {
    it('calls onGetStarted when Start Free button is clicked', async () => {
      const onGetStarted = vi.fn();
      const user = userEvent.setup();
      renderHome({ onGetStarted });

      const startButtons = screen.getAllByRole('button', { name: /start free/i });
      await user.click(startButtons[0]);

      expect(onGetStarted).toHaveBeenCalled();
    });

    it('renders mobile menu trigger', () => {
      renderHome();
      expect(screen.getByLabelText(/open section menu/i)).toBeInTheDocument();
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

    it('does not render fabricated testimonials or social proof', () => {
      renderHome();
      expect(screen.queryByText('Sarah M.')).not.toBeInTheDocument();
      expect(screen.queryByText('Maria K.')).not.toBeInTheDocument();
      expect(screen.queryByText('David L.')).not.toBeInTheDocument();
      expect(screen.queryByText(/2,000\+ reviews/i)).not.toBeInTheDocument();
    });
  });

  describe('Performance', () => {
    it('renders without performance issues', async () => {
      const startTime = performance.now();
      renderHome();
      const endTime = performance.now();
      // jsdom render timing is machine-dependent; guard against pathological regressions only
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});
