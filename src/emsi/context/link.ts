import { MAX_ID_LENGTH, NULL_UUID } from "../../common/config";
import { Default, IndexDefaultMethod } from "../../common/default"
import { LinkId, LinkRole } from "../../common/types";
import { ContextError } from "../../error";

export class Link extends Default {
    linkId: LinkId
    linkRole?: LinkRole   

    constructor (linkId: LinkId, linkRole?: LinkRole) {
        ContextError.checkLength(linkId, MAX_ID_LENGTH)
        super()
        this.linkId = linkId
        this.linkRole = linkRole
    }

    @IndexDefaultMethod()
    static default (): Link {
        return new Link(NULL_UUID, undefined)
    }
}
