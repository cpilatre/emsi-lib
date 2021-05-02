import { COORDSYS, MAX_ADDRESS_LENGTH } from "../../common/config";
import { Address, CoordSys, HeightRole, LocId, Name, PositionType } from "../../common/types";
import { PositionError } from "../../error";
import { Coord } from "./coord";

export class Position {
    locId?: LocId
    name?: Name
    type?: PositionType
    coordSys: CoordSys
    heightRole?: HeightRole
    coord?: Array<Coord>
    address?: Array<Address>

    constructor (locId?: LocId, name?: Name, type?: PositionType) {
        if (!locId && !name && !type)
            throw new PositionError(`All first level elements of 'Position' are optional, but at least on should be provided.`)

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
}