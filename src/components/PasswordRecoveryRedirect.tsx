import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isPasswordRecoveryPending, PASSWORD_RECOVERY_EVENT } from '@/lib/passwordRecovery';

/** Keeps someone who opened a reset link on the "Choose a new password" form until they finish or skip it. */
const PasswordRecoveryRedirect = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const [signal, setSignal] = useState(0);

  useEffect(() => {
    const onRecovery = () => setSignal((n) => n + 1);
    window.addEventListener(PASSWORD_RECOVERY_EVENT, onRecovery);
    return () => window.removeEventListener(PASSWORD_RECOVERY_EVENT, onRecovery);
  }, []);

  useEffect(() => {
    if (!isPasswordRecoveryPending()) return;
    // The callback page decides first (it may need to hand the link back to the phone app).
    if (pathname === '/auth/callback') return;
    const params = new URLSearchParams(search);
    if (pathname === '/auth' && (params.get('reset') === '1' || params.has('reset_token'))) return;
    navigate('/auth?reset=1', { replace: true });
  }, [pathname, search, signal, navigate]);

  return null;
};

export default PasswordRecoveryRedirect;
