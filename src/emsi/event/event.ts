import { v4 } from 'uuid'
import { Status, Certainly, Datime, EventId, Name, Scale, Source, RiskAssessmnt, Cause, FreeText } from '../../common/types'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_NAME_LENGTH, NULL_UUID } from '../../common/config'
import { EGeo } from './event-geo'
import { EType } from './event-type'
import { Reference } from './reference'
import { EventError } from '../../error'
import { Casualties } from './casualties'
import { Default } from '../../common/default'

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
    reference?: Array<Reference>
    casualties?: Array<Casualties>
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

    static default (): Event {
        return new Event(NULL_UUID)
    }

    assign (source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'id')))
            this.id = source[key]

        if ((key = keys.find(f => f === 'name')))
            this.name = source[key]

        if ((key = keys.find(f => f === 'mainEventId')))
            this.mainEventId = source[key]

        if ((key = keys.find(f => f === 'eType')))
            this.eType = EType.default().assign(source[key])

        if ((key = keys.find(f => f === 'source')))
            this.source = source[key]

        if ((key = keys.find(f => f === 'scale')))
            this.scale = source[key]

        if ((key = keys.find(f => f === 'certainly')))
            this.certainly = source[key]

        if ((key = keys.find(f => f === 'declDatime')))
            this.declDatime = source[key]

        if ((key = keys.find(f => f === 'occDatime')))
            this.occDatime = source[key]

        if ((key = keys.find(f => f === 'obsDatime')))
            this.obsDatime = source[key]
            
        if ((key = keys.find(f => f === 'status')))
            this.status = source[key]

        if ((key = keys.find(f => f === 'riskAssessmnt')))
            this.riskAssessmnt = source[key]

        if ((key = keys.find(f => f === 'reference'))) {
            this.reference = new Array<Reference>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.reference?.push(Reference.default().assign(add)))
            else 
                this.reference.push(Reference.default().assign(source[key]))
        }            
        
        if ((key = keys.find(f => f === 'eGeo'))) {
            this.eGeo = new Array<EGeo>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.eGeo?.push(EGeo.default().assign(add)))
            else 
                this.eGeo.push(EGeo.default().assign(source[key]))
        }    
           
        if ((key = keys.find(f => f === 'casualties'))) {
            this.casualties = new Array<Casualties>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.casualties?.push(Casualties.default().assign(add)))
            else 
                this.casualties.push(Casualties.default().assign(source[key]))
        }          

        if ((key = keys.find(f => f === 'cause')))
            this.cause = source[key]

        if ((key = keys.find(f => f === 'freeText')))
            this.freeText = source[key]

        return this
    }
}
