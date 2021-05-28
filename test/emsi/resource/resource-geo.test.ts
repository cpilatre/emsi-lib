import { expect } from 'chai'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_RTYPE_LENGTH, NULL_UUID } from '../../../src/common/config'
import { Position, RGeo  } from '../../../src/emsi'

export default function (): any {
    describe('rGeo', () => {
        const src = {
            datime: new Date(2021, 5, 1).toISOString(),
            type: 'CUR',
            freeText: 'Comments',
            position: { locId: NULL_UUID },
            id: NULL_UUID
        }

        it('Chek constructor', () => {
            const rGeo = () => new RGeo(`x${'x'.repeat(MAX_RTYPE_LENGTH)}`) 
            expect(rGeo).to.throw() 
        })

        it('Compare build object and assigned object', () => {
            const rGeo = new RGeo('CUR', Position.default())
                .setDatime(new Date(2021, 5, 1).toISOString())
                .setFreeText('Comments')
                .setId(NULL_UUID)

            const dest = RGeo.default().assign(src)
            expect(rGeo).eql(dest) 
        })

        it('Check set/add methods', () => {
            const rGeo = new RGeo('Geo')

            const freeTextLength = () => rGeo.setFreeText(`x${'x'.repeat(MAX_FREETEXT_LENGTH)}`)
            expect(freeTextLength).to.throw()

            const idLength = () => rGeo.setId(`x${'x'.repeat(MAX_ID_LENGTH)}`)
            expect(idLength).to.throw()
        })        
    })
}