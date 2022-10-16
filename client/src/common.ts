export type DataValue =
  | null
  | number
  | string
  | boolean
  | DataObject

export type DataAdapt = [string, DataValue];
export type DataObject = Partial<{ [key: string]: DataValue }>;

export interface Change {
  target: string;
  value?: any;
}

export interface Engine {
  root: DataObject;
  version: number;

  createChange(target: string, value: any): void;
}
