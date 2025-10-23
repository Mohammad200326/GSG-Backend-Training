export class GenericRepository<T extends { id: string }> {
  private items: T[] = [];

  constructor(initialData: T[] = []) {
    this.items = initialData;
  }

  findAll(): T[] {
    return this.items;
  }

  findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  create(payload: T): T {
    const newItem = payload;
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, payload: Partial<T>): T | null {
    const index = this.items.findIndex((item) => item.id === id);

    if (index === -1) return null;

    const updatedItem = {
      ...this.items[index],
      ...payload,
    } as T;
    this.items[index] = updatedItem;
    return updatedItem;
  }

  delete(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) return false;

    this.items.splice(index, 1);
    return true;
  }
}
