import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Montessori Life Skills'
const APP_URL = 'https://montessorilifeskillsapp.com'

interface Props { name?: string }

const Email = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Any questions about the plan? Just reply.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Hi ${name},` : 'Hi there,'}</Heading>
        <Text style={text}>
          I noticed you took a look at the Premium plan yesterday and decided to wait —
          completely fine. I wanted to reach out personally in case anything was unclear.
        </Text>
        <Text style={text}>
          The most common questions parents ask:
        </Text>
        <Text style={text}>
          • <strong>"Will it work for my child's age?"</strong> — Yes, the curriculum spans 2.5–6 years with clear progressions.<br />
          • <strong>"Do I need to buy materials?"</strong> — Most starter activities use household items. Material lists are optional.<br />
          • <strong>"Can I cancel?"</strong> — Anytime, in one click. No phone calls.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button
            href={`${APP_URL}/plans?utm_source=email&utm_medium=transactional&utm_campaign=paywall-abandon`}
            style={button}
          >
            See the plan again
          </Button>
        </Section>
        <Text style={text}>
          Or just hit reply with your question — I read every email personally.
        </Text>
        <Text style={footer}>Kerry, {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Any questions about Premium?',
  displayName: 'Paywall Abandon Recovery',
  previewData: { name: 'Sam' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 16px' }
const button = { backgroundColor: '#7bb5b0', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
