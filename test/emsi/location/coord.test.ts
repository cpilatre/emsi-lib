import { expect } from 'chai'
import { Coord } from '../../../src/emsi/location'

export default function (): any {
    describe('Coord', () => {
        const src = {
            lat: 45, 
            lon: 90,
            height: 1000
        }

        it('Chek constructor', () => {
            const latOverflow = () => new Coord(222, 0)
            expect(latOverflow).to.throw() 

            const lonOverflow = () => new Coord(0, 222)
            expect(lonOverflow).to.throw() 
        })

        it('Assign data to object', () => {
            const coord = Coord.default().assign(src)
            expect(coord).to.have.property('lat', 45)
            expect(coord).to.have.property('lon', 90)
            expect(coord).to.have.property('height', 1000)
        })
    })
}