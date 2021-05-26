import { v4 } from "uuid"
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_NAME_X2_LENGTH, MAX_RESOURCE_ID_LENGTH } from "../../common/config"
import { Default } from "../../common/default"
import { Datime, FreeText, MainMissionId, MissionId, MissionPriority, MissionStatus, MissionType, Name, OrgId, ResourceId } from "../../common/types"
import { MissionError } from "../../error"
import { Position } from "../location"

export class Mission extends Default {
    type: MissionType
    freeText?: FreeText
    id: MissionId
    mainMissionId?: MainMissionId
    orgId?: OrgId
    name?: Name
    status?: MissionStatus | string
    startTime?: Datime
    endTime?: Datime
    resourceId?: Array<ResourceId>
    parentMissionId?: Array<MissionId>
    childMissionId?: Array<MissionId>
    position?: Position
    priority?: MissionPriority

    constructor (type: MissionType, id?: MissionId) {
        MissionError.checkLength(id, MAX_ID_LENGTH)
        super()
        this.type = type
        this.id = id || v4()
    }

    setFreeText (freeText?: FreeText): this {
        MissionError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.freeText = freeText
        return this
    }   

    setMainMissionId (mainId: MainMissionId): this {
        MissionError.checkLength(mainId, MAX_ID_LENGTH)
        this.mainMissionId = mainId
        return this
    }

    setOrgId (orgId: OrgId): this {
        MissionError.checkLength(orgId, MAX_ID_LENGTH)
        this.orgId = orgId
        return this
    }

    setName (name: Name): this {
        MissionError.checkLength(name, MAX_NAME_X2_LENGTH)
        this.name = name
        return this
    }

    setStatus (status: MissionStatus, completeness?: number): this {

        if (status === MissionStatus.IN_PROGRESS && completeness) 
            if (completeness > 0 && completeness < 100)
                this.status = MissionStatus.IN_PROGRESS + completeness.toString().padStart(2, '0')
            else 
                throw new MissionError('Percentage of completeness of the mission should be between 1 and 99')
        else 
            this.status = status
        return this
    }

    setStartTime (start: Date): this {
        this.startTime = start.toISOString()
        return this
    }

    setEndTime (end: Date): this {
        this.endTime = end.toISOString()
        return this
    }

    addResourceIds (resourceIds: ResourceId[]): this {
        resourceIds.forEach(add => MissionError.checkLength(add, MAX_RESOURCE_ID_LENGTH))

        if (!this.resourceId)
            this.resourceId = new Array<ResourceId>()
        this.resourceId.push(...resourceIds)
        return this
    }

    addParentMissionIds (parentIds: MissionId[]): this {
        parentIds.forEach(add => MissionError.checkLength(add, MAX_ID_LENGTH))

        if (!this.parentMissionId)
            this.parentMissionId = new Array<ResourceId>()
        this.parentMissionId.push(...parentIds)
        return this
    }

    addChildMissionIds (childIds: MissionId[]): this {
        childIds.forEach(add => MissionError.checkLength(add, MAX_ID_LENGTH))

        if (!this.childMissionId)
            this.childMissionId = new Array<ResourceId>()
        this.childMissionId.push(...childIds)
        return this
    }

    setPosition (position: Position): this {
        this.position = position
        return this
    }

    setPriority (priority: MissionPriority): this {
        this.priority = priority
        return this
    }

    static default(): Mission {
        return new Mission('')
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'type')))
            this.type = source[key]

        if ((key = keys.find(f => f === 'freeText')))
            this.freeText = source[key]

        if ((key = keys.find(f => f === 'mainMissionId')))
            this.mainMissionId = source[key]

        if ((key = keys.find(f => f === 'orgId')))
            this.orgId = source[key]

        if ((key = keys.find(f => f === 'name')))
            this.name = source[key]

        if ((key = keys.find(f => f === 'status')))
            this.status = source[key]
        
        if ((key = keys.find(f => f === 'startTime')))
            this.startTime = source[key]

        if ((key = keys.find(f => f === 'endTime')))
            this.endTime = source[key]

        if ((key = keys.find(f => f === 'parentMissionId'))) {
            this.parentMissionId = new Array<MissionId>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.parentMissionId?.push(add))
            else 
                this.parentMissionId.push(source[key])
        }               

        if ((key = keys.find(f => f === 'childMissionId'))) {
            this.childMissionId = new Array<MissionId>()
            if (source[key] instanceof Array)
                source[key].forEach((add: string) => this.childMissionId?.push(add))
            else 
                this.childMissionId.push(source[key])
        }               

        if ((key = keys.find(f => f === 'position')))
            this.position = Position.default().assign(source[key])   
        
        if ((key = keys.find(f => f === 'priority')))
            this.priority = source[key]

        return this
    }
}
