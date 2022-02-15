import { Default, IndexDefaultMethod } from "../../common/default"
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

    @IndexDefaultMethod()
    static default (): Coord {
        return new Coord(0, 0)
    }
}