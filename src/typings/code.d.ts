declare namespace Code {
  interface Attr {
    type: string;
    key: string;
    label: string;
  }
  interface Func {
    id: string;
    name: string;
    inputs: Array<Attr>;
    outputs: Array<Attr>;
  }
}
