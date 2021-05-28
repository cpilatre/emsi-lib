import { MAX_RTYPE_LENGTH, MAX_FREETEXT_LENGTH, MAX_ID_LENGTH } from "../../common/config";
import { Default } from "../../common/default"
import { Datime, RGeoId, RGeoType, FreeText } from "../../common/types";
import { EventError } from "../../error";
import { Position } from "../location";

export class RGeo extends Default {
    datime?: Datime
    type: RGeoType
    freeText?: FreeText
    position?: Position
    id?: RGeoId

    constructor (type: RGeoType, position?: Position) {
        EventError.checkLength(type, MAX_RTYPE_LENGTH)
        super()
        this.type = type
        this.position = position
    }

    setDatime (datime: Datime): this {
        this.datime = datime
        return this
    }

    setFreeText (freeText?: FreeText): this {
        EventError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }    

    setId (id: RGeoId): this {
        EventError.checkLength(id, MAX_ID_LENGTH)
        this.id = id
        return this
    }

    static default (): RGeo {
        return new RGeo('')
    }

    assign (source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'datime')))
            this.datime = source[key]

        if ((key = keys.find(f => f === 'type')))
            this.type = source[key]            

         if ((key = keys.find(f => f === 'freeText')))
            this.freeText = source[key]            

        if ((key = keys.find(f => f === 'position')))
            this.position = Position.default().assign(source[key])   

        if ((key = keys.find(f => f === 'id')))
            this.id = source[key]            

        return this
    }
}
