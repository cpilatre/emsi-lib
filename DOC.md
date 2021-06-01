## Usage

### Generate XML EMSI (JS -> XML)
```javascript
import { Emsi, Event, Mission, Context, ExternalInfo, Origin, /* ... */} from 'emsi-lib'

const extInfo = new ExternalInfo("https://secourir.eu/.../", InfoType.PHOTO, "Photos of the accident")

const origin = new Origin("43d38170-ce5d-4d8e-81d7-2bd4071d83f4", "58113", "SC/SDIS24")

const context = new Context(Mode.ACTUAL, MsgType.ALERT)
    .setFreeText("First message")
    .setLevel(Level.TACTICAL)
    .setSecurityClassification(SeClass.RESTRICTED)
    .setUrgency(Urgency.URGENT)
    .addExternalInfos([ extInfo ])
    .setOrigin(origin)

const mission = new Mission('Casualty search')
    .setStatus(MissionStatus.IN_PROGRESS, 30)
    .setPriority(MissionPriority.P3)
    .setStartTime(new Date())
    .setFreeText('Many victims')

const etype = new EType(['/TRP/COL'], ['/VEH/TRK', '/VEH/TRN'], ['/RAIL/TRK', 'ROAD'])

const event = new Event('FR-SC-24-0001', 'Railway accident')
    .setScale(Scale.LEVEL_1)
    .setEventType(etype)

const emsi = new Emsi()
    .setContext(context)
    .setEvent(event)
    .addMissions([mission])

const emsiXml = emsi.generateXml()
```

### Populate EMSI object from XML (XML -> JS)
```javascript
const target = new Emsi()
target.loadFromXml(emsiXml)

if (target.context?.urgency !== Urgency.URGENT) {

    if (target.context?.link?.[1].linkRole !== LinkRole.SUPERSEDE)
        target.context?.addLink([new Link('43d38170-ce5d-4d8e-81d7-2bd4071d83f4', LinkRole.SUPERSEDE)])

    emsi.mission?.[0].setEndTime(new Date())
    
    const newMessage = target.generateXml()
    /* Send newMessage */
}
```