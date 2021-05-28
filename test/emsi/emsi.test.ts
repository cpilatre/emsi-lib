import { expect } from 'chai'
import { NULL_UUID } from '../../src/common/config'
import { MissionStatus, MissionPriority, ContactType, ResourceStatus, Source, CasualtiesContext, Scale, RiskAssessmnt, Cause, Status, InfoType, Level, LinkRole, Mode, MsgType, SeClass, Urgency } from '../../src/common/types'
import { Resource, RType, RGeo, Contact, Mission, Position, Context, Emsi, ExternalInfo, Link, Origin, EType, Reference, Casualties, EGeo, Event } from '../../src/emsi'
import { xmlContext, xmlEvent, xmlMission, xmlResource } from '../mocks/xml'

describe('emsi :: emsi', () => {
    it('Generate XML from Context', () => {
        const link1 = new Link(NULL_UUID, LinkRole.ADD_TO)
        const link2 = new Link(NULL_UUID, LinkRole.SUPERSEDE)
        const info = new ExternalInfo('http://test.com', InfoType.MAP, 'Comments')

        const context = new Context(Mode.ACTUAL, MsgType.ALERT, NULL_UUID, new Date(2021, 5, 1))
            .addLinks([link1, link2])
            .setLevel(Level.OPERATIONAL)
            .setSecurityClassification(SeClass.CONFIDENTIAL)
            .setFreeText('Comments')
            .setUrgency(Urgency.NOT_URGENT)
            .setOrigin(new Origin(NULL_UUID, 'user', 'name'))
            .addExternalInfos([info, info])

        const emsi = new Emsi().setContext(context)
        const xml = emsi.generateXml({ format: false })

        // First
        expect(xml).eq(xmlContext)

        // and...
        const dest = new Emsi().loadFromXml(xmlContext)
        expect(emsi).eql(dest)
    })

    it('Generate XML from Event', () => {
        const eType = new EType(['cat1'], ['act1'], ['loc1'])
        const reference = new Reference(NULL_UUID, [NULL_UUID])
        const casualties = new Casualties(CasualtiesContext.REQUIRING_ACTION, 1, new Date(2021, 4, 26))
        const eGeo = new EGeo('eGeo type')

        const event = new Event(NULL_UUID, 'Name', NULL_UUID)
            .setEventType(eType)
            .setSource(Source.COMPUTER_FORECAST)
            .setScale(Scale.LEVEL_1)
            .setCertainly(5)
            .setDeclDatime(new Date(2021, 0, 1).toISOString())
            .setOccDatime(new Date(2021, 0, 2).toISOString())
            .setObsDatime(new Date(2021, 0, 3).toISOString())
            .setStatus(Status.EVENT_COMPLETE)
            .setRiskAssessmnt(RiskAssessmnt.INCREASING)
            .addReferences([reference])
            .addCasualties([casualties])
            .addEventGeos([eGeo])
            .setCause(Cause.ACCIDENTAL)
            .setFreeText('Comments')

        const emsi = new Emsi().setEvent(event)
        const xml = emsi.generateXml({ format: false })

        // First
        expect(xml).eq(xmlEvent)

        // and...
        const dest = new Emsi().loadFromXml(xmlEvent)
        expect(emsi).eql(dest)
    })

    it('Generate XML from Mission', () => {
        const mission = new Mission('Inc', NULL_UUID)
            .setFreeText('Comments')
            .setMainMissionId(NULL_UUID)
            .setOrgId(NULL_UUID)
            .setName('Name')
            .setStatus(MissionStatus.ABORTED)
            .setStartTime(new Date(2021, 5, 1))
            .setEndTime(new Date(2021, 5, 2))
            .addResourceIds([NULL_UUID, NULL_UUID])
            .addParentMissionIds(['MISSION1', 'MISSION2'])
            .addChildMissionIds(['MISSION11'])
            .setPosition(new Position(NULL_UUID))
            .setPriority(MissionPriority.HIGHEST_PRIORITY)

        const emsi = new Emsi().addMissions([mission])
        const xml = emsi.generateXml({ format: false })

        // First
        expect(xml).eq(xmlMission)

        // and...
        const dest = new Emsi().loadFromXml(xmlMission)
        expect(emsi).eql(dest)
    })

    it('Generate XML from Resource', () => {
        const rType = new RType(['HUM', 'ORG'])
            .addCapabilities(['AER35M'])
            .addCharacteristics(['HGT'])

        const rGeo = new RGeo('CUR', Position.default())
            .setDatime(new Date(2021, 5, 1).toISOString())
            .setFreeText('Comments')
            .setId(NULL_UUID)

        const contact = new Contact(ContactType.IP_ADDRESS, '0.0.0.0')

        const resource = new Resource([rType], NULL_UUID)
            .setOrgId(NULL_UUID)
            .setName('Name')
            .setFreeText('Comments')
            .addResourceGeos([rGeo])
            .setQuantity(10)
            .setUnitOfMeasure('kg')
            .setStatus(ResourceStatus.AVAILABLE)
            .setNationality('FR')
            .addContacts([contact])

        const emsi = new Emsi().addResources([resource])
        const xml = emsi.generateXml({ format: false })

        // First
        expect(xml).eq(xmlResource)

        // and...
        const dest = new Emsi().loadFromXml(xmlResource)
        expect(emsi).eql(dest)
    })
})
