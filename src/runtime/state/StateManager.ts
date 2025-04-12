import {
  isListEntry,
  type Integer,
  type List,
  type Value,
} from "../../lang/spec/Value";
import type { ChunkManager } from "./ChunkManager";
import type { ObjectRel } from "./ObjectRel";
import type { Quad } from "./Quad";
import type { QuadManager } from "./QuadManager";
import { StringInterner } from "./StringInterner";

export enum ValueType {
  Integer = 0,
  String = 1,
  Boolean = 2,
  List = 3,
  // ... future types
}

export type StateSelector = {
  path: (string | number)[];
};

export type StateUpdateEvent = {
  type: "update";
  objectId: number;
  key: number;
  value: number;
};
export const ValueObject = (stateManager: StateManager) => (quad: Quad) => {
  return {
    toObject: () => {
      const [objectId, key, value, type] = quad;
      switch (type) {
        case ValueType.Integer: {
          return value;
        }
        case ValueType.Boolean: {
          return value > 0;
        }
        case ValueType.String: {
          return stateManager.stringInterner.resolve(value);
        }
        case ValueType.List: {
          const quads = stateManager.quadManager.getChunks(objectId);
          return quads.reduce((acc, quad) => {
            // const [objectId, key, value, type] = quad;
            // const keyValue = stateManager.stringInterner.resolve(key);
            // if (!keyValue) return acc;
            const quadKey = stateManager.quadManager.chunkToKey(quad);
            const decomposed = stateManager.getValue(quadKey);
            if (!decomposed) return acc;
            acc.push(decomposed);
            return acc;
          }, [] as List);
        }
        default: {
          throw new Error(`Unsupported value type: ${type}`);
        }
      }
      // if (!decomposer) {
      //   throw new Error(`No decomposer found for type ${type}`);
      // }
      // return {
      //   objectId,
      //   key,
      //   value: decomposer(stateManager)(quad),
      //   type,
      // };
    },
  };
};

export type ValueDecomposer<QT extends ValueType, T extends Value> = (
  stateManager: StateManager
) => (quad: Quad<QT>) => T | undefined;

export type ValueComposer<T extends Value> = (
  stateManager: StateManager
) => (value: T) => [number, number];

export const integerDecomposer: ValueDecomposer<Integer, number> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    return value;
  };
export const integerComposer: ValueComposer<Integer> =
  (stateManager) => (value) => {
    return [value, ValueType.Integer];
  };

export const booleanDecomposer: ValueDecomposer<ValueType.Boolean, boolean> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    return value > 0;
  };
export const booleanComposer: ValueComposer<boolean> =
  (stateManager) => (value) => {
    return [value ? 1 : 0, ValueType.Boolean];
  };

export const stringDecomposer: ValueDecomposer<ValueType.String, string> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    return stateManager.stringInterner.resolve(value);
  };

export const stringComposer: ValueComposer<string> =
  (stateManager) => (value) => {
    const id = stateManager.stringInterner.intern(value);
    return [id, ValueType.String];
  };

export const listDecomposer: ValueDecomposer<ValueType.List, List> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    const quads = stateManager.quadManager.getChunks(objectId);
    return quads.reduce((acc, quad) => {
      // const [objectId, key, value, type] = quad;
      // const keyValue = stateManager.stringInterner.resolve(key);
      // if (!keyValue) return acc;
      // const decomposed = stateManager.getValue(quad);
      // if (!decomposed) return acc;
      // acc.push(decomposed);
      return acc;
    }, [] as List);
  };
export const listComposer: ValueComposer<List> = (stateManager) => (value) => {
  // const objectId = stateManager.memoryManager.createObject();
  value.forEach((item) => {
    if (isListEntry(item)) {
      const { key, value, op } = item;
      // const keyValue = stateManager.stringInterner.intern(key);
      // const [key, type] = stateManager.composers[type](stateManager)(item);
      // stateManager.memoryManager.addQuad(objectId, key, type, ValueType.List);
    }

    // const [value, type] = valueComposer(stateManager)(item);
    // const [key, type] = stateManager.composers[type](stateManager)(item);
    // stateManager.memoryManager.addQuad(objectId, );
  });
  return [0, ValueType.List]; // placeholder
};

export type ValueDecomposerRecord<
  QT extends ValueType,
  VT extends Value
> = Record<QT, ValueDecomposer<QT, VT>>;

export class StateManager {
  public quadManager: ChunkManager<Quad<ValueType>>;
  public stringInterner: StringInterner;
  public objectRelManager: ChunkManager<ObjectRel>;
  private decomposers: Record<ValueType, ValueDecomposer<any, any>> = {
    [ValueType.Integer]: integerDecomposer,
    [ValueType.String]: stringDecomposer,
    [ValueType.Boolean]: booleanDecomposer,
    [ValueType.List]: listDecomposer,
  };

  private composers: Record<ValueType, ValueComposer<any>> = {
    [ValueType.Integer]: integerComposer,
    [ValueType.String]: stringComposer,
    [ValueType.Boolean]: booleanComposer,
    [ValueType.List]: listComposer,
  };

  constructor({
    quadManager,
    stringInterner,
    objectRelManager,
  }: {
    quadManager: ChunkManager<Quad>;
    stringInterner: StringInterner;
    objectRelManager: ChunkManager<ObjectRel>;
  }) {
    this.quadManager = quadManager;
    this.stringInterner = stringInterner;
    this.objectRelManager = objectRelManager;
  }

  getValue<T extends Value = Value>(id: number): T | undefined {
    const quad = this.quadManager.getChunk(id);
    if (!quad) return undefined;
    const [objectId, key, value, type] = quad;
    const decomposer = this.decomposers[type];
    if (!decomposer) {
      throw new Error(`No decomposer found for type ${type}`);
    }
    return decomposer(this)(quad) as T | undefined;
  }

  valueComposer: ValueComposer<Value> = (stateManager) => (value) => {
    switch (typeof value) {
      case "number":
        return integerComposer(stateManager)(value);
      case "string":
        return stringComposer(stateManager)(value);
      case "boolean":
        return booleanComposer(stateManager)(value);
      case "object":
        if (Array.isArray(value)) {
          return listComposer(stateManager)(value);
        }
      // Fallthrough for unsupported object types
      default:
        throw new Error(`Unsupported value type: ${typeof value}`);
    }
  };
}
