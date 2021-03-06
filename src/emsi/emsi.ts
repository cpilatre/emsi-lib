import { js2xml, Js2XmlFn, ParseOptions, xml2js, Xml2JsFn } from '../common/parse'
import { EmsiStatus } from '../common/types'
import { Context } from "./context";
import { Event } from "./event";
import { Mission } from "./mission";
import { Resource } from "./resource";

/**
 * An EMSI describes a part of the operational picture at a particular time. 
 * It is exchanged between nodes in order to transfer information and describes
 * events, resources and missions.  */
export class Emsi {
    
    /** Identifies the context of the EMSI. */
    context?: Context
    
    /** Describes the event that the EMSI relates to. */
    event?: Event

    /** Describes the missions which are completed, are ongoing, or are planned and is
     * related to the event and context reported in the EMSI. */
    mission?: Array<Mission>

    /** Describes the resources (human, vehicles, other hardware, etc...) which the EMSI 
     * node has the authority to deploy and is related to the event and context reported
     * in the EMSI. */
    resource?: Array<Resource>
    
    /** Set the context of the EMSI (mandatory) */
    setContext (context: Context): this {
        this.context = context
        return this 
    }

    /** Set the event of the EMSI (mandatory) */
    setEvent (event: Event): this {
        this.event = event
        return this 
    }

    /** Add one or more missions */
    addMissions (missions: Mission[]): this {
        if (!this.mission)
            this.mission = new Array<Mission>()
        this.mission.push(...missions)
        return this
    }

    /** Add one or more resources */    
    addResources (resources: Resource[]): this {
        if (!this.resource)
            this.resource = new Array<Resource>()
        this.resource.push(...resources)
        return this
    }

    /**
     * Returns a well-formed XML EMSI
     * 
     * @remarks By default, tags are CamelCase formatted, and output is indented
     * 
     * @param options Modifying certain behaviours for XML generation
     * @param fn An alternative function for generating XML
     * @returns The XML EMSI string
     */
    generateXml (options?: ParseOptions, fn?: Js2XmlFn): string {
        return js2xml(
            { emsi: {
                context: this.context,
                event: this.event,
                mission: this.mission,
                resource: this.resource
            }}, options, fn)
    }

    loadFromXml (xml: string, options?: ParseOptions, fn?: Xml2JsFn): this {
        const js = xml2js(xml, options, fn)

        if (js?.emsi) {

            if (js.emsi.context) {
                this.context = Context.default().assign(js.emsi.context)
            }

            if (js.emsi.event) {
                this.event = Event.default().assign(js.emsi.event)
            }

            if (js.emsi.mission) {
                this.mission = new Array<Mission>()
                if (js.emsi.mission instanceof Array)
                    js.emsi.mission.forEach((add: Record<string, any>) => this.mission?.push(Mission.default().assign(add)))
                else 
                    this.mission.push(Mission.default().assign(js.emsi.mission))
            }

            if (js.emsi.resource) {
                this.resource = new Array<Resource>()
                if (js.emsi.resource instanceof Array)
                    js.emsi.resource.forEach((add: Record<string, any>) => this.resource?.push(Resource.default().assign(add)))
                else 
                    this.resource.push(Resource.default().assign(js.emsi.resource))
            }
        }

        return this
    }

    /**
     * Check EMSI object 
     * @beta
     */
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
