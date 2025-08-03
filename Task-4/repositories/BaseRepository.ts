interface GenericRepository<T> {
  getAll(): Promise<T[]>;
  getItemById(id: string): Promise<T | null>;
  addItem(item: T): Promise<T>;
  updateItem(id: string, item: Partial<T>): Promise<T>;
  DeleteItemById(id: string): Promise<boolean>;
  findItemsByFilter(partialData: Partial<T>): Promise<T[]>;
}

export class BaseRepository<T extends { id: string }>
  implements GenericRepository<T>
{
  private items: T[] = [];

  constructor(initialData: T[] = []) {
    this.items = [...initialData];
  }

  async getAll(): Promise<T[]> {
    return this.items;
  }

  async getItemById(id: string): Promise<T | null> {
    return this.items.find((item) => item.id === id) || null;
  }

  async addItem(item: T): Promise<T> {
    this.items.push(item);
    return item;
  }

  async updateItem(id: string, item: Partial<T>): Promise<T> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items[itemIndex] = { ...this.items[itemIndex], item };
    return this.items[itemIndex];
  }

  async DeleteItemById(id: string): Promise<boolean> {
    const itemIndex = this.items.findIndex((item) => item.id === id);

    this.items.splice(itemIndex, 1);
    return true;
  }

  async findItemsByFilter(partialData: Partial<T>): Promise<T[]> {
    return this.items.filter((item) =>
      Object.entries(partialData).every(
        ([key, value]) => item[key as keyof T] === value
      )
    );
  }
}
