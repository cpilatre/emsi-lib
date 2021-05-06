# EMSI-lib
A ...

## Usage

### Generate XML EMSI (JS -> XML)
```javascript
import { Emsi, Event, Mission, Context, ExternalInfo, Origin, ... } from 'emsi-lib'

const extInfo = new ExternalInfo("https://secourir.eu/..../", InfoType.PHOTO, "Photos de la situation")

const origin = new Origin("43d38170-ce5d-4d8e-81d7-2bd4071d83f4", "58113", "SC/SDIS24")

const context = new Context(Mode.ACTUAL, MsgType.ALERT)
    .setFreeText("Shark Attack")
    .setLevel(Level.STRATEGIC)
    .setSecurityClassification(SeClass.RESTRICTED)
    .setUrgency(Urgency.URGENT)
    .addExternalInfo([ extInfo ])
    .setOrigin(origin)

const mission = new Mission('Lifeguard')
    .setStatus(MissionStatus.IN_PROGRESS, 30)
    .setPriority(MissionPriority.P3)
    .setStartTime(new Date())
    .setFreeText('Sharknado !!!')

const event = new Event()
    .setScale(Scale.LEVEL_1)

const emsi = new Emsi()
    .setContext(context)
    .setEvent(event)
    .addMissions([mission, mission])

const emsiXml = emsi.generateXml()
```

### Populate EMSI object from XML (XML -> JS)
```javascript
const target = new Emsi()
target.loadFromXml(result)

console.log(emsi.context?.externalInfo)
console.log(emsi.mission?.[0].startTime)
emsi.mission?.[0].setStartTime(new Date())
console.log(emsi.mission?.[0].startTime)
```