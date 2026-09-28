import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const APP_URL = 'https://montessorilifeskillsapp.com'

interface Props { title?: string; body?: string; cta?: string }

const Email = ({ title = 'A note from your Family Dashboard', body = '', cta = 'Open Family Dashboard' }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{title}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{title}</Heading>
        {body.split('\n').map((line, i) => <Text key={i} style={text}>{line}</Text>)}
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={APP_URL} style={button}>{cta}</Button>
        </Section>
        <Text style={footer}>You can change these notifications in Family Dashboard → Settings.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => d.title || 'Family Dashboard update',
  displayName: 'Family notice',
  previewData: { title: 'Time for today\'s activity', body: 'A short, focused activity with Sam today keeps the rhythm going.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 12px' }
const button = { backgroundColor: '#e6c054', color: '#3d342b', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
