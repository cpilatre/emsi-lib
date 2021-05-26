import { expect } from 'chai'
import { MAX_ETYPE_LENGTH, NULL_UUID } from '../../../src/common/config'
import { EGeoStatus } from '../../../src/common/types'
import { EGeo, Position  } from '../../../src/emsi'

export default function (): any {
    describe('EGeo', () => {
        const src = {
            datime: new Date(2021, 5, 1).toISOString(),
            type: 'eGeo type',
            weather: ['sun', 'cloud'],
            freeText: 'Comments',
            position: Position.default(),
            id: NULL_UUID,
            status: 'PLANNED'
        }

        it('Build object', () => {
            const eGeo = new EGeo('eGeo type', Position.default())
                .setDatime(new Date(2021, 5, 1).toISOString())
                .addWeather(['sun', 'cloud'])
                .setFreeText('Comments')
                .setId(NULL_UUID)
                .setStatus(EGeoStatus.PLANNED)

            expect(eGeo.position).eql(src.position)
            expect(eGeo.datime).eq(src.datime)
            expect(eGeo.type).eq(src.type)
            expect(eGeo.weather).eql(src.weather)
            expect(eGeo.freeText).eq(src.freeText)
            expect(eGeo.id).eq(src.id)
            expect(eGeo.status).eq(src.status)
            // expect(eGeo).eql(src) does not pass type property (in EGeo and Position)
        })

        it('Chek constructor', () => {
            const eGeo = () => new EGeo(`x${'x'.repeat(MAX_ETYPE_LENGTH)}`) 
            expect(eGeo).to.throw() 
        })

        it('Assign data to object', () => {
            const eGeo = EGeo.default().assign(src)
            expect(eGeo).to.have.property('datime', new Date(2021, 5, 1).toISOString())
            expect(eGeo).to.have.property('type', 'eGeo type')
            expect(eGeo).to.have.property('freeText')
            expect(eGeo).to.have.property('id', NULL_UUID)
            expect(eGeo).to.have.property('status', EGeoStatus.PLANNED)
        })
    })
}