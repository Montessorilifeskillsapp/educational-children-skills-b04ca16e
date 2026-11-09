import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string; packageLabel?: string; topics?: string; preferredTimes?: string }

const Email = ({ name = '', packageLabel, topics, preferredTimes }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your consultation request</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Thank you{name ? `, ${name}` : ''}</Heading>
        <Text style={text}>We received your request for a private Montessori consultation. Kerry will reply to this email address to arrange a time.</Text>
        <Text style={labelStyle}>What you sent</Text>
        {packageLabel && <Text style={text}>Package: {packageLabel}</Text>}
        {topics && <Text style={text}>Topics: {topics}</Text>}
        {preferredTimes && <Text style={text}>Preferred times: {preferredTimes}</Text>}
        <Text style={text}>If anything changes, simply reply to this email.</Text>
        <Text style={text}>Montessori Life Skills</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'We received your consultation request',
  displayName: 'Consultation request received (to parent)',
  previewData: { name: 'Jane', packageLabel: 'Single session', topics: 'Practical Life at home', preferredTimes: 'Weekday mornings' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 12px' }
const labelStyle = { fontSize: '12px', color: '#8a8178', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '16px 0 4px' }
