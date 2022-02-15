import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_NAME_LENGTH, MAX_RESOURCE_ID_LENGTH } from "../../common/config"
import { Default, IdentifyArrayProperty, IndexDefaultMethod, TypeOfArray } from "../../common/default"
import { FreeText, Name, Nationality, OrgId, Quantity, ResourceId, ResourceStatus, UnitOfMeasure } from "../../common/types"
import { ResourceError } from "../../error/resource.error"
import { Contact } from "./contact"
import { RGeo } from "./resource-geo"
import { RType } from "./resource-type"

export class Resource extends Default {
    @IdentifyArrayProperty(TypeOfArray.OBJECT_ARRAY) 
    rType: Array<RType>
    id?: ResourceId
    orgId?: OrgId
    name?: Name
    freeText?: FreeText
    @IdentifyArrayProperty(TypeOfArray.OBJECT_ARRAY) 
    rGeo?: Array<RGeo>
    quantity?: Quantity
    um?: UnitOfMeasure
    status?: ResourceStatus
    nationality?: Nationality
    @IdentifyArrayProperty(TypeOfArray.OBJECT_ARRAY) 
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

    setFreeText (freeText?: FreeText): this {
        ResourceError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }   

    addResourceGeos (rgeos: RGeo[]): this {
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
 
    addContacts (contacts: Contact[]): this {
        if (!this.contact)
            this.contact = new Array<Contact>()
        this.contact.push(...contacts)
        return this
    }

    @IndexDefaultMethod()
    static default (): Resource {
        return new Resource([RType.default()])
    }
}
