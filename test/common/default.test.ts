import { expect } from 'chai'
import { Default } from '../../src/common/default'

describe('common :: default', () => {
    it('Throw an error if default static function is not implemented', () => {
        class newClass extends Default {
            constructor() { super() }
            assign(): any { return undefined }
        }
        expect(newClass.default).to.throw() 
    })
})