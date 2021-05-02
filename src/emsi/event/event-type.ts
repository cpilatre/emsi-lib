import { MAX_ETYPE_LENGTH } from "../../common/config"
import { Actor, Category, Env, LocType } from "../../common/types";
import { EventError } from "../../error"

export class EType {
    categories: Array<Category>
    actors: Array<Actor>
    locTypes: Array<LocType>
    env?: Array<Env>

    constructor (categories: Category[], actors: Actor[], locTypes: LocType[], env?: Env[]) {
        categories.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))
        actors.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))
        locTypes.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))
        env?.forEach((add: string) => EventError.checkLength(add, MAX_ETYPE_LENGTH))

        this.categories = categories
        this.actors = actors
        this.locTypes = locTypes
        this.env = env
    }
}
