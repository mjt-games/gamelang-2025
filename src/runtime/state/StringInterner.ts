export class StringInterner {
  private stringToId = new Map<string, number>();
  private idToString: string[] = [];

  intern(str: string): number {
    let id = this.stringToId.get(str);
    if (id !== undefined) return id;

    id = this.idToString.length;
    if (id > 0xffffffff) throw new Error("Too many interned strings for u32");
    this.stringToId.set(str, id);
    this.idToString[id] = str;
    return id;
  }

  resolve(id: number): string | undefined {
    return this.idToString[id];
  }

  has(str: string): boolean {
    return this.stringToId.has(str);
  }

  get size(): number {
    return this.idToString.length;
  }

  clear() {
    this.stringToId.clear();
    this.idToString = [];
  }

  export(): Record<string, number> {
    return Object.fromEntries(this.stringToId.entries());
  }

  import(data: Record<string, number>) {
    this.clear();
    for (const [key, value] of Object.entries(data)) {
      this.stringToId.set(key, value);
      this.idToString[value] = key;
    }
  }
}
