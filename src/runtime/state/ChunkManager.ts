import { Arity } from "./Arity";

export type ChunkToKey<T extends number[]> = (chunk: T) => number;

export class ChunkManager<T extends number[]> {
  private memory: Uint32Array;
  private nextKey: number;
  private freeKeys: number[] = [];
  private chunkIndexSetByKey:Map<number, Set<number>> = new Map<number, Set<number>>(); // Key -> Set of chunk start indices
  private readonly stride: number;
  private readonly expansionFactor: number;
  public chunkToKey: ChunkToKey<T>;
  private readonly emptyChunk: Uint32Array;
  private readonly emptyKey: number;

  constructor({
    initialCapacity = 1024,
    stride = 1,
    expansionFactor = 2,
    chunkToKey: chunkToKey = (chunk: T) => chunk[0],
    memory = new Uint32Array(initialCapacity * stride),
    emptyChunk = new Uint32Array(stride),
    emptyKey = chunkToKey([...emptyChunk] as T),
    initialId = emptyKey + 1,
  }: {
    initialCapacity?: number;
    stride: Arity<T>;
    expansionFactor?: number;
    chunkToKey?: ChunkToKey<T>;
    initialId?: number;
    memory?: Uint32Array;
    emptyChunk?: Uint32Array;
    emptyKey?: number;
  }) {
    if (stride < 1) {
      throw new Error("Stride must be at least 1");
    }
    if (expansionFactor <= 1) {
      throw new Error("Expansion factor must greater than 1.0");
    }
    if (memory.length % stride !== 0) {
      throw new Error(
        `Memory length ${memory.length} is not a multiple of stride ${stride}`
      );
    }
    if (emptyChunk.length !== stride) {
      throw new Error(
        `Empty chunk length ${emptyChunk.length} does not match stride ${stride}`
      );
    }
    if (initialId <= 0) {
      throw new Error(`Initial ID ${initialId} must be greater than 0`);
    }
    this.emptyKey = emptyKey;
    this.stride = stride;
    this.nextKey = initialId;
    this.expansionFactor = expansionFactor;
    this.chunkToKey = chunkToKey;
    this.emptyChunk = emptyChunk;
    this.memory = memory;
    this.recalculate();
  }

  private recalculateChunkIndexSetByKey(): void {
    this.chunkIndexSetByKey.clear();
    for (let i = 0; i < this.memory.length; i += this.stride) {
      const [...chunk] = this.memory.subarray(i, i + this.stride);
      const key = this.chunkToKey(chunk as T);
      if (!this.chunkIndexSetByKey.has(key)) {
        this.chunkIndexSetByKey.set(key, new Set());
      }
      this.chunkIndexSetByKey.get(key)!.add(i);
    }
  }
  private recalculateFreeKeys() {
    this.freeKeys = [];
    for (let i = 0; i < this.memory.length; i += this.stride) {
      const [...chunk] = this.memory.subarray(i, i + this.stride);
      const key = this.chunkToKey(chunk as T);
      if (key !== this.emptyKey) {
        this.freeKeys.push(key);
      }
    }
    this.freeKeys.sort((a, b) => a - b);
  }

  private recalculate() {
    this.recalculateChunkIndexSetByKey();
    this.recalculateFreeKeys();
  }

  private ensureCapacity(requiredQuads: number) {
    const needed = (this.count() + requiredQuads) * this.stride;
    if (needed > this.memory.length) {
      const newSize = Math.max(
        needed,
        this.memory.length * this.expansionFactor
      );
      const newMemory = new Uint32Array(newSize);
      newMemory.set(this.memory);
      this.memory = newMemory;
    }
  }

  private count(): number {
    return this.memory.length / this.stride;
  }

  getNextKey(): number {
    return this.freeKeys.length > 0 ? this.freeKeys.pop()! : this.nextKey++;
  }

  deleteChunkByKey(key: number) {
    const indices = this.chunkIndexSetByKey.get(key);
    if (indices) {
      for (const i of indices) {
        this.memory.set(this.emptyChunk, i);
      }
      this.chunkIndexSetByKey.delete(key);
    }
    this.freeKeys.push(key);
  }

  addChunk(chunk: T) {
    if (chunk.length !== this.stride) {
      throw new Error(
        `Chunk length ${chunk.length} does not match stride ${this.stride}`
      );
    }
    this.ensureCapacity(1);
    const offset = this.findNextFreeOffset();
    this.memory.set(chunk, offset);
    const id = this.chunkToKey(chunk);
    if (!this.chunkIndexSetByKey.has(id)) {
      this.chunkIndexSetByKey.set(id, new Set());
    }
    this.chunkIndexSetByKey.get(id)!.add(offset);
  }

  getChunks(key: number): T[] | [] {
    const indices = this.chunkIndexSetByKey.get(key);
    if (!indices) return [];
    const quads: T[] = [];
    for (const offset of indices) {
      const [...chunk] = this.memory.subarray(offset, offset + this.stride);
      quads.push(chunk as T);
    }
    return quads;
  }

  getChunk(key: number): T | undefined {
    const indices = this.chunkIndexSetByKey.get(key);
    if (!indices) return undefined;
    const offset = [...indices][0];
    const [...chunk] = this.memory.subarray(offset, offset + this.stride);
    return chunk as T;
  }

  private findNextFreeOffset(): number {
    const count = this.count();
    for (let i = 0; i < count * this.stride; i += this.stride) {
      if (this.memory[i] === 0) return i;
    }
    return count * this.stride; // append at end
  }

  getMemory(): Uint32Array {
    return this.memory;
  }
}
