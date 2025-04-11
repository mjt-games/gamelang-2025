import {
  isListEntry,
  type Integer,
  type List,
  type Value,
} from "../../lang/spec/Value";
import { StringInterner } from "./StringInterner";

enum ValueType {
  Integer = 0,
  String = 1,
  Boolean = 2,
  List = 3,
  // ... future types
}

type Quad = [objectId: number, key: number, value: number, type: ValueType];
const QUAD_SIZE = 4;

export type ValueDecomposer<T extends Value = Value> = (
  stateManager: StateManager
) => (quad: Quad) => T | undefined;

export type ValueComposer<T extends Value> = (
  stateManager: StateManager
) => (value: T) => [number, number];

export const integerDecomposer: ValueDecomposer<Integer> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    return value;
  };
export const integerComposer: ValueComposer<Integer> =
  (stateManager) => (value) => {
    return [value, ValueType.Integer];
  };

export const booleanDecomposer: ValueDecomposer<boolean> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    return value > 0;
  };
export const booleanComposer: ValueComposer<boolean> =
  (stateManager) => (value) => {
    return [value ? 1 : 0, ValueType.Boolean];
  };

export const stringDecomposer: ValueDecomposer<string> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    return stateManager.stringInterner.resolve(value);
  };

export const stringComposer: ValueComposer<string> =
  (stateManager) => (value) => {
    const id = stateManager.stringInterner.intern(value);
    return [id, ValueType.String];
  };

export const listDecomposer: ValueDecomposer<List> =
  (stateManager) => (quad) => {
    const [objectId, key, value] = quad;
    const quads = stateManager.memoryManager.getQuads(objectId);
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
  const objectId = stateManager.memoryManager.createObject();
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

export class StateManager {
  public memoryManager: MemoryManager;
  public stringInterner: StringInterner;
  private decomposers: Record<ValueType, ValueDecomposer> = {
    [ValueType.Integer]: integerDecomposer,
    [ValueType.String]: stringDecomposer,
    [ValueType.Boolean]: booleanDecomposer,
    [ValueType.List]: integerDecomposer,
  };

  private composers: Record<ValueType, ValueComposer<any>> = {
    [ValueType.Integer]: integerComposer,
    [ValueType.String]: stringComposer,
    [ValueType.Boolean]: booleanComposer,
    [ValueType.List]: listComposer,
  };

  constructor({
    memoryManager,
    stringInterner,
  }: {
    memoryManager: MemoryManager;
    stringInterner: StringInterner;
  }) {
    this.memoryManager = memoryManager;
    this.stringInterner = stringInterner;
  }

  getValue<T extends Value = Value>(id: number): T | undefined {
    const quads = this.memoryManager.getQuads(id);
    if (quads.length === 0) return undefined;
    const quad = quads[0];
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

export class MemoryManager {
  private memory: Uint32Array;
  private nextId = 1;
  private freeIds: number[] = [];
  private objectIndex = new Map<number, Set<number>>(); // objectId -> Set of quad start indices

  constructor(initialCapacity: number = 1024) {
    this.memory = new Uint32Array(initialCapacity * QUAD_SIZE);
  }

  private ensureCapacity(requiredQuads: number) {
    const needed = (this.count() + requiredQuads) * QUAD_SIZE;
    if (needed > this.memory.length) {
      const newSize = Math.max(needed, this.memory.length * 2);
      const newMemory = new Uint32Array(newSize);
      newMemory.set(this.memory);
      this.memory = newMemory;
    }
  }

  private count(): number {
    return this.memory.length / QUAD_SIZE;
  }

  createObject(): number {
    return this.freeIds.length > 0 ? this.freeIds.pop()! : this.nextId++;
  }

  deleteObject(objectId: number) {
    const indices = this.objectIndex.get(objectId);
    if (indices) {
      for (const i of indices) {
        this.memory[i] = 0; // optional: clear memory
        this.memory[i + 1] = 0;
        this.memory[i + 2] = 0;
        this.memory[i + 3] = 0;
      }
      this.objectIndex.delete(objectId);
    }
    this.freeIds.push(objectId);
  }

  addQuad(objectId: number, key: number, value: number, type: ValueType) {
    this.ensureCapacity(1);
    const offset = this.findNextFreeOffset();
    this.memory.set([objectId, key, value, type], offset);
    if (!this.objectIndex.has(objectId))
      this.objectIndex.set(objectId, new Set());
    this.objectIndex.get(objectId)!.add(offset);
  }

  getQuads(objectId: number): Quad[] {
    const indices = this.objectIndex.get(objectId);
    if (!indices) return [];
    const quads: Quad[] = [];
    for (const offset of indices) {
      const [id, key, value, type] = this.memory.subarray(
        offset,
        offset + QUAD_SIZE
      );
      quads.push([id, key, value, type]);
    }
    return quads;
  }

  private findNextFreeOffset(): number {
    const count = this.count();
    for (let i = 0; i < count * QUAD_SIZE; i += QUAD_SIZE) {
      if (this.memory[i] === 0) return i;
    }
    return count * QUAD_SIZE; // append at end
  }
}
