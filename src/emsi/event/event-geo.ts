import { MAX_WEATHER_LENGTH, MAX_ETYPE_LENGTH, MAX_FREETEXT_LENGTH, MAX_ID_LENGTH } from "../../common/config";
import { Default, IdentifyArrayProperty, IndexDefaultMethod, TypeOfArray } from "../../common/default"
import { Datime, EGeoId, EGeoStatus, EGeoType, FreeText, Weather } from "../../common/types";
import { EventError } from "../../error";
import { Position } from "../location";

export class EGeo extends Default {
    datime?: Datime
    type: EGeoType
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    weather?: Array<Weather>
    freeText?: FreeText
    position?: Position
    id?: EGeoId
    status?: EGeoStatus

    constructor (type: EGeoType, position?: Position) {
        EventError.checkLength(type, MAX_ETYPE_LENGTH)
        super()
        this.type = type
        this.position = position
    }

    setDatime (datime: Datime): this {
        this.datime = datime
        return this
    }

    addWeather (weathers: Weather[]): this {
        weathers.forEach(weather => EventError.checkLength(weather, MAX_WEATHER_LENGTH))
        if (!this.weather)
            this.weather = new Array<Weather>()
        this.weather.push(...weathers)
        return this
    }

    setFreeText (freeText?: FreeText): this {
        EventError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }    

    setId (id: EGeoId): this {
        EventError.checkLength(id, MAX_ID_LENGTH)
        this.id = id
        return this
    }

    setStatus (status: EGeoStatus): this {
        this.status = status
        return this
    }

    @IndexDefaultMethod()
    static default (): EGeo {
        return new EGeo('')
    }
}
