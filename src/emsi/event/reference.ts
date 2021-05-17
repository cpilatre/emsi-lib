import { MAX_ID_LENGTH, NULL_UUID } from "../../common/config";
import { Default } from "../../common/default"
import { EventId, OrgId } from "../../common/types";
import { EventError } from "../../error";

export class Reference extends Default {
    orgId: OrgId
    otherEventId: Array<EventId>

    constructor (orgId: OrgId, otherEventIds: Array<EventId>) {
        EventError.checkLength(orgId, MAX_ID_LENGTH)
        otherEventIds.forEach(eventId => EventError.checkLength(eventId, MAX_ID_LENGTH))

        super()
        this.orgId = orgId
        this.otherEventId = otherEventIds
    }

    static default (): Reference {
        return new Reference(NULL_UUID, [])
    }

    assign (source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'orgId')))
            this.orgId = source[key]

        if ((key = keys.find(f => f === 'otherEventId'))) {
            this.otherEventId = new Array<EventId>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.otherEventId?.push(add))
            else 
                this.otherEventId.push(source[key])
        }      
            
        return this
    }
}
