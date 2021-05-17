import { MAX_FREETEXT_LENGTH, MAX_URI_LENGTH } from "../../common/config";
import { Default } from "../../common/default"
import { FreeText, InfoType, URI } from "../../common/types";
import { ContextError } from "../../error";

export class ExternalInfo extends Default {

    uri: URI
    infoType?: InfoType
    freeText?: FreeText

    constructor (uri: URI, infoType?: InfoType, freeText?: FreeText) {
        ContextError.checkLength(uri, MAX_URI_LENGTH)
        ContextError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        super()
        this.uri = uri
        this.infoType = infoType
        this.freeText = freeText
    }

    assign(source: Record<string, any>): this {
        let key
        const keys = Object.keys(source)

        if ((key = keys.find(f => f === 'uri')))
            this.uri = source[key]

        if ((key = keys.find(f => f === 'infoType')))
            this.infoType = source[key]

        if ((key = keys.find(f => f === 'freeText')))
            this.freeText = source[key]

        return this
    }   

    static default (): ExternalInfo {
        return new ExternalInfo('http://')
    }
}