import { MAX_OTHER_LENGTH } from "../../common/config"
import { Capability, Characteristics, Class } from "../../common/types"
import { ResourceError } from "../../error/resource.error"

export class RType {
    class: Array<Class>
    capability?: Array<Capability>
    characteristics?: Array<Characteristics>

    constructor (classes: Class[]) {
        classes.forEach((add: string) => ResourceError.checkLength(add, MAX_OTHER_LENGTH))
        this.class = classes
    }

    addCapability (capabilities: Capability[]): this {
        capabilities.forEach((add: string) => ResourceError.checkLength(add, MAX_OTHER_LENGTH))

        if (!this.capability)
            this.capability = new Array<Capability>()
        this.capability.push(...capabilities)
        return this
    }

    addCharacteristics (characteristics: Characteristics[]): this {
        characteristics.forEach((add: string) => ResourceError.checkLength(add, MAX_OTHER_LENGTH))

        if (!this.characteristics)
            this.characteristics = new Array<Characteristics>()
        this.characteristics.push(...characteristics)
        return this
    }
}