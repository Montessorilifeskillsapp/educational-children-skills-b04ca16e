/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as welcomeDay0 } from './welcome-day-0.tsx'
import { template as day1Abandonment } from './day-1-abandonment.tsx'
import { template as day2CheckIn } from './day-2-check-in.tsx'
import { template as day3NextActivity } from './day-3-next-activity.tsx'
import { template as day5Encouragement } from './day-5-encouragement.tsx'
import { template as day7Wrap } from './day-7-wrap.tsx'
import { template as paywallAbandon } from './paywall-abandon.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'welcome-day-0': welcomeDay0,
  'day-1-abandonment': day1Abandonment,
  'day-2-check-in': day2CheckIn,
  'day-3-next-activity': day3NextActivity,
  'day-5-encouragement': day5Encouragement,
  'day-7-wrap': day7Wrap,
  'paywall-abandon': paywallAbandon,
}
