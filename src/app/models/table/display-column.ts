import { columnType } from "./column-type";

export interface DisplayColumn {
  field: string;
  label: string;
  type: columnType;
  styleClass?: string;
  width?: number;
}
