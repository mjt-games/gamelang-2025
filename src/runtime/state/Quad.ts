import type { ValueType } from "./StateManager";

export type Quad<T extends ValueType = ValueType> = [
  objectId: number,
  key: number,
  value: number,
  type: T
];
export const QUAD_STRIDE = 4;
