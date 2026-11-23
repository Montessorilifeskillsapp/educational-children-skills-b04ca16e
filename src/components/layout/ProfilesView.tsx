import React from 'react';
import ProfileSelector from '../ProfileSelector';
import { allPracticalLifeSkills } from '@/data/practicalLifeAll';

type Props = Omit<React.ComponentProps<typeof ProfileSelector>, 'totalSkills'>;

const totalSkills = Object.keys(allPracticalLifeSkills).length;

/** Child profiles screen; downloaded only when opened. */
const ProfilesView: React.FC<Props> = (props) => <ProfileSelector {...props} totalSkills={totalSkills} />;

export default ProfilesView;
