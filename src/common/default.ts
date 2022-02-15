import "reflect-metadata"

const CUSTOM_METADATA = Symbol('CustomMetadata')

export enum TypeOfArray { STRING_ARRAY, OBJECT_ARRAY }

export const IdentifyArrayProperty = (type: TypeOfArray): any => Reflect.metadata(CUSTOM_METADATA, type)
export const getArrayProperty = (obj: any, key: string): TypeOfArray => Reflect.getMetadata(CUSTOM_METADATA, obj, key)

const defaultMethods = new Map<string, () => any>()

export const IndexDefaultMethod = () => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor): void => {
        defaultMethods.set(target.name.toLowerCase(), target[memberName])
    }
}

export class Default {
    assign(source: Record<string, any>): any {
        let key
        const keys = Object.keys(source)
        
        for (key of keys) {
            let innerItem: any
            const typeOfArray = getArrayProperty(this, key)

            if (typeOfArray === TypeOfArray.STRING_ARRAY) {
                const tab = source[key] instanceof Array ? source[key] : [ source[key] ]
                const tmp: any = []
                tab.forEach((add: any) => {
                    tmp.push(add)
                })
                innerItem = tmp
            } else
            if (typeOfArray === TypeOfArray.OBJECT_ARRAY) {
                const currentDefaultMethod = defaultMethods.get(key.toLowerCase())
                if (currentDefaultMethod) { 
                    const tab = source[key] instanceof Array ? source[key] : [ source[key] ]
                    const tmp: any = []
                    tab.forEach((add: any) => {
                        tmp.push(currentDefaultMethod().assign(add))
                    })
                    innerItem = tmp
                }
            } else
            if (source[key] instanceof Object) {
                const currentDefaultMethod = defaultMethods.get(key.toLowerCase())
                if (currentDefaultMethod)
                    innerItem = currentDefaultMethod().assign(source[key])
            } else
                innerItem = isNumber(source[key]) ? Number(source[key]) : source[key]

            if (innerItem)
                Object.defineProperty(this, key, { value: innerItem, enumerable: true, writable: true })
        }        
        return this
    }

    static default(): any {
        throw new Error('Default method not implemented !')
    }
}

const isNumber = (n: string | number): boolean => !isNaN(parseFloat(String(n))) && isFinite(Number(n))