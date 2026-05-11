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
    <Preview>Still here for you — one tiny first step</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Hi ${name},` : 'Hi there,'}</Heading>
        <Text style={text}>
          Yesterday felt full, didn't it? No judgment — most parents don't get to the
          first activity on day one.
        </Text>
        <Text style={text}>
          When you have ten quiet minutes, Pouring Water is the gentlest place to begin.
          A jug, a glass, a tray. That's it.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button
            href={`${APP_URL}/preview/pouring-water?utm_source=email&utm_medium=transactional&utm_campaign=day-1-abandonment`}
            style={button}
          >
            Open the 10-minute guide
          </Button>
        </Section>
        <Text style={text}>
          Reply to this email if anything is in the way — I read every one.
        </Text>
        <Text style={footer}>Kerry, {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'A gentler first step (no rush)',
  displayName: 'Day 1 Abandonment Recovery',
  previewData: { name: 'Sam' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 16px' }
const button = { backgroundColor: '#7bb5b0', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
