import { MAX_ID_LENGTH } from "../../common/config";
import { EventId, OrgId } from "../../common/types";
import { EventError } from "../../error";

export class Reference {
    orgId: OrgId
    otherEventId: Array<EventId>

    constructor (orgId: OrgId, otherEventIds: Array<EventId>) {
        EventError.checkLength(orgId, MAX_ID_LENGTH)
        otherEventIds.forEach(eventId => EventError.checkLength(eventId, MAX_ID_LENGTH))

        this.orgId = orgId
        this.otherEventId = otherEventIds
    }
}
