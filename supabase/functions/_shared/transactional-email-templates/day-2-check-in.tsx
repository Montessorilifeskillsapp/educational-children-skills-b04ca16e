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
    <Preview>How did Pouring Water go?</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Hi ${name},` : 'Hi there,'}</Heading>
        <Text style={text}>
          A quick check-in: did you try Pouring Water with your child yet?
        </Text>
        <Text style={text}>
          Whether it went beautifully or got messy (both are normal!), the simple act of
          offering a real, purposeful task is exactly what Montessori is about.
        </Text>
        <Text style={text}>
          If you haven't tried it yet, no pressure — pick a calm 10-minute window today.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={`${APP_URL}/preview/pouring-water`} style={button}>
            Re-open the guide
          </Button>
        </Section>
        <Text style={footer}>Kerry, {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'How did the first activity go?',
  displayName: 'Day 2 Check-in',
  previewData: { name: 'Sam' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 16px' }
const button = { backgroundColor: '#7bb5b0', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
