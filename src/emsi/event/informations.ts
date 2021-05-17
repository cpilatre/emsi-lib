import { Default } from "../../common/default"
import { CasualtiesStatus, Contamination, Health, Location, Triage } from "../../common/types"

export class Informations extends Default {
    status: CasualtiesStatus
    triage?: Triage
    contamination?: Contamination
    location?: Location
    health?: Health

    constructor (status: CasualtiesStatus) {
        super()
        this.status = status
    }

    setTriage (triage: Triage): this {
        this.triage = triage
        return this
    }

    setContamination (contamination: Contamination): this {
        this.contamination = contamination
        return this
    }

    setLocation (location: Location): this {
        this.location = location
        return this
    }

    setHealth (health: Health): this {
        this.health = health
        return this
    }

    default (): Informations {
        return new Informations(CasualtiesStatus.UNKNOWN)
    }

    assign (source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'status')))
            this.status = source[key]

        if ((key = keys.find(f => f === 'triage')))
            this.triage = source[key]

        if ((key = keys.find(f => f === 'contamination')))
            this.contamination = source[key]

        if ((key = keys.find(f => f === 'location')))
            this.location = source[key]

        if ((key = keys.find(f => f === 'health')))
            this.health = source[key]

        return this
    }
}