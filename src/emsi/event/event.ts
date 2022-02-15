import { v4 } from 'uuid'
import { Status, Certainly, Datime, EventId, Name, Scale, Source, RiskAssessmnt, Cause, FreeText } from '../../common/types'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_NAME_LENGTH, NULL_UUID } from '../../common/config'
import { EGeo } from './event-geo'
import { EType } from './event-type'
import { Reference } from './reference'
import { EventError } from '../../error'
import { Casualties } from './casualties'
import { Default, IdentifyArrayProperty, IndexDefaultMethod, TypeOfArray } from "../../common/default"

export class Event extends Default {
    id?: EventId
    name?: Name
    mainEventId?: EventId
    eType?: EType
    source?: Source
    scale?: Scale
    certainly?: Certainly
    declDatime?: Datime
    occDatime?: Datime
    obsDatime?: Datime
    status?: Status
    riskAssessmnt?: RiskAssessmnt
    @IdentifyArrayProperty(TypeOfArray.OBJECT_ARRAY) 
    reference?: Array<Reference>
    @IdentifyArrayProperty(TypeOfArray.OBJECT_ARRAY) 
    casualties?: Array<Casualties>
    @IdentifyArrayProperty(TypeOfArray.OBJECT_ARRAY) 
    eGeo?: Array<EGeo>
    cause?: Cause
    freeText?: FreeText

    constructor (id?: EventId, name?: Name, mainEventId?: EventId) {
        EventError.checkLength(id, MAX_ID_LENGTH)
        EventError.checkLength(name, MAX_NAME_LENGTH)
        EventError.checkLength(mainEventId, MAX_ID_LENGTH)

        super()
        this.id = id || v4()
        this.name = name
        this.mainEventId = mainEventId
    }

    setEventType (eType: EType): this {
        this.eType = eType
        return this
    }

    setSource (source: Source): this {
        this.source = source
        return this
    }

    setScale (scale: Scale): this {
        this.scale = scale
        return this
    }

    setCertainly (certainly: Certainly): this {
        if (certainly < 0 || certainly > 100)
            throw new EventError(`Field "certainly" must be between 0 and 100 included`)
        this.certainly = certainly
        return this
    }

    setDeclDatime (decl: Datime): this {
        this.declDatime = decl
        return this
    }

    setOccDatime (occ: Datime): this {
        this.occDatime = occ
        return this
    }

    setObsDatime (obs: Datime): this {
        this.obsDatime = obs
        return this
    }

    setStatus (status: Status): this {
        this.status = status
        return this
    }

    setRiskAssessmnt (risk: RiskAssessmnt): this {
        this.riskAssessmnt = risk
        return this
    }

    addReferences (references: Reference[]): this {
        if (!this.reference) 
            this.reference = new Array<Reference>()
        this.reference.push(...references)
        return this
    }

    addCasualties (casualties: Casualties[]): this {
        if (!this.casualties) 
            this.casualties = new Array<Casualties>()
        this.casualties.push(...casualties)
        return this
    }

    addEventGeos (eGeo: EGeo[]): this {
        if (!this.eGeo) 
            this.eGeo = new Array<EGeo>()
        this.eGeo.push(...eGeo)
        return this
    }

    setCause (cause: Cause): this {
        this.cause = cause
        return this
    }

    setFreeText (freeText?: FreeText): this {
        EventError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }    

    @IndexDefaultMethod()
    static default (): Event {
        return new Event(NULL_UUID)
    }
}
