import { js2xml, Js2XmlFn, ParseOptions, xml2js, Xml2JsFn } from '../common/parse'
import { EmsiStatus } from '../common/types'
import { Context } from "./context";
import { Event } from "./event";
import { Mission } from "./mission";
import { Resource } from "./resource";

export class Emsi {
    context?: Context
    event?: Event
    mission?: Array<Mission>
    resource?: Array<Resource>
    
    setContext (context: Context): this {
        this.context = context
        return this 
    }

    setEvent (event: Event): this {
        this.event = event
        return this 
    }

    addMissions (missions: Mission[]): this {
        if (!this.mission)
            this.mission = new Array<Mission>()
        this.mission.push(...missions)
        return this
    }

    addResources (resources: Resource[]): this {
        if (!this.resource)
            this.resource = new Array<Resource>()
        this.resource.push(...resources)
        return this
    }

    generateXml (options?: ParseOptions, fn?: Js2XmlFn): string {
        return js2xml(
            { emsi: {
                context: this.context,
                event: this.event,
                mission: this.mission,
                resource: this.resource
            }}, options, fn )
    }

    loadFromXml (xml: string, options?: ParseOptions, fn?: Xml2JsFn): this {
        const js = xml2js(xml, options, fn)
        if (js?.emsi) {

            if (js.emsi.context) {
                this.context = Context.default().assign(js.emsi.context)
            }

            //Object.assign(this, js.emsi)
        }
        return this
    }

    checkStatus (): EmsiStatus {
        if (!this.context || !this.event)
            return EmsiStatus.PARTIAL

        if (this.context.id && this.context.mode && this.context.msgType && this.event.id)
            return EmsiStatus.READY

        if (!this.mission && !this.resource)
             return EmsiStatus.EMPTY            

        return EmsiStatus.ERROR
    }
}
