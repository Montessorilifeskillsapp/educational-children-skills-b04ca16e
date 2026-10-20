import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/PageLayout';
import SEOOptimizer from '@/components/SEOOptimizer';
import { useSEO } from '@/hooks/useSEO';
import { Card, CardContent } from '@/components/ui/card';

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold mt-8 mb-3">{children}</h2>
);

const SongsLicencePage: React.FC = () => {
  const navigate = useNavigate();
  useSEO({
    title: 'Songs Licence Agreement - Montessori Life Skills',
    description: 'Licence agreement for the Montessori Life Skills songs: Household Licence and the combined School Licence.',
    keywords: 'montessori songs licence, school licence, household licence',
    canonical: '/songs-licence',
  });

  return (
    <SEOOptimizer>
      <PageLayout title="Songs Licence Agreement" onBack={() => navigate(-1)}>
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 prose prose-gray max-w-none">
              <p className="text-sm text-muted-foreground">Version 2026.1</p>
              <p>
                This agreement is between Montessori Life Skills Company LLC, by Kerry Howard (“Licensor”), and the
                purchaser (“Licensee”).
              </p>

              <H>1. Songs covered</H>
              <p>
                “Songs” means the Montessori Life Skills songs, recordings, lyrics, and files supplied as part of the
                licensed collection. Future songs or collections are included only when the Licensor specifically
                provides them under this licence.
              </p>

              <H>2. Licence grant</H>
              <p>
                After payment and acceptance, the Licensor grants the Licensee a non-exclusive, non-transferable licence
                to use the Songs only as described below. All ownership and rights not expressly granted remain with the
                Licensor.
              </p>
              <h3 className="text-lg font-medium mb-2">Household Licence — $99.99 one-time</h3>
              <p>
                For one purchaser and their household, for personal, non-commercial use at home, including singing,
                listening, and home learning. This licence is perpetual while these terms are followed. It does not
                cover schools, childcare, tutoring, camps, or business use.
              </p>
              <h3 className="text-lg font-medium mb-2">School Licence — combined annual licence</h3>
              <p>
                For schools, the Songs are licensed only as part of a single combined School Licence that also covers
                the Montessori Life Skills curriculum app and the School Portal. The licence covers one physical school
                location. Authorized teachers and staff may use the Songs with enrolled children for lessons, routines,
                transitions, group activities, assemblies, and live singing at school events. It does not cover another
                campus, franchise, or separately operated program. The annual fee is quoted by the Licensor; contact
                montessorilifeskills@gmail.com.
              </p>
              <p>
                Licensees may print a reasonable number of lyric sheets for their licensed household or school. The
                Songs may not be altered, remixed, translated, adapted, or used to create derivative works without
                written permission.
              </p>

              <H>3. Prohibited uses</H>
              <p>The Licensee may not:</p>
              <ul>
                <li>Sell, rent, sublicense, publicly post, broadcast, stream, upload, or distribute the Songs or files.</li>
                <li>Share downloads outside the licensed household or school.</li>
                <li>Use the Songs in commercial products, advertisements, or public promotional videos.</li>
                <li>Remove copyright notices.</li>
                <li>Use the Songs to train, test, or prompt an artificial-intelligence or machine-learning system.</li>
              </ul>
              <p>
                A school may offer listening-only access through a password-protected internal system to its staff and
                enrolled families, provided source files cannot be downloaded or shared onward.
              </p>

              <H>4. Fees, term, and renewal</H>
              <p>The Household Licence is $99.99, paid once, plus any applicable tax.</p>
              <p>
                The School Licence is charged per 12-month term at the fee agreed with the Licensor, plus any applicable
                tax. It renews automatically each year on the anniversary of purchase and is charged to the payment
                method on file. The school may cancel at any time; cancellation stops future renewals, and access
                continues through the end of the paid term.
              </p>
              <p>Refunds, if any, are handled under applicable law.</p>

              <H>5. Ownership and copyright</H>
              <p>
                Kerry Howard is the author and copyright owner of the lyrics and music and retains all copyrights. This
                agreement grants only the limited use rights stated here. No exclusive, publishing, synchronization,
                master-use, distribution, or commercial recording rights are granted.
              </p>

              <H>6. Termination</H>
              <p>
                The Licensor may suspend or terminate this licence by written notice for a material violation not
                corrected within 10 days. The licence ends immediately for unauthorized public distribution, resale, or
                sublicensing.
              </p>
              <p>
                When a School Licence expires or ends, the school must stop using the Songs and delete stored copies,
                except for one archival copy retained solely for legal records.
              </p>

              <H>7. Disclaimer and liability</H>
              <p>
                The Songs are educational materials provided “as is,” without a promise of any particular learning or
                developmental outcome. Neither party is liable for indirect, incidental, special, consequential, or
                punitive damages. The Licensor’s total liability will not exceed the fees paid in the 12 months before a
                claim, except where the law does not allow this limit.
              </p>

              <H>8. General terms</H>
              <p>
                Texas law governs this agreement. The parties will first try to resolve disputes informally; any lawsuit
                must be brought in Bexar County, Texas, unless the law requires otherwise.
              </p>
              <p>
                This agreement and the purchase receipt are the entire agreement. Changes must be in writing. The
                licence may not be assigned without written consent. Electronic acceptance and signatures are valid.
              </p>

              <H>9. Acceptance</H>
              <p>
                By purchasing or accepting this agreement, the Licensee confirms that the selected licence matches the
                intended use, agrees to these terms, and is authorized to accept them. A Household signer must be an
                adult household member. A School signer must be authorized to bind the school. The licence takes effect
                when payment is completed.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageLayout>
    </SEOOptimizer>
  );
};

export default SongsLicencePage;
