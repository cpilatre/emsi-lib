import { expect } from 'chai'
import { MAX_ETYPE_LENGTH, MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_WEATHER_LENGTH, NULL_UUID } from '../../../src/common/config'
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

        it('Chek constructor', () => {
            const eGeo = () => new EGeo(`x${'x'.repeat(MAX_ETYPE_LENGTH)}`) 
            expect(eGeo).to.throw() 
        })

        it('Compare build object and assigned object', () => {
            const eGeo = new EGeo('eGeo type', Position.default())
                .setDatime(new Date(2021, 5, 1).toISOString())
                .addWeather(['sun', 'cloud'])
                .setFreeText('Comments')
                .setId(NULL_UUID)
                .setStatus(EGeoStatus.PLANNED)

            const dest = EGeo.default().assign(src)
            expect(eGeo).eql(dest) 
        })

        it('Check set/add methods', () => {
            const eGeo = new EGeo('Type')

            const addWeatherLength = () => eGeo.addWeather([ `x${'x'.repeat(MAX_WEATHER_LENGTH)}` ])
            expect(addWeatherLength).to.throw()

            const freeTextLength = () => eGeo.setFreeText(`x${'x'.repeat(MAX_FREETEXT_LENGTH)}`)
            expect(freeTextLength).to.throw()

            const idLength = () => eGeo.setId(`x${'x'.repeat(MAX_ID_LENGTH)}`)
            expect(idLength).to.throw()
        })        
    })
}