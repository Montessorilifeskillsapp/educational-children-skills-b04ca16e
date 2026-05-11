import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = 'Montessori Life Skills'

interface Props { name?: string }

const Email = ({ name }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>You're doing the real work of parenting</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `${name}, a small note` : 'A small note'}</Heading>
        <Text style={text}>
          Most parents never sit beside their child and offer a real, slow, purposeful
          activity. You have. That's not nothing.
        </Text>
        <Text style={text}>
          Montessori isn't about doing more — it's about doing less, with more attention.
          The fact that you're here, reading this, means your child has something rare:
          an adult who is paying attention.
        </Text>
        <Text style={text}>
          Keep going. Even one activity a week compounds.
        </Text>
        <Text style={textBold}>
          One small ask: hit reply and tell me how it's going. What activity has your
          child loved? What's been hard? I read every reply personally.
        </Text>
        <Text style={footer}>Kerry, {SITE_NAME}</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: Email,
  subject: "You're doing the real work",
  displayName: 'Day 5 Encouragement',
  previewData: { name: 'Sam' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Georgia, "Times New Roman", serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#3d342b', margin: '0 0 16px' }
const text = { fontSize: '15px', color: '#55504a', lineHeight: '1.7', margin: '0 0 18px' }
const footer = { fontSize: '13px', color: '#8a8275', margin: '28px 0 0', fontStyle: 'italic' }
