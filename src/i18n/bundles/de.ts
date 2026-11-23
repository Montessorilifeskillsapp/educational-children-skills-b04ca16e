// Every interface string for one language (de). Only the chosen language is downloaded; see ../index.ts.
import { de as core } from '../locales/core/de';
import { de as home } from '../locales/home/de';
import { de as auth } from '../locales/auth/de';
import { de as pricing } from '../locales/pricing/de';
import { de as growth } from '../locales/growth/de';
import { de as chrome } from '../locales/chrome/de';
import { de as pages } from '../locales/pages/de';
import { de as lesson } from '../locales/lesson/de';
import { de as school } from '../locales/school/de';
import { de as dashboard } from '../locales/dashboard/de';
import { de as family } from '../locales/family/de';
import { de as shared } from '../locales/shared/de';

const translation = { ...core, home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
export default translation;
