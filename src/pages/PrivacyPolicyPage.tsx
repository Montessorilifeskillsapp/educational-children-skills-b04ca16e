import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { policyEn, type PrivacyPolicy } from '@/content/privacy/policy.en';
import { Block } from '@/components/legal/LegalText';
import { hasPolicyTranslation, loadPolicy } from '@/content/privacy/loadPolicy';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || 'en').slice(0, 2);
  const [policy, setPolicy] = useState<PrivacyPolicy>(policyEn);
  const [shownLang, setShownLang] = useState('en');

  useEffect(() => {
    let alive = true;
    if (!hasPolicyTranslation(lang)) { setPolicy(policyEn); setShownLang('en'); return; }
    void loadPolicy(lang).then((p) => { if (alive) { setPolicy(p); setShownLang(p === policyEn ? 'en' : lang); } });
    return () => { alive = false; };
  }, [lang]);

  useSEO({
    title: policy.seoTitle,
    description: policy.seoDescription,
    keywords: "privacy policy, data protection, montessori app privacy, user data, children's privacy",
    canonical: "/privacy-policy"
  });

  return (
    <SEOOptimizer>
      <PageLayout title={policy.pageTitle} onBack={() => navigate(-1)}>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 prose max-w-none">
              <p className="text-sm text-muted-foreground mb-2">{policy.updated}</p>
              {shownLang !== 'en' && <p className="text-sm text-muted-foreground mb-6 italic">{policy.translationNote}</p>}

              <section id="compliance" aria-labelledby="compliance-heading" className="not-prose mt-6 mb-8 rounded-lg border border-primary/30 bg-primary/5 p-5 scroll-mt-24">
                <h2 id="compliance-heading" className="text-xl font-semibold text-foreground mb-2">{policy.compliance.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{policy.compliance.intro}</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a href="/downloads/School_Compliance_Privacy_Brief.pdf" download="School_Compliance_Privacy_Brief.pdf" className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline">
                    <Download className="h-4 w-4" aria-hidden="true" /> {policy.compliance.pdf}
                  </a>
                  <a href="#schools-student-records" className="font-medium text-primary hover:underline">{policy.compliance.readBelow}</a>
                </div>
              </section>

              {policy.sections.map((section, i) => (
                <section key={i} id={section.id} className={`mb-8${section.id ? ' scroll-mt-24' : ''}`}>
                  {section.title && <h2 className="text-xl font-semibold mb-4">{section.title}</h2>}
                  {section.blocks.map((block, j) => <Block key={j} block={block} lang={shownLang} />)}
                </section>
              ))}
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default PrivacyPolicyPage;
