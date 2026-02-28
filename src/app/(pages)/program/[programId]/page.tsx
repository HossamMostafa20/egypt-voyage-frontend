import { ProgramI } from '@/interfaces'
import { Params } from 'next/dist/server/request/params'
import ProgramsDetailsClient from './ProgramsDetailsClient'

export default async function ProgramDetails({ params }: { params: Params }) {

    let { programId } = await params;
    console.log(programId);

    const response = await fetch('http://egyptvoyage.runasp.net/api/Programs/' + programId);
    const program: ProgramI = await response.json();
    console.log(program);

    return <>
        <ProgramsDetailsClient program={program} />
    </>
}
