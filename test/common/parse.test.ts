import { expect } from 'chai'
import { js2xml, xml2js } from '../../src/common/parse'

describe('common :: parse', () => {
    const js = { context: {
        id: '749d7a03-20f6-490a-8983-d93545c8df91',
        mode: 'ACTUAL',
        msgType: 'ALERT',
        creation: '2021-05-19T14:18:37.697Z'
    }}

    describe('js2xml', () => {
        it('Must transform an object to a xml string', () => {
            const xml = js2xml(js, { format: false })
            expect(xml).eq('<context><id>749d7a03-20f6-490a-8983-d93545c8df91</id><mode>ACTUAL</mode><msgType>ALERT</msgType><creation>2021-05-19T14:18:37.697Z</creation></context>')
        })

        it('Must transform an object to a uppercase xml string', () => {
            const xml = js2xml(js, { format: false, toUpperCase: true })
            expect(xml).eq('<CONTEXT><ID>749d7a03-20f6-490a-8983-d93545c8df91</ID><MODE>ACTUAL</MODE><MSGTYPE>ALERT</MSGTYPE><CREATION>2021-05-19T14:18:37.697Z</CREATION></CONTEXT>')
        })

        it('Must transform an object to a namespaced xml string', () => {
            const xml = js2xml(js, { format: false, setNameSpace: 'ns' })
            expect(xml).eq('<ns:context><ns:id>749d7a03-20f6-490a-8983-d93545c8df91</ns:id><ns:mode>ACTUAL</ns:mode><ns:msgType>ALERT</ns:msgType><ns:creation>2021-05-19T14:18:37.697Z</ns:creation></ns:context>')
        })
    })

    describe('xml2js', () => {
        it('Must transform a xml string to an object', () => {
            const xml = '<context><id>749d7a03-20f6-490a-8983-d93545c8df91</id><mode>ACTUAL</mode><msgType>ALERT</msgType><creation>2021-05-19T14:18:37.697Z</creation></context>'
            const obj = xml2js(xml, { format: false })
            expect(obj).to.eql(js)
        })

        it('Must transform a namespaced xml string to an object', () => {
            const xml = '<ns:context><ns:id>749d7a03-20f6-490a-8983-d93545c8df91</ns:id><ns:mode>ACTUAL</ns:mode><ns:msgType>ALERT</ns:msgType><ns:creation>2021-05-19T14:18:37.697Z</ns:creation></ns:context>'
            const obj = xml2js(xml, { format: false })
            expect(obj).to.eql(js)
        })    
    })    
})