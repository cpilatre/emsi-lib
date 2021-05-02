import { MAX_FREETEXT_LENGTH, MAX_URI_LENGTH } from "../../common/config";
import { FreeText, InfoType, URI } from "../../common/types";
import { ContextError } from "../../error";

export class ExternalInfo {
    uri: URI
    infoType?: InfoType
    freeText?: FreeText

    constructor (uri: URI, infoType?: InfoType, freeText?: FreeText) {
        ContextError.checkLength(uri, MAX_URI_LENGTH)
        ContextError.checkLength(freeText, MAX_FREETEXT_LENGTH)
        this.uri = uri
        this.infoType = infoType
        this.freeText = freeText
    }
}