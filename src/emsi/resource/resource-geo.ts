import { MAX_WEATHER_LENGTH, MAX_OTHER_LENGTH, MAX_FREETEXT_LENGTH, MAX_ID_LENGTH } from "../../common/config";
import { Datime, RGeoId, RGeoType, FreeText, Weather } from "../../common/types";
import { EventError } from "../../error";
import { Position } from "../location";

export class RGeo {
    datime?: Datime
    type: RGeoType
    freeText?: FreeText
    position: Position
    id?: RGeoId

    constructor (type: RGeoType, position: Position) {
        EventError.checkLength(type, MAX_OTHER_LENGTH)
        this.type = type
        this.position = position
    }

    setDatime (datime: Datime): this {
        this.datime = datime
        return this
    }

    addWeather (weathers: Weather[]): this {
        weathers.forEach(weather => EventError.checkLength(weather, MAX_WEATHER_LENGTH))
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
}
