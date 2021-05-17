import { MAX_ID_LENGTH, MAX_OTHER_LENGTH, NULL_UUID } from "../../common/config"
import { Default } from "../../common/default"
import { Name, OrgId, UserId } from "../../common/types"
import { ContextError } from "../../error"

export class Origin extends Default {
    orgId: OrgId  
    userId?: UserId
    name?: Name

    constructor (orgId: OrgId, userId?: UserId, name?: Name) {
        ContextError.checkLength(orgId, MAX_ID_LENGTH)
        ContextError.checkLength(userId, MAX_OTHER_LENGTH)
        ContextError.checkLength(name, MAX_OTHER_LENGTH)
        super()
        this.orgId = orgId  
        this.userId = userId
        this.name = name      
    }

    assign (source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'orgId')))
            this.orgId = source[key]

        if ((key = keys.find(f => f === 'userId')))
            this.userId = source[key]

        if ((key = keys.find(f => f === 'name')))
            this.name = source[key]

        return this
    }

    static default (): Origin {
        return new Origin(NULL_UUID)
    }
}
