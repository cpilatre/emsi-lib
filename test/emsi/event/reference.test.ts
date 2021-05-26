import { expect } from 'chai'
import { MAX_ID_LENGTH, NULL_UUID } from '../../../src/common/config'
import { Reference } from '../../../src/emsi/event'

export default function (): any {
    describe('Reference', () => {
        const src = {
            orgId: NULL_UUID,
            otherEventId: [
                NULL_UUID,
                NULL_UUID
            ]
        }

        it('Chek constructor', () => {
            const orgIdLength = () => new Reference(`x${'x'.repeat(MAX_ID_LENGTH)}`, []) 
            expect(orgIdLength).to.throw() 

            const otherEventIdLength = () => new Reference(NULL_UUID, [ `x${'x'.repeat(MAX_ID_LENGTH)}`]) 
            expect(otherEventIdLength).to.throw() 
        })

        it('Assign data to object', () => {
            const reference = Reference.default().assign(src)
            expect(reference).to.have.property('orgId', NULL_UUID)
            expect(reference).to.have.property('otherEventId')
            expect(reference.otherEventId).to.have.lengthOf(2)
            expect(reference.otherEventId).to.be.an('array').that.does.include(NULL_UUID);
        })
    })
}