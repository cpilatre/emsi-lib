import { MAX_ID_LENGTH, NULL_UUID } from "../../common/config";
import { Default, IdentifyArrayProperty, IndexDefaultMethod, TypeOfArray } from "../../common/default"
import { EventId, OrgId } from "../../common/types";
import { EventError } from "../../error";

export class Reference extends Default {
    orgId: OrgId
    @IdentifyArrayProperty(TypeOfArray.STRING_ARRAY) 
    otherEventId: Array<EventId>

    constructor (orgId: OrgId, otherEventIds: Array<EventId>) {
        EventError.checkLength(orgId, MAX_ID_LENGTH)
        otherEventIds.forEach(eventId => EventError.checkLength(eventId, MAX_ID_LENGTH))

        super()
        this.orgId = orgId
        this.otherEventId = otherEventIds
    }

    @IndexDefaultMethod()
    static default (): Reference {
        return new Reference(NULL_UUID, [])
    }
}
