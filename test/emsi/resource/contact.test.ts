import { expect } from 'chai'
import { MAX_DETAIL_LENGTH } from '../../../src/common/config'
import { ContactType } from '../../../src/common/types'
import { Contact } from '../../../src/emsi'

export default function (): any {
    describe('Contact', () => {
        const src = {
            contact: 'IPADD',
            detail: '0.0.0.0'
        }

        it('Chek constructor', () => {
            const detailLength = () => new Contact(ContactType.WEB, `x${'x'.repeat(MAX_DETAIL_LENGTH)}`) 
            expect(detailLength).to.throw() 
        })

        it('Compare build object and assigned object', () => {
            const contact = new Contact(ContactType.IP_ADDRESS, '0.0.0.0')

            const dest = Contact.default().assign(src)
            expect(contact).eql(dest)
        })
    })
}