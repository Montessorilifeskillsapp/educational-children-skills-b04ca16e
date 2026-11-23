// Every interface string for one language (zh). Only the chosen language is downloaded; see ../index.ts.
import { zh as core } from '../locales/core/zh';
import { zh as home } from '../locales/home/zh';
import { zh as auth } from '../locales/auth/zh';
import { zh as pricing } from '../locales/pricing/zh';
import { zh as growth } from '../locales/growth/zh';
import { zh as chrome } from '../locales/chrome/zh';
import { zh as pages } from '../locales/pages/zh';
import { zh as lesson } from '../locales/lesson/zh';
import { zh as school } from '../locales/school/zh';
import { zh as dashboard } from '../locales/dashboard/zh';
import { zh as family } from '../locales/family/zh';
import { zh as shared } from '../locales/shared/zh';

const translation = { ...core, home, auth, pricing, growth, chrome, pages, lesson, school, dashboard, family, shared };
export default translation;
