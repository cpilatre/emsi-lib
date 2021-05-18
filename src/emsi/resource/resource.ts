import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_NAME_LENGTH, MAX_RESOURCE_ID_LENGTH } from "../../common/config"
import { Default } from "../../common/default"
import { FreeText, Name, Nationality, OrgId, Quantity, ResourceId, ResourceStatus, UnitOfMeasure } from "../../common/types"
import { ResourceError } from "../../error/resource.error"
import { Contact } from "./contact"
import { RGeo } from "./resource-geo"
import { RType } from "./resource-type"

export class Resource extends Default {
    rType: Array<RType>
    id?: ResourceId
    orgId?: OrgId
    name?: Name
    freeText?: FreeText
    rGeo?: Array<RGeo>
    quantity?: Quantity
    um?: UnitOfMeasure
    status?: ResourceStatus
    nationality?: Nationality
    contact?: Array<Contact>

    constructor (rTypes: RType[], id?: ResourceId) {
        if (rTypes.length === 0)
            throw new ResourceError('Description of resource is required')
        ResourceError.checkLength(id, MAX_RESOURCE_ID_LENGTH)
        super()
        this.rType = rTypes
        this.id = id 
    }

    setOrgId (orgId: OrgId): this {
        ResourceError.checkLength(orgId, MAX_ID_LENGTH)
        this.orgId = orgId
        return this
    }

    setName (name: Name): this {
        ResourceError.checkLength(name, MAX_NAME_LENGTH)
        this.name = name
        return this
    }

    setfreeText (freeText?: FreeText): this {
        ResourceError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }   

    addResourceGeo (rgeos: RGeo[]): this {
        if (!this.rGeo)
            this.rGeo = new Array<RGeo>()
        this.rGeo.push(...rgeos)
        return this
    }

    setQuantity (quantity: Quantity): this {
        this.quantity = quantity
        return this
    }

    setUnitOfMeasure (unit: UnitOfMeasure): this {
        this.um = unit
        return this
    }

    setStatus (status: ResourceStatus): this {
        this.status = status
        return this
    }

    setNationality (nationality: Nationality): this {
        this.nationality = nationality.substring(0, 2).toUpperCase()
        return this
    }
 
    addContact (contacts: Contact[]): this {
        if (!this.contact)
            this.contact = new Array<Contact>()
        this.contact.push(...contacts)
        return this
    }

    static default(): Resource {
        return new Resource([RType.default()])
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'id')))
            this.id = source[key]
        
        if ((key = keys.find(f => f === 'orgId')))
            this.orgId = source[key]

        if ((key = keys.find(f => f === 'name')))
            this.name = source[key]

        if ((key = keys.find(f => f === 'quantity')))
            this.quantity = source[key]

        if ((key = keys.find(f => f === 'um')))
            this.um = source[key]

        if ((key = keys.find(f => f === 'freeText')))
            this.freeText = source[key]

        if ((key = keys.find(f => f === 'status')))
            this.status = source[key]

        if ((key = keys.find(f => f === 'nationality')))
            this.nationality = source[key]

        if ((key = keys.find(f => f === 'rType'))) {
            this.rType = new Array<RType>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.rType?.push(RType.default().assign(add)))
            else 
                this.rType.push(RType.default().assign([key]))
        }   
        
        if ((key = keys.find(f => f === 'rGeo'))) {
            this.rGeo = new Array<RGeo>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.rGeo?.push(RGeo.default().assign(add)))
            else 
                this.rGeo.push(RGeo.default().assign([key]))
        }   

        if ((key = keys.find(f => f === 'contact'))) {
            this.contact = new Array<Contact>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.contact?.push(Contact.default().assign(add)))
            else 
                this.contact.push(Contact.default().assign([key]))
        }   
        
        return this
    }
}
