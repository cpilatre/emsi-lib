import { MAX_DETAIL_LENGTH } from '../../common/config'
import { Default, IndexDefaultMethod } from '../../common/default'
import { ContactType, Detail } from "../../common/types"
import { ResourceError } from "../../error/resource.error"

export class Contact extends Default {
    contact: ContactType
    detail: Detail

    constructor (contact: ContactType, detail: Detail) {
        ResourceError.checkLength(detail, MAX_DETAIL_LENGTH)
        super()
        this.contact = contact
        this.detail = detail 
    }

    @IndexDefaultMethod()
    static default (): Contact {
        return new Contact(ContactType.IP_ADDRESS, '0.0.0.0')
    }
}