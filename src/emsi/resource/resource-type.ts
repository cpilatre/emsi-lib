import { MAX_RTYPE_LENGTH } from "../../common/config"
import { Default } from "../../common/default"
import { Capability, Characteristics, Class } from "../../common/types"
import { ResourceError } from "../../error"

export class RType extends Default {
    class: Array<Class>
    capability?: Array<Capability>
    characteristics?: Array<Characteristics>

    constructor(classes: Class[]) {
        classes.forEach((add: string) => ResourceError.checkLength(add, MAX_RTYPE_LENGTH))
        super()
        this.class = classes
    }

    addCapability(capabilities: Capability[]): this {
        capabilities.forEach((add: string) => ResourceError.checkLength(add, MAX_RTYPE_LENGTH))

        if (!this.capability)
            this.capability = new Array<Capability>()
        this.capability.push(...capabilities)
        return this
    }

    addCharacteristics(characteristics: Characteristics[]): this {
        characteristics.forEach((add: string) => ResourceError.checkLength(add, MAX_RTYPE_LENGTH))

        if (!this.characteristics)
            this.characteristics = new Array<Characteristics>()
        this.characteristics.push(...characteristics)
        return this
    }

    static default(): RType {
        return new RType([''])
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'class'))) {
            this.class = new Array<Class>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.class?.push(add))
            else 
                this.class.push(source[key])
        }   

        if ((key = keys.find(f => f === 'capability'))) {
            this.capability = new Array<Capability>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.capability?.push(add))
            else 
                this.capability.push(source[key])
        }   

        if ((key = keys.find(f => f === 'characteristics'))) {
            this.characteristics = new Array<Characteristics>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.characteristics?.push(add))
            else 
                this.characteristics.push(source[key])
        }   

        return this
    }
}