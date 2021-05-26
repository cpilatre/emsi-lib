import { v4 } from 'uuid'
import { ContextId, Datime, FreeText, Level, Mode, MsgType, SeClass, Urgency } from '../../common/types'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, NULL_UUID } from '../../common/config'
import { ContextError } from '../../error'
import { ExternalInfo } from './external-info'
import { Link } from './link'
import { Origin } from './origin'
import { Default } from '../../common/default'

export class Context extends Default {
    id: ContextId
    mode: Mode
    msgType: MsgType
    creation: Datime
    link?: Array<Link>
    level?: Level
    seClass?: SeClass
    freeText?: FreeText
    urgency?: Urgency
    origin?: Origin
    externalInfo?: Array<ExternalInfo>

    constructor (mode: Mode, msgType: MsgType, id?: ContextId, creation?: Date) {
        ContextError.checkLength(id, MAX_ID_LENGTH)
        super()
        this.id = id  || v4()
        this.mode = mode
        this.msgType = msgType
        this.creation = (creation || new Date()).toISOString()
    }

    addLinks (links: Link[]): this {
        if (!this.link)
            this.link = new Array<Link>()
        this.link.push(...links)
        return this
    }

    setLevel (level?: Level): this {
        this.level = level
        return this
    }

    setSecurityClassification (seClass?: SeClass): this {
        this.seClass = seClass
        return this
    }

    setFreeText (freeText?: FreeText): this {
        ContextError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }

    setUrgency (urgency?: Urgency): this {
        this.urgency = urgency
        return this
    }

    setOrigin (origin: Origin): this {
        this.origin = origin
        return this
    }

    addExternalInfos (externals: ExternalInfo[]): this {
        if (!this.externalInfo)
            this.externalInfo = new Array<ExternalInfo>()
        this.externalInfo.push(...externals)
        return this
    }

    static default (): Context {
        return new Context(Mode.SYSTEM, MsgType.ERROR, NULL_UUID)
    }

    assign (source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'id')))
            this.id = source[key]

        if ((key = keys.find(f => f === 'mode')))
            this.mode = source[key]            

        if ((key = keys.find(f => f === 'msgType')))
            this.msgType = source[key]    

        if ((key = keys.find(f => f === 'creation')))
            this.creation = source[key]    
        
        if ((key = keys.find(f => f === 'link'))) {
            this.link = new Array<Link>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.link?.push(Link.default().assign(add)))
            else 
                this.link.push(Link.default().assign(source[key]))
        }

        if ((key = keys.find(f => f === 'level')))
            this.level = source[key]    
            
        if ((key = keys.find(f => f === 'seClass')))
            this.seClass = source[key]

        if ((key = keys.find(f => f === 'freeText')))
            this.freeText = source[key]

        if ((key = keys.find(f => f === 'urgency')))
            this.urgency = source[key]

        if ((key = keys.find(f => f === 'origin'))) 
            this.origin = Origin.default().assign(source[key])

        if ((key = keys.find(f => f === 'externalInfo'))) {
            this.externalInfo = new Array<ExternalInfo>()
            if (source[key] instanceof Array)
                source[key].forEach((add: Record<string, any>) => this.externalInfo?.push(ExternalInfo.default().assign(add)))
            else 
                this.externalInfo.push(ExternalInfo.default().assign(source[key]))
        }

        return this
    }
}
