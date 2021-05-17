import { COORDSYS, MAX_ADDRESS_LENGTH, NULL_UUID } from "../../common/config";
import { Default } from "../../common/default"
import { Address, CoordSys, HeightRole, LocId, Name, PositionType } from "../../common/types";
import { PositionError } from "../../error";
import { Coord } from "./coord";

export class Position extends Default {
    locId?: LocId
    name?: Name
    type?: PositionType
    coordSys: CoordSys
    heightRole?: HeightRole
    coord?: Array<Coord>
    address?: Array<Address>

    constructor (locId?: LocId, name?: Name, type?: PositionType) {
        if (!locId && !name && !type)
            throw new PositionError(`All first level elements of 'Position' are optional, but at least one should be provided.`)

        super()
        this.locId = locId
        this.name = name
        this.type = type
        this.coordSys = COORDSYS
    }

    setHeightRole (heightRole: HeightRole): this {
        this.heightRole = heightRole
        return this 
    }

    addCoord (coords: Coord[]): this {
        if (!this.coord)
            this.coord = new Array<Coord>()
        this.coord.push(...coords)
        return this
    }

    addAddress (address: Address[]): this {
        address.forEach(add => PositionError.checkLength(add, MAX_ADDRESS_LENGTH))

        if (!this.address)
            this.address = new Array<Address>()
        this.address.push(...address)
        return this
    }

    default (): Position {
        return new Position(NULL_UUID)
    }

    assign (source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'locId')))
            this.locId = source[key]

        if ((key = keys.find(f => f === 'name')))
            this.name = source[key]

        if ((key = keys.find(f => f === 'type')))
            this.type = source[key]

        if ((key = keys.find(f => f === 'coordSys')))
            this.coordSys = source[key]

        if ((key = keys.find(f => f === 'heightRole')))
            this.heightRole = source[key]

        if ((key = keys.find(f => f === 'coord'))) {
            this.coord = new Array<Coord>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.coord?.push(Coord.default().assign(add)))
            else 
                this.coord.push(Coord.default().assign(source[key]))
        }            

        if ((key = keys.find(f => f === 'address'))) {
            this.address = new Array<Address>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.address?.push(add))
            else 
                this.address.push(source[key])
        }   

        return this
    }
}
