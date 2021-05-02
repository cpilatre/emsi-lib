import { MAX_DETAIL_LENGTH } from '../../common/config'
import { ContactType, Detail } from "../../common/types"
import { ResourceError } from "../../error/resource.error"

export class Contact {
    contact: ContactType
    detail: Detail

    constructor (contact: ContactType, detail: Detail) {
        ResourceError.checkLength(detail, MAX_DETAIL_LENGTH)
        this.contact = contact
        this.detail = detail 
    }
}