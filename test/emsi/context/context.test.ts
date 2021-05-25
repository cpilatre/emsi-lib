import { expect } from 'chai'
import { MAX_ID_LENGTH, NULL_UUID } from '../../../src/common/config'
import { Level, LinkRole, Mode, MsgType, SeClass, Urgency } from '../../../src/common/types'
import { Context, Origin } from '../../../src/emsi/context'

describe('emsi :: context', () => {
    describe('Context', () => {
        const src = {
            id: NULL_UUID,
            mode: 'ACTUAL',
            msgType: 'ALERT',
            creation: new Date().toISOString(),
            link: [
                {
                    linkId: NULL_UUID,
                    linkRole: 'ADDSTO'
                },
                {
                    linkId: NULL_UUID,
                    linkRole: 'SPRSDS'
                }
            ],
            level: 'OPR',
            seClass: 'CONFID',
            freeText: 'Comments',
            urgency: 'NOT_URGENT',
            origin: {
                orgId: NULL_UUID,
                userId: 'user',
                name: 'name'
            },
            externalInfo: [
                {
                    uri: 'http://test.com',
                    infoType: 'MAP',
                    freeText: 'Comments'
                },
                {
                    uri: 'http://test.com',
                    infoType: 'MAP',
                    freeText: 'Comments'
                }
            ]
        }

        it('Chek constructor', () => {
            const context = () => new Context(Mode.ACTUAL, MsgType.ALERT, `x${'x'.repeat(MAX_ID_LENGTH)}`) 
            expect(context).to.throw() 
        })

        it('Assign data to object', () => {
            const context = Context.default().assign(src)
            expect(context).to.have.property('id')
            expect(context).to.have.property('mode')
            expect(context).to.have.property('msgType')
            expect(context).to.have.property('creation')
            expect(context).to.have.property('link')
            expect(context.link).to.have.lengthOf(2)
            expect(context).to.have.property('level')
            expect(context).to.have.property('seClass')
            expect(context).to.have.property('freeText')
            expect(context).to.have.property('urgency')
            expect(context).to.have.property('origin')
            expect(context.origin).to.have.property('name')
            expect(context).to.have.property('externalInfo')
            expect(context.externalInfo).to.have.lengthOf(2)
        })

        it('Chek enum assignement', () => {
            const context = Context.default().assign(src)
            expect(context.mode).eq(Mode.ACTUAL)
            expect(context.msgType).eq(MsgType.ALERT)
            expect(context.level).eq(Level.OPERATIONAL)
            expect(context.seClass).eq(SeClass.CONFIDENTIAL)
            expect(context.urgency).eq(Urgency.NOT_URGENT)
        })
    })
})