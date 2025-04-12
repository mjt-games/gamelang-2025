import { expect, test } from "vitest";
import { ChunkManager } from "../runtime/state/ChunkManager";
import type { Quad } from "../runtime/state/Quad";

test("Chunk Manager", () => {
  const chunkManager = new ChunkManager<Quad>({
    initialCapacity: 1,
    stride: 4,
  });
  {
    const memory = chunkManager.getMemory();
    expect(memory.length).toBe(4);
  }
  const id = chunkManager.getNextKey();
  {
    expect(id).not.toBe(0);
  }
  {
    const memory = chunkManager.getMemory();
    expect(memory.length).toBe(4);
  }
  {
    const result = chunkManager.getChunk(id);
    expect(result).toBeUndefined();
  }
  const quad: Quad = [id, 2, 3, 0];
  chunkManager.addChunk(quad);
  {
    const memory = chunkManager.getMemory();
    expect(memory.length).toBe(8);
  }
  {
    const result = chunkManager.getChunk(id);
    expect(result).toStrictEqual(quad);
  }
  {
    const result = chunkManager.getChunks(id);
    expect(result).toStrictEqual([quad]);
  }
  {
    const memory = chunkManager.getMemory();
    expect(memory.length).toBe(8);
  }
  chunkManager.deleteChunkByKey(id);
  {
    const result = chunkManager.getChunk(id);
    expect(result).toBeUndefined();
    const memory = chunkManager.getMemory();
    expect(memory.length).toBe(8);
    expect(memory.reduce((acc, cur) => acc + cur, 0)).toBe(0);
  }
});
