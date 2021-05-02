export class ErrorModel extends Error {
    static checkLength (field: string | undefined, max_length: number): boolean {
        if (field && field.length > max_length)
            throw new this(`"${field.substring(0, 10)}..." is too long (${max_length} characters maximum)`)
        return true
    }    
}