// Every interface string for one language (hi). Only the chosen language is downloaded; see ../index.ts.
import { hi as core } from '../locales/core/hi';
import { hi as home } from '../locales/home/hi';
import { hi as auth } from '../locales/auth/hi';
import { hi as pricing } from '../locales/pricing/hi';
import { hi as growth } from '../locales/growth/hi';
import { hi as chrome } from '../locales/chrome/hi';
import { hi as pages } from '../locales/pages/hi';
import { hi as lesson } from '../locales/lesson/hi';
import { hi as school } from '../locales/school/hi';
import { hi as dashboard } from '../locales/dashboard/hi';
import { hi as family } from '../locales/family/hi';
import { hi as shared } from '../locales/shared/hi';

const translation = { ...core, home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
export default translation;
