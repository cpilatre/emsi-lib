import { expect } from 'chai'
import { MAX_FREETEXT_LENGTH, MAX_ID_LENGTH, MAX_NAME_LENGTH, MAX_RESOURCE_ID_LENGTH, NULL_UUID } from '../../../src/common/config'
import { Contact, Position, Resource, RGeo, RType } from '../../../src/emsi'
import test_contact from './contact.test'
import test_rType from './resource-type.test'
import test_rGeo from './resource-geo.test'
import { ContactType, ResourceStatus } from '../../../src/common/types'

describe('emsi :: resource', () => {
    const src = {
        rType: [{
            class: ['HUM', 'ORG'],
            capability: ['AER35M'],
            characteristics: ['HGT']
        }],
        id: NULL_UUID,
        orgId: NULL_UUID,
        name: 'Name',
        freeText: 'Comments',
        rGeo: [{
            datime: new Date(2021, 5, 1).toISOString(),
            type: 'CUR',
            freeText: 'Comments',
            position: { locId: NULL_UUID },
            id: NULL_UUID
        }],
        quantity: 10,
        um: 'kg',
        status: 'AVAILB',
        nationality: 'FR',
        contact: [{
            contact: 'IPADD',
            detail: '0.0.0.0'
        }]
    }
    
    describe('Components', () => {
        test_contact()
        test_rType()
        test_rGeo()
    })

    describe('Resource', () => {
        it('Chek constructor', () => {
            const rTypeEmpty = () => new Resource([])
            expect(rTypeEmpty).to.throw()

            const rType = RType.default()
            const idLength = () => new Resource([rType], `x${'x'.repeat(MAX_RESOURCE_ID_LENGTH)}`)
            expect(idLength).to.throw()
        })

        it('Check set methods', () => {
            const rType = RType.default()
            const resource = new Resource([rType])

            const orgIdLength = () => resource.setOrgId(`x${'x'.repeat(MAX_ID_LENGTH)}`)
            expect(orgIdLength).to.throw()

            const nameLength = () => resource.setName(`x${'x'.repeat(MAX_NAME_LENGTH)}`)
            expect(nameLength).to.throw()

            const freeTextLength = () => resource.setFreeText(`x${'x'.repeat(MAX_FREETEXT_LENGTH)}`)
            expect(freeTextLength).to.throw()
        })

        it('Compare build object and assigned object', () => {
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

            const dest = Resource.default().assign(src)
            expect(resource).eql(dest)
        })
    })
})