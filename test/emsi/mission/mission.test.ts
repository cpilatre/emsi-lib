import { expect } from 'chai'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_NAME_X2_LENGTH, MAX_RESOURCE_ID_LENGTH, NULL_UUID } from '../../../src/common/config'
import { MissionPriority, MissionStatus } from '../../../src/common/types'
import { Mission, Position } from '../../../src/emsi'

describe('emsi :: mission', () => {
    describe('Mission', () => {
        const src = {
            type: 'Inc',
            freeText: 'Comments',
            id: NULL_UUID,
            mainMissionId: NULL_UUID,
            orgId: NULL_UUID,
            name: 'Name',
            status: 'ABO',
            startTime: new Date(2021, 5, 1).toISOString(),
            endTime: new Date(2021, 5, 2).toISOString(),
            resourceId: [NULL_UUID, NULL_UUID],
            parentMissionId: ['MISSION1', 'MISSION2'],
            childMissionId: ['MISSION11'],
            position: { locId: NULL_UUID },
            priority: '5'
        }

        it('Chek constructor', () => {
            const missionLength = () => new Mission('INC', `x${'x'.repeat(MAX_ID_LENGTH)}`) 
            expect(missionLength).to.throw() 
        })

        it('Check set methods', () => {
            const mission = new Mission('Inc')

            const freeTextLength = () => mission.setFreeText(`x${'x'.repeat(MAX_FREETEXT_LENGTH)}`)
            expect(freeTextLength).to.throw()

            const mainMissionIdLength = () => mission.setMainMissionId(`x${'x'.repeat(MAX_ID_LENGTH)}`)
            expect(mainMissionIdLength).to.throw()

            const orgIdLength = () => mission.setOrgId(`x${'x'.repeat(MAX_ID_LENGTH)}`)
            expect(orgIdLength).to.throw()

            const nameLength = () => mission.setName(`x${'x'.repeat(MAX_NAME_X2_LENGTH)}`)
            expect(nameLength).to.throw()

            const statusMin = () => mission.setStatus(MissionStatus.IN_PROGRESS, -5)
            const statusMax = () => mission.setStatus(MissionStatus.IN_PROGRESS, 105)
            expect(statusMin).to.throw()
            expect(statusMax).to.throw()

            const resourceLength = () => mission.addResourceIds([`x${'x'.repeat(MAX_RESOURCE_ID_LENGTH)}`])
            expect(resourceLength).to.throw()

            const missionsIdLength = () => mission.addParentMissionIds([`x${'x'.repeat(MAX_ID_LENGTH)}`])
            expect(missionsIdLength).to.throw()

            const childIdLength = () => mission.addChildMissionIds([`x${'x'.repeat(MAX_ID_LENGTH)}`])
            expect(childIdLength).to.throw()
        })

        it('Compare build object and assigned object', () => {

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

            const dest = Mission.default().assign(src)
            expect(mission).eql(dest)
        })
    })
})
