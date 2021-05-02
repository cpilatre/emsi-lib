import { v4 } from 'uuid'
import { Status, Certainly, Datime, EventId, Name, Scale, Source, RiskAssessmnt, Cause, FreeText } from '../../common/types'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_OTHER_LENGTH } from '../../common/config'
import { EGeo } from './event-geo'
import { EType } from './event-type'
import { Reference } from './reference'
import { EventError } from '../../error'
import { Casualties } from './casualties'

export class Event {
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
    references?: Array<Reference>
    casualities?: Array<Casualties>
    eGeo?: Array<EGeo>
    cause?: Cause
    freeText?: FreeText

    constructor (id?: EventId, name?: Name, mainEventId?: EventId) {
        EventError.checkLength(id, MAX_ID_LENGTH)
        EventError.checkLength(name, MAX_OTHER_LENGTH)
        EventError.checkLength(mainEventId, MAX_ID_LENGTH)

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

    setOcclDatime (occ: Datime): this {
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

    addReference (references: Reference[]): this {
        if (!this.references) 
            this.references = new Array<Reference>()
        this.references.push(...references)
        return this
    }

    addCasualities (casualities: Casualties[]): this {
        if (!this.casualities) 
            this.casualities = new Array<Casualties>()
        this.casualities.push(...casualities)
        return this
    }

    addEventGeo (eGeo: EGeo[]): this {
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
}
