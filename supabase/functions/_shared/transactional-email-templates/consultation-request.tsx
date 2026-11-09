import * as React from 'npm:react@18.3.1'
import { Body, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  name?: string
  email?: string
  childAge?: string
  packageLabel?: string
  topics?: string
  preferredTimes?: string
  submittedAt?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Section style={{ margin: '0 0 14px' }}>
    <Text style={labelStyle}>{label}</Text>
    {(value || '—').split('\n').map((line, i) => <Text key={i} style={valueStyle}>{line || ' '}</Text>)}
  </Section>
)

const Email = ({ name = '', email = '', childAge, packageLabel, topics, preferredTimes, submittedAt }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>New consultation request from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New consultation request</Heading>
        <Text style={text}>Reply to this email to answer {name || 'the parent'} directly.</Text>
        <Row label="Name" value={name} />
        <Row label="Email" value={email} />
        <Row label="Child's age" value={childAge} />
        <Row label="Package" value={packageLabel} />
        <Row label="Topics and goals" value={topics} />
        <Row label="Preferred dates and times" value={preferredTimes} />
        {submittedAt && <Text style={small}>Sent {submittedAt}</Text>}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `Consultation request: ${d.name || 'New parent'}`,
  to: 'montessorilifeskills@gmail.com',
  displayName: 'Consultation request (to owner)',
  previewData: {
    name: 'Jane Parent', email: 'jane@example.com', childAge: '4 years', packageLabel: 'Single session ($225)',
    topics: 'Setting up a Practical Life shelf at home.', preferredTimes: 'Weekday mornings', submittedAt: 'Nov 9, 2026',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 12px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 20px' }
const labelStyle = { fontSize: '12px', color: '#8a8178', textTransform: 'uppercase' as const, letterSpacing: '0.06em', margin: '0 0 2px' }
const valueStyle = { fontSize: '15px', color: '#3d342b', lineHeight: '1.5', margin: '0' }
const small = { fontSize: '12px', color: '#8a8178', margin: '20px 0 0' }
