export type MaposLogType =
  | "system"
  | "success"
  | "blank"
  | "header"
  | "data"
  | "route"
  | "exec"
  | "verification"
  | "pending";

export interface MaposLogEntry {
  type: MaposLogType;
  text?: string;
}
