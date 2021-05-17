import { MAX_ID_LENGTH, NULL_UUID } from "../../common/config";
import { Default } from "../../common/default"
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
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'linkId')))
            this.linkId = source[key]

        if ((key = keys.find(f => f === 'linkRole')))
            this.linkRole = source[key]

        return this
    }

    static default (): Link {
        return new Link(NULL_UUID, undefined)
    }
}
