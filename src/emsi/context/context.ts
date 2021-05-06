import { stringify, v4 } from 'uuid'
import { ContextId, Datime, FreeText, Level, Mode, MsgType, SeClass, Urgency } from '../../common/types'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH } from '../../common/config'
import { ContextError } from '../../error'
import { ExternalInfo } from './external-info'
import { Link } from './link'
import { Origin } from './origin'
import { Default } from '../../common/parse'

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

    addLink (links: Link[]): this {
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

    addExternalInfo (externals: ExternalInfo[]): this {
        if (!this.externalInfo)
            this.externalInfo = new Array<ExternalInfo>()
        this.externalInfo.push(...externals)
        return this
    }

    assign (source: Record<string, any>): this {
        this.id = source['id']
        this.mode = source['mode']
        this.msgType = source['msgType']
        this.creation = source['creation']
        if (source['link']) {
            this.link = new Array<Link>()
            source['link'].forEach((add: Record<string, any>) => this.link?.push(Link.default().assign(add)))
        }
        this.level = source['level']
        this.seClass = source['seClass']
        this.freeText = source['freeText']
        this.urgency = source['urgency']
        //this.origin
        //this.externalInfo
        return this
    }

    static default (): Context {
        return new Context(Mode.SYSTEM, MsgType.ERROR, undefined)
    }
}
