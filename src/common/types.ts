export enum EmsiStatus { EMPTY, READY, PARTIAL, ERROR }

export type Datime = string
export type FreeText = string
export type URI = string
export type Name = string // use in context, event, mission and position classes

// Context types
export type ContextId = string
export enum Mode { ACTUAL = 'ACTUAL', EXERCISE = 'EXERCS', SYSTEM = 'SYSTEM', TEST = 'TEST' }
export enum MsgType { ACK = 'ACK', ALERT = 'ALERT', CANCEL = 'CANCEL', ERROR = 'ERROR', UPDATE = 'UPDATE' }
export type LinkId = ContextId
export enum LinkRole { ADD_TO = 'ADDSTO', SUPERSEDE = 'SPRSDS' }
export enum Level { STRATEGIC = 'STRTGC', OPERATIONAL = 'OPR', TACTICAL = 'TACTCL' }
export enum SeClass { CONFIDENTIAL = 'CONFID', RESTRICTED ='RESTRC', SECRET = 'SECRET', TOP_SECRET = 'TOPSRT', UNCLASSIFIED ='UNCLAS', UNMARKED = 'UNMARK' }
export enum Urgency { URGENT = 'URGENT', NOT_URGENT = 'NOT_URGENT' }
export type OrgId = string
export type UserId = string
export enum InfoType { USER_MANUAL = 'MANUAL', MAP = 'MAP', OTHER = 'OTHER', PHOTO = 'PHOTO', WEB_SITE = 'WEBSIT' }

// Event types
export type EventId = string
export type Category = string
export type Actor = string
export type LocType = string
export type Env = string
export enum Source { COMPUTER_FORECAST = 'COMFOR', HUMAN_DEDUCTION = 'HUMDED', HUMAN_OBSERVATION = 'HUMOBS', SENSOR_OBSERVATION = 'SENSOR' }
export enum Scale { LEVEL_1 = '1', LEVEL_2  = '2', LEVEL_3 = '3', LEVEL_4 = '4', LEVEL_5  = '5' }
export type Certainly = number
export enum Status { EVENT_COMPLETE = 'COM', EVENT_IN_PROGRESS = 'IPR', EVENT_NOT_STARTED = 'NST', EVENT_UNDER_CONTROL = 'STOP', EVENT_ABORTED = 'ABO', EVENT_CANCELLED = 'CANCLD' }
export enum RiskAssessmnt { INCREASING = 'INCREA', DECREASING = 'DECREA', STABLE = 'STABLE' }
export enum Cause { ACCIDENTAL = 'ACC', DELIBERATE = 'DEL', NATURAL = 'NAT' }
export type EGeoType = string
export type Weather = string
export type EGeoId = string
export enum EGeoStatus { PLANNED = 'PLANNED', INPLACE = 'IN PLACE', GONE = 'GONE' }

// Casualties types
export type Count = number
export enum CasualtiesContext { REQUIRING_ACTION = 'REQ_ACTION', ALREADY_TREATED = 'ALR_TREATED', PREDICTED_URGENT = 'PRED_URGENT', 
    PREDICTED_MEDIUM = 'PRED_MEDIUM', INITIAL_STATEMENT = 'INITIAL_STAT', PRELIMINARY_ASSESSMENT = 'PRELIM_STAT' }
export enum CasualtiesStatus { CITIZEN = 'CITIZEN', EMERGENCY_TEAM = 'ET', AUTHORITIES = 'AUTHO', VERY_IMPORTANT_PERSON = 'VIP',
    MIXED = 'MIXED', UNKNOWN = 'UNK' }
export enum Triage { GREY = '-1', BLUE = '0', GREEN = '1', YELLOW = '2', ORANGE = '3', RED = '4', BLACK = '5' }
export enum Contamination { SUPPOSED_CONTAMINED = 'SUP_CONT', DECONTAMINATION_IN_PROGRESS = 'DECON_PROG', DECONTAMINATION_COMPLETED = 'DECON_END',
    WITHOUT_CONTAMINATION = 'NO_CONT', CONTAMINATION_NOT_ASSESSED = 'NO_EVAL' }
export enum Location { CONFINED = 'CONFINED', EVACUATED = 'EVACUATED', DISPLACED = 'DISPLACED', TRAPPED = 'TRAPPED' }
export enum Health { INJURED = 'INJUR', DEAD = 'DEAD', MISSING = 'MISS', INVOLVED = 'INVOL', IMPACTED = 'IMPCT' }

// Position types
export type LocId = string
export enum PositionType { POINT = 'POINT', CIRCLE = 'CIRCLE', LINE = 'LINE', SURFACE = 'SURFACE', GRID = 'GRID', POLYGON = 'POLYGON', ELLIPSE = 'ELLIPSE' }
export enum HeightRole { MIN = 'MIN', MAX = 'MAX', AVG = 'AVG' }
export type CoordSys = string
export type Latitude = number
export type Longitude = number
export type Height = number
export type Address = string

// Mission types
export type MissionType = string
export type MissionId = string
export type MainMissionId = string
export enum MissionStatus { ABORTED = 'ABO', CANCELLED = 'CANCLD', COMPLETE = 'COM', IN_PROGRESS = 'IPR', NOT_STARTED = 'NST', IN_PAUSE = 'PAU' }
export enum MissionPriority { LOW_PRIORITY = '0', P1 = '1', P2 = '2', P3 = '3', P4 = '4', HIGHEST_PRIORITY = '5' }

// Resource types
export type ResourceId = string
export type Class = string
export type Capability = string
export type Characteristics = string
export type RGeoType = string
export type RGeoId = string
export type Quantity = number 
export type UnitOfMeasure = string
export enum ResourceStatus { AVAILABLE = 'AVAILB', UNAVAILABLE = 'UNAV', IN_MAINTENANCE ='MAINTC', RESERVED = 'RESRVD', VIRTUAL = 'VIRTUAL',
    IN_USE = 'IN_USE', IN_USE_MOBILE = 'IN_USE/MOBILE', IN_USE_ON_SCENE = 'IN_USE/ON_SCENE' }
export type Nationality = string
export enum ContactType { POSTAL_ADDRESS = 'PSTADD', EMAIL = 'EMLADD', IP_ADDRESS = 'IPADD', FTP = 'FTPADD', WEB = 'WEBADD', PHONE_NUMBER = 'PHNADD',
    FAX = 'FAXADD', RADIO_NUMBER = 'PMRADD' }
export type Detail = string
