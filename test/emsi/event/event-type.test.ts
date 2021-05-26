import { expect } from 'chai'
import { MAX_ETYPE_LENGTH } from '../../../src/common/config'
import { EType } from '../../../src/emsi/event'

export default function (): any {
    describe('EType', () => {
        const src = {
            category: ['cat1', 'cat2'],
            actor: ['act1', 'act2', 'act3'],
            locType: ['loc1', 'loc2', 'loc3', 'loc4'],
            env: ['env1']
        }

        it('Chek constructor', () => {
            const categoryLength = () => new EType([`x${'x'.repeat(MAX_ETYPE_LENGTH)}`], [], [], []) 
            expect(categoryLength).to.throw() 

            const actorLength = () => new EType([], [`x${'x'.repeat(MAX_ETYPE_LENGTH)}`], [], []) 
            expect(actorLength).to.throw() 

            const locTypeLength = () => new EType([], [], [`x${'x'.repeat(MAX_ETYPE_LENGTH)}`], []) 
            expect(locTypeLength).to.throw() 

            const envLength = () => new EType([], [], [], [`x${'x'.repeat(MAX_ETYPE_LENGTH)}`]) 
            expect(envLength).to.throw() 
        })

        it('Assign data to object', () => {
            const eType = EType.default().assign(src)
            expect(eType).to.have.property('category')
            expect(eType.category).to.have.lengthOf(2)
            expect(eType.category).to.be.an('array').that.does.include('cat2');

            expect(eType).to.have.property('actor')
            expect(eType.actor).to.have.lengthOf(3)
            expect(eType.actor).to.be.an('array').that.does.include('act3');

            expect(eType).to.have.property('locType')
            expect(eType.locType).to.have.lengthOf(4)
            expect(eType.locType).to.be.an('array').that.does.include('loc4');

            expect(eType).to.have.property('env')
            expect(eType.env).to.have.lengthOf(1)
            expect(eType.env).to.be.an('array').that.does.include('env1');
        })
    })
}