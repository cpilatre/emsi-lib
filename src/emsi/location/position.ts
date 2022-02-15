import { COORDSYS, MAX_ADDRESS_LENGTH, NULL_UUID } from "../../common/config";
import { Default, IdentifyArrayProperty, IndexDefaultMethod, TypeOfArray } from "../../common/default"
import { Address, CoordSys, HeightRole, LocId, Name, PositionType } from "../../common/types";
import { PositionError } from "../../error";
import { Coord } from "./coord";

export class Position extends Default {
    locId?: LocId
    name?: Name
    type?: PositionType
    coordSys: CoordSys
    heightRole?: HeightRole
    @IdentifyArrayProperty(TypeOfArray.OBJECT_ARRAY) 
    coord?: Array<Coord>
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
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

    addCoords (coords: Coord[]): this {
        if (!this.coord)
            this.coord = new Array<Coord>()
        this.coord.push(...coords)
        return this
    }

    addAddresses (addresses: Address[]): this {
        addresses.forEach(add => PositionError.checkLength(add, MAX_ADDRESS_LENGTH))

        if (!this.address)
            this.address = new Array<Address>()
        this.address.push(...addresses)
        return this
    }

    @IndexDefaultMethod()
    static default (): Position {
        return new Position(NULL_UUID)
    }
}
