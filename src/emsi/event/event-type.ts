import { MAX_ETYPE_LENGTH } from "../../common/config"
import { Default } from "../../common/default"
import { Actor, Category, Env, LocType } from "../../common/types";
import { EventError } from "../../error"

export class EType extends Default {
    category: Array<Category>
    actor: Array<Actor>
    locType: Array<LocType>
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

    static default (): EType {
        return new EType([], [], [])
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)
        
        if ((key = keys.find(f => f === 'category'))) {
            this.category = new Array<Category>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.category?.push(add))
            else 
                this.category.push(source[key])
        }        

        if ((key = keys.find(f => f === 'actor'))) {
            this.actor = new Array<Actor>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.actor?.push(add))
            else 
                this.actor.push(source[key])
        }     

        if ((key = keys.find(f => f === 'locType'))) {
            this.locType = new Array<LocType>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.locType?.push(add))
            else 
                this.locType.push(source[key])
        }             

        if ((key = keys.find(f => f === 'env'))) {
            this.env = new Array<Env>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.env?.push(add))
            else 
                this.env.push(source[key])
        }     

        return this
    }    
}
