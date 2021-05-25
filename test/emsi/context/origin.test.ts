import { expect } from 'chai'
import { MAX_ID_LENGTH, MAX_NAME_X2_LENGTH, MAX_USER_ID_LENGTH, NULL_UUID } from '../../../src/common/config'
import { Origin } from '../../../src/emsi/context'

describe('emsi :: context', () => {
    describe('Origin', () => {
        const src = {
            orgId: NULL_UUID,
            userId: 'user',
            name: 'name'
        }

        it('Chek constructor', () => {
            const orgIdLength = () => new Origin(`x${'x'.repeat(MAX_ID_LENGTH)}`) 
            expect(orgIdLength).to.throw() 

            const userIdLength = () => new Origin(NULL_UUID, `x${'x'.repeat(MAX_USER_ID_LENGTH)}`) 
            expect(userIdLength).to.throw() 

            const nameLength = () => new Origin(NULL_UUID, 'user', `x${'x'.repeat(MAX_NAME_X2_LENGTH)}`) 
            expect(nameLength).to.throw() 
        })

        it('Assign data to object', () => {
            const origin = Origin.default().assign(src)
            expect(origin).to.have.property('orgId')
            expect(origin).to.have.property('userId')
            expect(origin).to.have.property('name')
        })
    })
})
