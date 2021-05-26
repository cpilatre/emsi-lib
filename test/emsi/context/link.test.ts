import { expect } from 'chai'
import { MAX_ID_LENGTH, NULL_UUID } from '../../../src/common/config'
import { LinkRole } from '../../../src/common/types'
import { Link } from '../../../src/emsi/context'

describe('emsi :: context', () => {
    describe('Link', () => {
        const src = {
            linkId: NULL_UUID,
            linkRole: LinkRole.ADD_TO
        }

        it('Chek constructor', () => {
            const LinkIdLength = () => new Link(`x${'x'.repeat(MAX_ID_LENGTH)}`) 
            expect(LinkIdLength).to.throw() 
        })

        it('Assign data to object', () => {
            const link = Link.default().assign(src)
            expect(link).to.have.property('linkId', NULL_UUID)
            expect(link).to.have.property('linkRole', LinkRole.ADD_TO)
        })
    })
})
