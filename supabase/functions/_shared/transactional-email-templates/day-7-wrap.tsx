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
    <Preview>One week in — what comes next</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `${name}, one week in` : 'One week in'}</Heading>
        <Text style={text}>
          You've spent a week exploring authentic Montessori practice with your child.
          That's the hardest part — starting.
        </Text>
        <Text style={text}>
          The full curriculum has 8 areas, hundreds of activities, and a clear sequence
          rooted in AMI standards. Members get the entire library, plus the adult guides
          that explain <em>why</em> each material matters.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={`${APP_URL}/pricing`} style={button}>
            See membership options
          </Button>
        </Section>
        <Text style={tip}>
          Every plan is backed by our 30-day guarantee. If it doesn't fit your family,
          we'll refund you — no questions.
        </Text>
        <Text style={footer}>With gratitude, Kerry & the {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'One week in — what comes next',
  displayName: 'Day 7 Wrap',
  previewData: { name: 'Sam' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 16px' }
const tip = { fontSize: '14px', color: '#55504a', lineHeight: '1.6', backgroundColor: '#f5f0e3', padding: '14px 16px', borderRadius: '8px', margin: '20px 0' }
const button = { backgroundColor: '#e6c054', color: '#3d342b', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
