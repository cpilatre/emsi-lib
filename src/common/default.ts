export abstract class Default {
    abstract assign(source: Record<string, any>): any

    static default(): any {
        throw new Error('Default method not implemented !')
    }
}