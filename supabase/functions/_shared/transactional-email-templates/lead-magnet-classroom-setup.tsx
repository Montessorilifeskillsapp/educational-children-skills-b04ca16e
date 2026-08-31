import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Montessori Life Skills'
const APP_URL = 'https://montessorilifeskillsapp.com'
const PDF_URL = `${APP_URL}/classroom-setup-guide.pdf`

const Email = () => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Your Montessori Classroom Setup Guide is ready to download</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>The Montessori Classroom Setup Guide</Heading>
        <Text style={text}>
          Thank you for joining us. Inside this AMI-aligned guide you'll find everything
          needed to prepare an authentic Montessori environment for children ages 3–6.
        </Text>
        <Section style={{ textAlign: 'center', margin: '32px 0' }}>
          <Button href={`${PDF_URL}?utm_source=email&utm_medium=transactional&utm_campaign=lead-magnet`} style={button}>
            Download the guide
          </Button>
        </Section>
        <Text style={tip}>
          <strong>How to use it:</strong> Walk your room against the setup checklist before
          the first child enters. Prepare the environment completely — then step back and
          observe.
        </Text>
        <Heading style={h2}>What's inside</Heading>
        <Text style={text}>
          The Prepared Environment · The five curriculum areas and their order of
          introduction · Arranging the materials · The role of the adult · The setup
          checklist
        </Text>
        <Text style={text}>
          You can also read the full guide online at{' '}
          {APP_URL}/classroom-setup — and when you're ready for more, the complete AMI
          sequence across eight curriculum areas is waiting inside the app.
        </Text>
        <Section style={{ textAlign: 'center', margin: '24px 0 8px' }}>
          <Button href={`${APP_URL}/?utm_source=email&utm_medium=transactional&utm_campaign=lead-magnet-app`} style={buttonGhost}>
            Open the app
          </Button>
        </Section>
        <Text style={footer}>With care, Kerry & the {SITE_NAME} team</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Your Montessori Classroom Setup Guide is here',
  displayName: 'Lead magnet — Classroom Setup Guide PDF',
  previewData: {},
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '26px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const h2 = { fontSize: '18px', fontWeight: 'bold', color: '#3d342b', margin: '28px 0 10px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 16px' }
const tip = { fontSize: '14px', color: '#55504a', lineHeight: '1.6', backgroundColor: '#f5f0e3', padding: '14px 16px', borderRadius: '8px', margin: '20px 0' }
const button = { backgroundColor: '#7bb5b0', color: '#ffffff', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const buttonGhost = { backgroundColor: '#ffffff', color: '#7bb5b0', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', border: '1px solid #7bb5b0' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '32px 0 0', fontStyle: 'italic' }
