import he from 'he'
import { j2xParser, parse, validate } from 'fast-xml-parser'

export type ParseOptions = Record<string, unknown>

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
    parseNodeValue : true,
    parseAttributeValue : false,
    trimValues: true,
    parseTrueNumberOnly: false,
    arrayMode: false, 
    tagValueProcessor : (text: string) => he.decode(text)
}

export function js2xml (node: unknown, options?: ParseOptions): string {
    const p2xml = new j2xParser({ ...options2xml, ...options })
    let xml = p2xml.parse(node)

    if (options?.toUpperCase)
        xml = xml.replace(/<\/?[\w]+\/?>/g, (c: string) => c.toUpperCase())

    if (options?.setNameSpace)
        xml = xml.replace(/(<\/?)/g, (c: string, p1: string) => p1 + options?.setNameSpace + ':')

    return xml
}

export function xml2js (xml: string, options?: ParseOptions): Record<string, unknown> | undefined {
    if (validate(xml) === true) { 

        // Remove NameSpace
        const toJs = xml.replace(/(<\/?)[\w]*:/g, (c: string, p1: string) => p1 )

        // Prepare element for JS
        // toJs = toJs.replace(/<\/?[\w]+\/?>/g, (c: string) => c.toLowerCase() )
        // toJs = camelize(toJs)

        return parse(toJs, { ...options2js, ...options })
    }
    return undefined
}

// *** TO REMOVE if CamelCase option is validated ***

// function camelize(str: string): string {
//     for (const [lowerCase, camelCase] of camelized) {
//         const regex = new RegExp(`(<\\/?)(${lowerCase})(\\/?>)`, 'g')
//         str = str.replace(regex, (c: string, p1: string, p2: string, p3: string) => p1 + camelCase + p3)
//     }
//     return str
// }

// const camelized = [
//     ['msgtype', 'msgType'],
//     ['seclass', 'seClass'],
//     ['freetext', 'freeText'],
//     ['external_info', 'external_Info'],
//     ['infotype', 'infoType'],
//     ['linkid', 'linkId'],
//     ['linkrole', 'linkRole'],
//     ['org_id', 'org_Id'],
//     ['userid', 'userId'],
//     ['loctypes', 'locTypes'],
//     ['main_event_id', 'main_Event_Id'],
//     ['etype', 'eType'],
//     ['decl_datime', 'decl_Datime'],
//     ['occ_datime', 'occ_Datime'],
//     ['obs_datime', 'obs_Datime'],
//     ['risk_assessmnt', 'risk_Assessmnt'],
//     ['egeo', 'eGeo'],
//     ['other_event_id', 'other_Event_Id'],
//     ['loc_id', 'loc_Id'],
//     ['coordsys', 'coordSys'],
//     ['heightrole', 'heightRole'],
//     ['main_mission_id', 'main_Mission_Id']
// ]
