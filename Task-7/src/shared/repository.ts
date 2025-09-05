import { v4 as uuid } from "uuid";

export class GenericRepository<
  T extends { id: string; createdAt: Date; updatedAt: Date }
> {
  private items = new Map<string, T>();

  findAll(): T[] {
    return Array.from(this.items.values());
  }

  findById(id: string): T | undefined {
    return this.items.get(id) || undefined;
  }

  create(item: Omit<T, "id" | "createdAt" | "updatedAt">): T {
    const newItem: T = {
      ...item,
      id: uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    } as T;

    this.items.set(newItem.id, newItem);
    return newItem;
  }

  update(id: string, updatedData: Partial<T>): T | null {
    const isExist = this.items.get(id);
    if (!isExist) return null;

    const updated: T = {
      ...isExist,
      ...updatedData,
      updatedAt: new Date(),
    } as T;
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}
