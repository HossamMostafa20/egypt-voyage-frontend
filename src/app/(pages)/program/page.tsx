import { ProgramI } from '@/interfaces'
import ProgramsClient from './ProgramsClient';

export default async function Program() {

  const response = await fetch('http://egyptvoyage.runasp.net/api/Programs');
  const programs: ProgramI[] = await response.json();

  return <>
    <ProgramsClient programs={programs} />
  </>
}
