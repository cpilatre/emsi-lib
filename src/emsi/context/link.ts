import { MAX_ID_LENGTH } from "../../common/config";
import { Default } from "../../common/parse"
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

    assign (source: Record<string, any>): this {
        this.linkId = source['linkId']
        this.linkRole = source['linkRole']
        return this
    }

    static default (): Link {
        return new Link('-1', undefined)
    }
}
