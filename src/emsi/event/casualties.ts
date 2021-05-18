import { Default } from "../../common/default"
import { CasualtiesContext, Datime, Count } from "../../common/types"
import { EventError } from "../../error"
import { Informations } from "./informations"

export class Casualties extends Default {
    datime?: Datime
    context: CasualtiesContext
    count: Count
    informations?: Informations

    constructor(context: CasualtiesContext, count: Count, datime?: Date) {
        if (count < 0)
            throw new EventError('Count should be positive')
        super()
        this.count = count
        this.context = context
        this.datime = (datime || new Date()).toISOString()
    }

    setInformations(informations: Informations): this {
        this.informations = informations
        return this
    }

    static default(): Casualties {
        return new Casualties(CasualtiesContext.INITIAL_STATEMENT, 0)
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'datime')))
            this.datime = source[key]

        if ((key = keys.find(f => f === 'context')))
            this.context = source[key]

        if ((key = keys.find(f => f === 'count')))
            this.count = source[key]

        if ((key = keys.find(f => f === 'informations')))
            this.informations = Informations.default().assign(source[key])

        return this
    }    
}