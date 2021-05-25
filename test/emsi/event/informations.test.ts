import { expect } from 'chai'
import { CasualtiesStatus, Contamination, Health, Location, Triage } from '../../../src/common/types'
import { Informations } from '../../../src/emsi/event'

describe('emsi :: event', () => {
    describe('Informations', () => {
        const src = {
            status: 'CITIZEN',
            triage: '5',
            contamination: 'NO_EVAL',
            location: 'CONFINED',
            health: 'DEAD'
        }

        it('Assign data to object', () => {
            const informations = Informations.default().assign(src)
            expect(informations).to.have.property('status')
            expect(informations).to.have.property('triage')
            expect(informations).to.have.property('contamination')
            expect(informations).to.have.property('location')
            expect(informations).to.have.property('health')
        })

        it('Chek enum assignement', () => {
            const informations = Informations.default().assign(src)
            expect(informations.status).eq(CasualtiesStatus.CITIZEN)
            expect(informations.triage).eq(Triage.BLACK)
            expect(informations.contamination).eq(Contamination.CONTAMINATION_NOT_ASSESSED)
            expect(informations.location).eq(Location.CONFINED)
            expect(informations.health).eq(Health.DEAD)
        })
    })
})
