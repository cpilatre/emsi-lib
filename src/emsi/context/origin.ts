import { MAX_ID_LENGTH, MAX_USER_ID_LENGTH, MAX_NAME_X2_LENGTH, NULL_UUID } from "../../common/config"
import { Default, IndexDefaultMethod } from "../../common/default"
import { Name, OrgId, UserId } from "../../common/types"
import { ContextError } from "../../error"

export class Origin extends Default {
    orgId: OrgId  
    userId?: UserId
    name?: Name

    constructor (orgId: OrgId, userId?: UserId, name?: Name) {
        ContextError.checkLength(orgId, MAX_ID_LENGTH)
        ContextError.checkLength(userId, MAX_USER_ID_LENGTH)
        ContextError.checkLength(name, MAX_NAME_X2_LENGTH)
        super()
        this.orgId = orgId  
        this.userId = userId
        this.name = name      
    }

    @IndexDefaultMethod()
    static default (): Origin {
        return new Origin(NULL_UUID)
    }
}
