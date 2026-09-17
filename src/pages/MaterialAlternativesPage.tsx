import React, { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Home, Lightbulb, Sparkles } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSEO } from '@/hooks/useSEO';
import { useMaterialLinks } from '@/hooks/useMaterialLinks';
import { curriculumSectionsForMaterials } from '@/data/curriculumSections';
import { extractAllMaterialsFromSkills, normalizeMaterialKey } from '@/lib/materials';
import { getMaterialImage } from '@/lib/materialImageRegistry';

/** Turn a key back into something readable when we have no saved name for it. */
function prettifyKey(key: string): string {
  const words = key.replace(/-/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

const GENERAL_IDEAS = [
  'Look for what you already own: small bowls, jugs, trays, baskets, cloths, jars and spoons all work beautifully.',
  'Choose real objects over plastic toys — glass, wood, metal and ceramic give the child honest weight and sound.',
  'Keep it child-sized so small hands can manage it alone. A little jug beats a big one every time.',
  'Use one set per activity, kept together on its own tray, so the child can carry and return the whole work.',
  'Natural materials from outdoors — shells, stones, pine cones, leaves — make wonderful sorting and matching objects.',
];

const MaterialAlternativesPage: React.FC = () => {
  const { materialKey = '' } = useParams<{ materialKey: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { byKey, loading } = useMaterialLinks();

  const key = normalizeMaterialKey(materialKey);
  const link = byKey.get(key);

  const curriculumName = useMemo(() => {
    for (const section of curriculumSectionsForMaterials) {
      const found = extractAllMaterialsFromSkills(section.skills).find((m) => m.key === key);
      if (found) return found.displayName;
    }
    return null;
  }, [key]);

  const displayName = link?.display_name || curriculumName || prettifyKey(key);
  const ideas = link?.home_alternatives?.trim() || '';
  const image = getMaterialImage(displayName);
  const from = searchParams.get('from');

  useSEO({
    title: `${displayName} — use what you have`,
    description: `Everyday alternatives for ${displayName} using items you already have at home or in the classroom.`,
  });

  const handleBack = () => {
    if (from) navigate(from);
    else navigate(-1);
  };

  return (
    <PageLayout title={displayName} onBack={handleBack}>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="w-5 h-5 text-primary" aria-hidden="true" />
            Use what you already have
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {image && (
            <img
              src={image}
              alt={`Montessori material: ${displayName}`}
              loading="lazy"
              className="w-full max-w-xs mx-auto rounded-lg border object-cover"
            />
          )}

          <p className="text-sm text-muted-foreground">
            There is no supplier link for <span className="font-medium text-foreground">{displayName}</span>.
            This is a material most families and classrooms can put together from everyday things — the child
            gains far more from real, familiar objects than from a boxed set.
          </p>

          {loading ? null : ideas ? (
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="flex items-center gap-2 text-sm font-medium mb-2">
                <Lightbulb className="w-4 h-4 text-primary" aria-hidden="true" />
                Ideas for this material
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{ideas}</p>
            </div>
          ) : (
            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="flex items-center gap-2 text-sm font-medium mb-2">
                <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                How to gather it at home
              </p>
              <ul className="space-y-2">
                {GENERAL_IDEAS.map((idea) => (
                  <li key={idea} className="text-sm text-muted-foreground flex gap-2">
                    <span aria-hidden="true">•</span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Prepare the set before you present the activity, and keep it beautiful, complete and within the
            child's reach.
          </p>

          <Button variant="outline" onClick={handleBack} className="w-full">
            Back to the activity
          </Button>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default MaterialAlternativesPage;
