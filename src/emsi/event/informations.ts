import { CasualtiesStatus, Contamination, Health, Location, Triage } from "../../common/types"

export class Informations {
    status: CasualtiesStatus
    triage?: Triage
    contamination?: Contamination
    location?: Location
    health?: Health

    constructor (status: CasualtiesStatus) {
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
}