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
    <Preview>Welcome to {SITE_NAME} — your first activity is ready</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Welcome, ${name}!` : 'Welcome!'}</Heading>
        <Text style={text}>
          We're so glad you're here. {SITE_NAME} brings authentic AMI Montessori practice
          into your home — one calm, purposeful activity at a time.
        </Text>
        <Heading style={h2}>Start today: Pouring Water</Heading>
        <Text style={text}>
          Pouring is the first practical life activity in the AMI sequence. It builds
          concentration, coordination, and independence — and takes about 10 minutes to set up.
        </Text>
        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
          <Button href={`${APP_URL}/preview/pouring-water`} style={button}>
            Open the Pouring Water guide
          </Button>
        </Section>
        <Text style={tip}>
          <strong>Tip:</strong> Choose a quiet moment when your child is alert and curious.
          Sit beside them, move slowly, and let them try.
        </Text>
        <Text style={footer}>With care, Kerry & the {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Welcome — your first Montessori activity is ready',
  displayName: 'Welcome (Day 0)',
  previewData: { name: 'Sam' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '26px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const h2 = { fontSize: '18px', fontWeight: 'bold', color: '#3d342b', margin: '28px 0 10px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 16px' }
const tip = { fontSize: '14px', color: '#55504a', lineHeight: '1.6', backgroundColor: '#f5f0e3', padding: '14px 16px', borderRadius: '8px', margin: '20px 0' }
const button = { backgroundColor: '#7bb5b0', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '32px 0 0', fontStyle: 'italic' }
