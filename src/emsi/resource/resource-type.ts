import { MAX_RTYPE_LENGTH } from "../../common/config"
import { Default, IdentifyArrayProperty, IndexDefaultMethod, TypeOfArray } from "../../common/default"
import { Capability, Characteristics, Class } from "../../common/types"
import { ResourceError } from "../../error"

export class RType extends Default {
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    class: Array<Class>
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    capability?: Array<Capability>
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    characteristics?: Array<Characteristics>

    constructor (classes: Class[]) {
        classes.forEach((add: string) => ResourceError.checkLength(add, MAX_RTYPE_LENGTH))
        super()
        this.class = classes
    }

    addCapabilities (capabilities: Capability[]): this {
        capabilities.forEach((add: string) => ResourceError.checkLength(add, MAX_RTYPE_LENGTH))

        if (!this.capability)
            this.capability = new Array<Capability>()
        this.capability.push(...capabilities)
        return this
    }

    addCharacteristics (characteristics: Characteristics[]): this {
        characteristics.forEach((add: string) => ResourceError.checkLength(add, MAX_RTYPE_LENGTH))

        if (!this.characteristics)
            this.characteristics = new Array<Characteristics>()
        this.characteristics.push(...characteristics)
        return this
    }

    @IndexDefaultMethod()
    static default (): RType {
        return new RType([''])
    }
}