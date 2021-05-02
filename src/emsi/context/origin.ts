import { MAX_ID_LENGTH, MAX_OTHER_LENGTH } from "../../common/config"
import { Name, OrgId, UserId } from "../../common/types"
import { ContextError } from "../../error"

export class Origin {
    orgId: OrgId  
    userId?: UserId
    name?: Name

    constructor (orgId: OrgId, userId?: UserId, name?: Name) {
        ContextError.checkLength(orgId, MAX_ID_LENGTH)
        ContextError.checkLength(userId, MAX_OTHER_LENGTH)
        ContextError.checkLength(name, MAX_OTHER_LENGTH)
        this.orgId = orgId  
        this.userId = userId
        this.name = name      
    }
}
