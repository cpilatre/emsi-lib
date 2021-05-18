import { Default } from "../../common/default"
import { Height, Latitude, Longitude } from "../../common/types";
import { PositionError } from "../../error";

export class Coord extends Default {
    lat: Latitude 
    lon: Longitude 
    height?: Height

    constructor (lat: Latitude, lon: Longitude, height?: Height) {
        if (lat < -90 || lat > 90)
            throw new PositionError('Latitude must be between -90 and +90 degrees')
        if (lon < -180 || lon > 180)
            throw new PositionError('Longitude must be between -180 and +180 degrees')

        super()
        this.lat = lat
        this.lon = lon
        this.height = height
    }

    static default(): Coord {
        return new Coord(0, 0)
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'lat')))
            this.lat = source[key]

        if ((key = keys.find(f => f === 'lon')))
            this.lon = source[key]

        if ((key = keys.find(f => f === 'height')))
            this.height = source[key]

        return this
    }
}