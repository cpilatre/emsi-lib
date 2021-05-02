import { MAX_ID_LENGTH } from "../../common/config";
import { LinkId, LinkRole } from "../../common/types";
import { ContextError } from "../../error";

export class Link {
    linkId: LinkId
    linkRole?: LinkRole   

    constructor (linkId: LinkId, linkRole?: LinkRole) {
        ContextError.checkLength(linkId, MAX_ID_LENGTH)
        this.linkId = linkId
        this.linkRole = linkRole
    }
}
