import { expect } from 'chai'
import { CasualtiesStatus, Contamination, Health, Location, Triage } from '../../../src/common/types'
import { Informations } from '../../../src/emsi/event'

export default function (): any {
    describe('Informations', () => {
        const src = {
            status: 'CITIZEN',
            triage: '5',
            contamination: 'NO_EVAL',
            location: 'CONFINED',
            health: 'DEAD'
        }

        it('Compare build object and assigned object', () => {
            const informations = new Informations(CasualtiesStatus.CITIZEN)
                .setTriage(Triage.BLACK)
                .setContamination(Contamination.CONTAMINATION_NOT_ASSESSED)
                .setLocation(Location.CONFINED)
                .setHealth(Health.DEAD)

            const dest = Informations.default().assign(src)
            expect(informations).eql(dest)
        })
    })
}