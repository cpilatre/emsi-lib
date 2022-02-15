import { MAX_ETYPE_LENGTH } from "../../common/config"
import { Default, IdentifyArrayProperty, IndexDefaultMethod, TypeOfArray } from "../../common/default"
import { Actor, Category, Env, LocType } from "../../common/types";
import { EventError } from "../../error"

export class EType extends Default {
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    category: Array<Category>
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    actor: Array<Actor>
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    locType: Array<LocType>
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    env?: Array<Env>

    constructor (categories: Category[], actors: Actor[], locTypes: LocType[], env?: Env[]) {
        categories.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))
        actors.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))
        locTypes.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))
        env?.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))

        super()
        this.category = categories
        this.actor = actors
        this.locType = locTypes
        this.env = env
    }

    @IndexDefaultMethod()
    static default (): EType {
        return new EType([], [], [])
    }
}
