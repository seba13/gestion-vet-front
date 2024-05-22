export interface ITable {
  heads?: Array<string>;
  rows?: Array<any>;
  selectedId?: string;
  handleUpdate?: () => void;
}
