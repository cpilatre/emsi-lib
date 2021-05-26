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

        it('Build object', () => {
            const informations = new Informations(CasualtiesStatus.CITIZEN)
                .setTriage(Triage.BLACK)
                .setContamination(Contamination.CONTAMINATION_NOT_ASSESSED)
                .setLocation(Location.CONFINED)
                .setHealth(Health.DEAD)

            expect(informations).eql(src)
        })

        it('Assign data to object', () => {
            const informations = Informations.default().assign(src)
            expect(informations).to.have.property('status', CasualtiesStatus.CITIZEN)
            expect(informations).to.have.property('triage', Triage.BLACK)
            expect(informations).to.have.property('contamination', Contamination.CONTAMINATION_NOT_ASSESSED)
            expect(informations).to.have.property('location', Location.CONFINED)
            expect(informations).to.have.property('health', Health.DEAD)
        })
    })
}