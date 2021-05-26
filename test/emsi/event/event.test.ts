import { expect } from 'chai'
import test_reference from './reference.test'
import test_information from './informations.test'
import test_eType from './event-type.test'
import test_eGeo from './event-geo.test'
import test_casualties from './casualties.test'
import { MAX_ID_LENGTH, MAX_NAME_LENGTH, NULL_UUID } from '../../../src/common/config'
import { Casualties, EGeo, EType, Event, Reference } from '../../../src/emsi'
import { CasualtiesContext, Cause, RiskAssessmnt, Scale, Source, Status } from '../../../src/common/types'

describe('emsi :: event', () => {
    const src = {
        id: NULL_UUID,
        name: 'Name',
        mainEventId: NULL_UUID,
        eType: {
            category: ['cat1'],
            actor: ['act1'],
            locType: ['loc1']
        },
        source: 'COMFOR',
        scale: '1',
        certainly: 5,
        declDatime: new Date(2021, 0, 1).toISOString(),
        occDatime: new Date(2021, 0, 2).toISOString(),
        obsDatime: new Date(2021, 0, 3).toISOString(),
        status: 'COM',
        riskAssessmnt: 'INCREA',
        reference: [{
            orgId: NULL_UUID,
            otherEventId: [ NULL_UUID]
        }],
        casualties: [{
            datime: new Date(2021, 4, 26).toISOString(),
            context: 'REQ_ACTION',
            count: 1
        }],
        eGeo: [{ type: 'eGeo type' }],
        cause: 'ACC',
        freeText: 'Comments'
    }

    describe('Components', () => {
        test_reference()
        test_information()
        test_eType()
        test_eGeo()
        test_casualties()
    })

    it('Chek constructor', () => {
        const idLength = () => new Event(`x${'x'.repeat(MAX_ID_LENGTH)}`) 
        expect(idLength).to.throw() 

        const nameLength = () => new Event('', `x${'x'.repeat(MAX_NAME_LENGTH)}`) 
        expect(nameLength).to.throw() 

        const mainEventLength = () => new Event('', '', `x${'x'.repeat(MAX_ID_LENGTH)}`) 
        expect(mainEventLength).to.throw() 
    })

    it('Compare build object and assigned object', () => {
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

        const dest = Event.default().assign(src)
        expect(event).eql(dest)
    })
})