import { CasualtiesContext, Datime, Count } from "../../common/types"
import { EventError } from "../../error"
import { Informations } from "./informations"

export class Casualties {
    datime?: Datime
    context: CasualtiesContext
    count: Count
    informations?: Informations

    constructor (context: CasualtiesContext, count: Count, datime?: Date) {
        if (count < 0)
            throw new EventError('Count should be positive')
        this.count = count
        this.context = context
        this.datime = (datime || new Date()).toISOString()
    }

    setInformations (informations: Informations): this {
        this.informations = informations
        return this
    }
}