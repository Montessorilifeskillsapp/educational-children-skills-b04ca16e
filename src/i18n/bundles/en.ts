// Every interface string for one language (en). Only the chosen language is downloaded; see ../index.ts.
import { en as core } from '../locales/core/en';
import { en as home } from '../locales/home/en';
import { en as auth } from '../locales/auth/en';
import { en as pricing } from '../locales/pricing/en';
import { en as growth } from '../locales/growth/en';
import { en as chrome } from '../locales/chrome/en';
import { en as pages } from '../locales/pages/en';
import { en as lesson } from '../locales/lesson/en';
import { en as school } from '../locales/school/en';
import { en as dashboard } from '../locales/dashboard/en';
import { en as family } from '../locales/family/en';
import { en as shared } from '../locales/shared/en';

const translation = { ...core, home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
export default translation;
