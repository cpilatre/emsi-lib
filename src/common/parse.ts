import he from 'he'
import { j2xParser, parse, validate } from 'fast-xml-parser'

export type ParseOptions = Record<string, unknown>
export type Js2XmlFn = (node: unknown, options?: ParseOptions) => string
export type Xml2JsFn = (xml: string, options?: ParseOptions) => Record<string, unknown> | undefined

const options2xml = {
    ignoreAttributes : true,
    format: true,
    indentBy: '  ',
    supressEmptyNode: true,
    tagValueProcessor: (value: string) => he.encode(value, { useNamedReferences: true })
}

const options2js = {
    ignoreAttributes : true,
    ignoreNameSpace : true,
    allowBooleanAttributes : false,
    parseNodeValue : false,
    parseAttributeValue : false, // Change this value to true do error whith he encoding
    trimValues: true,
    parseTrueNumberOnly: false,
    arrayMode: false, 
    tagValueProcessor : (text: string) => he.decode(text)
}

export function js2xml (node: unknown, options?: ParseOptions, fn?: Js2XmlFn): string {
    return (fn || defaultJs2Xml)(node, options)
}

function defaultJs2Xml  (node: unknown, options?: ParseOptions): string {
    const p2xml = new j2xParser({ ...options2xml, ...options })
    let xml = p2xml.parse(node)

    if (options?.toUpperCase)
        xml = xml.replace(/<\/?[\w]+\/?>/g, (c: string) => c.toUpperCase())

    if (options?.setNameSpace)
        xml = xml.replace(/(<\/?)/g, (c: string, p1: string) => p1 + options?.setNameSpace + ':')

    return xml
}

export function xml2js (xml: string, options?: ParseOptions, fn?: Xml2JsFn): Record<string, any> | undefined {
    return (fn || defaultXml2js)(xml, options)
}

function defaultXml2js (xml: string, options?: ParseOptions): Record<string, unknown> | undefined {
    if (validate(xml) === true) { 

        // Remove NameSpace
        const toJs = xml.replace(/(<\/?)[\w]*:/g, (c: string, p1: string) => p1 )

        return parse(toJs, { ...options2js, ...options })
    }
    return undefined
}
