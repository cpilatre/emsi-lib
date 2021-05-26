import { expect } from 'chai'
import { COORDSYS, MAX_ADDRESS_LENGTH, NULL_UUID } from '../../../src/common/config'
import { HeightRole, PositionType } from '../../../src/common/types'
import { Coord, Position } from '../../../src/emsi'
import test_coord from './coord.test'

describe('emsi :: location', () => {
    const src = {
        locId: NULL_UUID,
        name: 'Name',
        type: 'POINT',
        coordSys: COORDSYS,
        heightRole: 'MIN',
        coord: [ { lat: 45, lon: 90, height: 1000 }],
        address: [ 'Address1', 'Address2' ]
    }

    describe('Components', () => {
        test_coord()
    })

    describe('Position', () => {
        it('Chek constructor', () => {
            const noParam = () => new Position()
            expect(noParam).to.throw()

            const oneParam = () => new Position(NULL_UUID)
            expect(oneParam).to.not.throw()

            const twoParam = () => new Position(NULL_UUID, 'Name')
            expect(twoParam).to.not.throw()
        })

        it('Check set methods', () => {
            const setAddrLength = () => new Position(NULL_UUID).addAddresses([`x${'x'.repeat(MAX_ADDRESS_LENGTH)}`])
            expect(setAddrLength).to.throw()
        })

        it('Compare build object and assigned object', () => {
            const coord = new Coord(45, 90, 1000)
            const position = new Position(NULL_UUID, 'Name', PositionType.POINT)
                .setHeightRole(HeightRole.MIN)
                .addCoords([coord])
                .addAddresses([ 'Address1', 'Address2' ])

            const dest = Position.default().assign(src)
            expect(position).eql(dest)
        })
    })
})