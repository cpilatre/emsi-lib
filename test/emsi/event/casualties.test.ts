import { expect } from 'chai'
import { CasualtiesContext } from '../../../src/common/types'
import { Casualties, Informations } from '../../../src/emsi'

export default function (): any {
    describe('Casualties', () => {
        const src = {
            datime: new Date(2021, 4, 26).toISOString(),
            context: 'REQ_ACTION',
            count: 1,
            informations: { status: 'UNK' }
        }

        it('Chek constructor', () => {
            const casualties = () => new Casualties(CasualtiesContext.REQUIRING_ACTION, -1)
            expect(casualties).to.throw()
        })

        it('Build object', () => {
            const casualties = new Casualties(CasualtiesContext.REQUIRING_ACTION, 1, new Date(2021, 4, 26))
                .setInformations(Informations.default())

            expect(casualties).eql(src)
        })

        it('Assign data to object', () => {
            const casualties = Casualties.default().assign(src)
            expect(casualties).to.have.property('datime', new Date(2021, 4, 26).toISOString())
            expect(casualties).to.have.property('context', CasualtiesContext.REQUIRING_ACTION)
            expect(casualties).to.have.property('count', 1)
            expect(casualties.informations).eql(Informations.default())
        })
    })
}