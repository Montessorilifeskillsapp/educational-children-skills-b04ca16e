import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { title?: string; body?: string; cta?: string; url?: string }

const Email = ({ title = 'A note from school', body = '', cta = 'Open Montessori Life Skills', url = 'https://montessorilifeskillsapp.com' }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{title}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{title}</Heading>
        {body.split('\n').map((line, i) => <Text key={i} style={text}>{line}</Text>)}
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={url} style={button}>{cta}</Button>
        </Section>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => d.title || 'A note from school',
  displayName: 'School notice',
  previewData: { title: 'Progress report for Sam', body: 'Sam has been working with the Pink Tower this month.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 12px' }
const button = { backgroundColor: '#e6c054', color: '#3d342b', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
