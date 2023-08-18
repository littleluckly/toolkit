import { EventEmiter } from "./libs/event-emiter/EventEmiter"

declare namespace toolkit {
  export const EventEmiter: EventEmiter
}

declare module 'dip-utils' {
  export = toolkit
}
