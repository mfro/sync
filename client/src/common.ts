export interface Change {
  target: string;
  value?: any;
}

export interface ClientUpdate {
  version: number,
  changes: Change[],
}

export interface ServerHandshake extends ServerUpdate {
  id?: string;
}

export interface ServerUpdate {
  version: number;
  changes: Change[];
}
