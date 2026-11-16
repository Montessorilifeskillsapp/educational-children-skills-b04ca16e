import * as React from 'npm:react@18.3.1'
import { Body, Button, Container, Head, Heading, Html, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const PLANS_URL = 'https://montessorilifeskillsapp.com/plans'

interface Props { plan?: string; amount?: string; renewalDate?: string }

const Email = ({ plan = 'Premium Annual', amount = '$199.00', renewalDate = 'your renewal date' }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`Your ${plan} plan renews on ${renewalDate}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Your plan renews on {renewalDate}</Heading>
        <Text style={text}>
          This is a reminder that your Montessori Life Skills <strong>{plan}</strong> plan will renew automatically on{' '}
          <strong>{renewalDate}</strong>. The card on file will be charged <strong>{amount}</strong> (plus any tax) for another year.
        </Text>
        <Text style={text}>If you want to keep your plan, you don't need to do anything.</Text>
        <Text style={text}>
          To cancel or change it, sign in, open the Plans page and choose <strong>Manage or cancel</strong>. If you cancel before{' '}
          {renewalDate}, you won't be charged again and your access continues until that date.
        </Text>
        <Section style={{ textAlign: 'center', margin: '28px 0' }}>
          <Button href={PLANS_URL} style={button}>Manage or cancel</Button>
        </Section>
        <Text style={footer}>Questions? Reply to this email or write to montessorilifeskills@gmail.com.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: (d: Record<string, any>) => `Your ${d.plan || 'annual'} plan renews on ${d.renewalDate || 'soon'}`,
  displayName: 'Annual renewal reminder',
  previewData: { plan: 'Premium Annual', amount: '$199.00', renewalDate: 'December 16, 2026' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.6', margin: '0 0 12px' }
const button = { backgroundColor: '#e6c054', color: '#3d342b', padding: '14px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '15px', fontWeight: 'bold' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
