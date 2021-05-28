import { expect } from 'chai'
import { MAX_RTYPE_LENGTH } from '../../../src/common/config'
import { RType  } from '../../../src/emsi'

export default function (): any {
    describe('rType', () => {
        const src = {
            class: ['HUM', 'ORG'],
            capability: ['AER35M'],
            characteristics: ['HGT']
        }

        it('Chek constructor', () => {
            const rType = () => new RType([`x${'x'.repeat(MAX_RTYPE_LENGTH)}`]) 
            expect(rType).to.throw() 
        })

        it('Compare build object and assigned object', () => {
            const rType = new RType(['HUM', 'ORG'])
                .addCapabilities(['AER35M'])
                .addCharacteristics( ['HGT'])

            const dest = RType.default().assign(src)
            expect(rType).eql(dest) 
        })

        it('Check set/add methods', () => {
            const rType = new RType(['Type'])

            const capabilitiesLength = () => rType.addCapabilities([ `x${'x'.repeat(MAX_RTYPE_LENGTH)}` ])
            expect(capabilitiesLength).to.throw()

            const characteristicsLength = () => rType.addCharacteristics([`x${'x'.repeat(MAX_RTYPE_LENGTH)}`])
            expect(characteristicsLength).to.throw()
        })        
    })
}