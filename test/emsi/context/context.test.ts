import { expect } from 'chai'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, NULL_UUID } from '../../../src/common/config'
import { InfoType, Level, LinkRole, Mode, MsgType, SeClass, Urgency } from '../../../src/common/types'
import { Context, ExternalInfo, Link, Origin } from '../../../src/emsi/context'
import test_link from './link.test'
import test_externalInfo from './external-info.test'
import test_origin from './origin.test'

describe('emsi :: context', () => {
    describe('Components', () => {
        test_link()
        test_externalInfo()
        test_origin()
    })
    
    describe('Context', () => {
        const src = {
            id: NULL_UUID,
            mode: 'ACTUAL',
            msgType: 'ALERT',
            creation: new Date(2021, 5, 1).toISOString(),
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

        it('Check set methods', () => {
            const context = new Context(Mode.ACTUAL, MsgType.ALERT)

            const freeTextLength = () => context.setFreeText(`x${'x'.repeat(MAX_FREETEXT_LENGTH)}`)
            expect(freeTextLength).to.throw()
        })

        it('Compare build object and assigned object', () => {
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

            const dest = Context.default().assign(src)
            expect(context).eql(dest)
        })
    })
})