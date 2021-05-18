import { MAX_DETAIL_LENGTH } from '../../common/config'
import { Default } from '../../common/default'
import { ContactType, Detail } from "../../common/types"
import { ResourceError } from "../../error/resource.error"

export class Contact extends Default {
    contact: ContactType
    detail: Detail

    constructor(contact: ContactType, detail: Detail) {
        ResourceError.checkLength(detail, MAX_DETAIL_LENGTH)
        super()
        this.contact = contact
        this.detail = detail 
    }

    static default(): Contact {
        return new Contact(ContactType.IP_ADDRESS, '0.0.0.0')
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'contact')))
            this.contact = source[key]

        if ((key = keys.find(f => f === 'detail')))
            this.detail = source[key]            
        return this
    }
}