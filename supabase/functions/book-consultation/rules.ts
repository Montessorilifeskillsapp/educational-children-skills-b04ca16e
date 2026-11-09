import { z } from 'npm:zod@3.23.8'

export const OWNER_EMAIL = 'montessorilifeskills@gmail.com'

export const PACKAGES = {
  single: { label: 'Single session', price: '$225' },
  bundle: { label: 'Three-session package', price: '$600' },
} as const

export type PackageId = keyof typeof PACKAGES

export const packageLabel = (id: PackageId) => `${PACKAGES[id].label} (${PACKAGES[id].price})`

const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()

export const BookingSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(1, 'Please enter your name').max(100, 'Name must be under 100 characters')),
  email: z.string().transform((s) => clean(s).toLowerCase()).pipe(z.string().email('Please enter a valid email address').max(255)),
  childAge: z.string().transform(clean).pipe(z.string().max(60, 'Child age must be under 60 characters')).optional().default(''),
  package: z.enum(['single', 'bundle']),
  topics: z.string().transform(clean).pipe(z.string().min(1, 'Please tell us what you would like to discuss').max(2000, 'Topics must be under 2000 characters')),
  preferredTimes: z.string().transform(clean).pipe(z.string().max(500, 'Preferred times must be under 500 characters')).optional().default(''),
}).strict()

export type Booking = z.infer<typeof BookingSchema>
