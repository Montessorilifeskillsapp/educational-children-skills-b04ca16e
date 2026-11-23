// Every interface string for one language (es). Only the chosen language is downloaded; see ../index.ts.
import { es as core } from '../locales/core/es';
import { es as home } from '../locales/home/es';
import { es as auth } from '../locales/auth/es';
import { es as pricing } from '../locales/pricing/es';
import { es as growth } from '../locales/growth/es';
import { es as chrome } from '../locales/chrome/es';
import { es as pages } from '../locales/pages/es';
import { es as lesson } from '../locales/lesson/es';
import { es as school } from '../locales/school/es';
import { es as dashboard } from '../locales/dashboard/es';
import { es as family } from '../locales/family/es';
import { es as shared } from '../locales/shared/es';

const translation = { ...core, home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
export default translation;
