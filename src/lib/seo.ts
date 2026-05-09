// SEO utilities and structured data generators
export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export const generateCourseSchema = (skill: any): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: skill.title,
  description: skill.purpose,
  provider: {
    '@type': 'Organization',
    name: 'Montessori Life Skills',
    url: 'https://montessorilifeskillsapp.com'
  },
  educationalLevel: 'Preschool',
  teaches: skill.title,
  coursePrerequisites: 'None',
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    instructor: {
      '@type': 'Organization',
      name: 'Montessori Life Skills'
    }
  }
});

export const generateActivitySchema = (activity: any): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'LearningResource',
  name: activity.title,
  description: activity.purpose,
  educationalLevel: 'Preschool',
  learningResourceType: 'Activity',
  teaches: activity.title,
  material: activity.materials,
  timeRequired: 'PT15M',
  educationalUse: 'instruction'
});

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});

export const generateOrganizationSchema = (): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Montessori Life Skills',
  description: 'Interactive Montessori-based life skills learning platform for children',
  url: 'https://montessorilifeskillsapp.com',
  logo: 'https://montessorilifeskillsapp.com/logo.png',
  sameAs: [
    'https://facebook.com/montessoristorybooks',
    'https://twitter.com/montessori_life',
    'https://instagram.com/montessori_life_skills'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-MONTESSORI',
    contactType: 'customer service'
  }
});

export const generateWebsiteSchema = (): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Montessori Life Skills',
  url: 'https://montessorilifeskillsapp.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://montessorilifeskillsapp.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
});

export const injectStructuredData = (data: StructuredData) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};