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
    <Preview>Your next activity: Spooning Beans</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `${name}, ready for activity #2?` : 'Ready for activity #2?'}</Heading>
        <Text style={text}>
          Once your child has practiced pouring, the natural next step is <strong>Spooning</strong>.
          It refines the same hand-control while introducing a new tool.
        </Text>
        <Text style={text}>
          You'll need: two small bowls, a spoon, and a handful of dry beans, rice, or lentils.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={`${APP_URL}/dashboard`} style={button}>
            Open your dashboard
          </Button>
        </Section>
        <Text style={tip}>
          <strong>Why this matters:</strong> Repetition with small variations builds
          deep, lasting concentration — Montessori's "great work" of early childhood.
        </Text>
        <Text style={footer}>Kerry, {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: 'Your next activity: Spooning',
  displayName: 'Day 3 Next Activity',
  previewData: { name: 'Sam' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 16px' }
const tip = { fontSize: '14px', color: '#55504a', lineHeight: '1.6', backgroundColor: '#f5f0e3', padding: '14px 16px', borderRadius: '8px', margin: '20px 0' }
const button = { backgroundColor: '#7bb5b0', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
