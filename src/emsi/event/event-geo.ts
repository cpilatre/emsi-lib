import { MAX_WEATHER_LENGTH, MAX_ETYPE_LENGTH, MAX_FREETEXT_LENGTH, MAX_ID_LENGTH } from "../../common/config";
import { Default } from "../../common/default"
import { Datime, EGeoId, EGeoStatus, EGeoType, FreeText, Weather } from "../../common/types";
import { EventError } from "../../error";
import { Position } from "../location";

export class EGeo extends Default {
    datime?: Datime
    type: EGeoType
    weather?: Array<Weather>
    freeText?: FreeText
    position?: Position
    id?: EGeoId
    status?: EGeoStatus

    constructor(type: EGeoType, position?: Position) {
        EventError.checkLength(type, MAX_ETYPE_LENGTH)

        super()
        this.type = type
        this.position = position
    }

    setDatime(datime: Datime): this {
        this.datime = datime
        return this
    }

    addWeather(weathers: Weather[]): this {
        weathers.forEach(weather => EventError.checkLength(weather, MAX_WEATHER_LENGTH))
        if (!this.weather)
            this.weather = new Array<Weather>()
        this.weather.push(...weathers)
        return this
    }

    setFreeText(freeText?: FreeText): this {
        EventError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }    

    setId(id: EGeoId): this {
        EventError.checkLength(id, MAX_ID_LENGTH)
        this.id = id
        return this
    }

    setStatus(status: EGeoStatus): this {
        this.status = status
        return this
    }

    static default(): EGeo {
        return new EGeo('')
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'datime')))
            this.datime = source[key]

        if ((key = keys.find(f => f === 'type')))
            this.type = source[key]            

        if ((key = keys.find(f => f === 'weather'))) {
            this.weather = new Array<Weather>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.weather?.push(add))
            else 
                this.weather.push(source[key])
        }   

        if ((key = keys.find(f => f === 'freeText')))
            this.freeText = source[key]            

        if ((key = keys.find(f => f === 'position')))
            this.position = Position.default().assign(source[key])   

        if ((key = keys.find(f => f === 'id')))
            this.id = source[key]     

        if ((key = keys.find(f => f === 'status')))
            this.status = source[key]            

        return this
    }
}
