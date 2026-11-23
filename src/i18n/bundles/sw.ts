// Every interface string for one language (sw). Only the chosen language is downloaded; see ../index.ts.
import { sw as core } from '../locales/core/sw';
import { sw as home } from '../locales/home/sw';
import { sw as auth } from '../locales/auth/sw';
import { sw as pricing } from '../locales/pricing/sw';
import { sw as growth } from '../locales/growth/sw';
import { sw as chrome } from '../locales/chrome/sw';
import { sw as pages } from '../locales/pages/sw';
import { sw as lesson } from '../locales/lesson/sw';
import { sw as school } from '../locales/school/sw';
import { sw as dashboard } from '../locales/dashboard/sw';
import { sw as family } from '../locales/family/sw';
import { sw as shared } from '../locales/shared/sw';

const translation = { ...core, home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
export default translation;
