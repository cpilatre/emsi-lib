import { expect } from 'chai'
import { MAX_FREETEXT_LENGTH, MAX_URI_LENGTH } from '../../../src/common/config'
import { InfoType } from '../../../src/common/types'
import { ExternalInfo } from '../../../src/emsi/context'

export default function (): any {
    describe('ExternalInfo', () => {
        const src = {
            uri: 'http://test.com',
            infoType: 'MAP',
            freeText: 'Comments'
        }

        it('Chek constructor', () => {
            const uriLength = () => new ExternalInfo(`x${'x'.repeat(MAX_URI_LENGTH)}`) 
            expect(uriLength).to.throw() 

            const feeTextLength = () => new ExternalInfo('http://', InfoType.OTHER, `x${'x'.repeat(MAX_FREETEXT_LENGTH)}`) 
            expect(feeTextLength).to.throw() 
        })

        it('Assign data to object', () => {
            const exti = ExternalInfo.default().assign(src)
            expect(exti).to.have.property('uri')
            expect(exti).to.have.property('infoType')
            expect(exti).to.have.property('freeText')
        })

        it('Chek enum assignement', () => {
            const exti = ExternalInfo.default().assign(src)
            expect(exti.infoType).eq(InfoType.MAP)
        })
    })
}
