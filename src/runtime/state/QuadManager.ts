import { type ValueType } from "./StateManager";
import { QUAD_STRIDE, type Quad } from "./Quad";

export class QuadManager {
  private memory: Uint32Array;
  private nextId = 1;
  private freeIds: number[] = [];
  private objectIndex = new Map<number, Set<number>>(); // objectId -> Set of quad start indices

  constructor(initialCapacity: number = 1024) {
    this.memory = new Uint32Array(initialCapacity * QUAD_STRIDE);
  }

  private ensureCapacity(requiredQuads: number) {
    const needed = (this.count() + requiredQuads) * QUAD_STRIDE;
    if (needed > this.memory.length) {
      const newSize = Math.max(needed, this.memory.length * 2);
      const newMemory = new Uint32Array(newSize);
      newMemory.set(this.memory);
      this.memory = newMemory;
    }
  }

  private count(): number {
    return this.memory.length / QUAD_STRIDE;
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
        offset + QUAD_STRIDE
      );
      quads.push([id, key, value, type]);
    }
    return quads;
  }

  private findNextFreeOffset(): number {
    const count = this.count();
    for (let i = 0; i < count * QUAD_STRIDE; i += QUAD_STRIDE) {
      if (this.memory[i] === 0) return i;
    }
    return count * QUAD_STRIDE; // append at end
  }
}
