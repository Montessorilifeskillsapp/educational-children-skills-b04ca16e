import React from 'react';
import LegalDocPage from '@/components/legal/LegalDocPage';
import { songsLicenceEn } from '@/content/songsLicence/licence.en';
import { songsLicenceLoaders } from '@/content/songsLicence/loaders';

const SongsLicencePage: React.FC = () => (
  <LegalDocPage
    english={songsLicenceEn}
    loaders={songsLicenceLoaders}
    keywords="montessori songs license, school license, household license"
    canonical="/songs-licence"
  />
);

export default SongsLicencePage;
