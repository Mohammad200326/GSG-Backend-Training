# 🧠 TypeScript Generic Repository System (CRUD)

## 🎯 Objective

Design and implement a **type-safe, generic repository pattern** using TypeScript to manage in-memory static data. This project simulates backend logic and demonstrates the use of **generics**, **interfaces**, and **inheritance**.

---

## 📦 Project Structure

### 🧱 Models

We define 3 models:

1. **User**
2. **Course**
3. **Booking**

Each model includes an `id` field and other relevant fields.

---

### 📐 Generic Repository Interface

A generic interface `IRepository<T>` includes the following **async methods**:

- `getAll(): Promise<T[]>`
- `getItemById(id: string): Promise<T | null>`
- `addItem(item: T): Promise<T>`
- `updateItem(id: string, item: Partial<T>): Promise<T>`
- `DeleteItemById(id: string): Promise<boolean>`
- `findItemsByFilter(filter: Partial<T>): Promise<T[]>`

---

### 🏗 BaseRepository Class

A generic class `BaseRepository<T>` that:

- Stores data in memory (as an array of `T`)
- Implements all interface methods in a reusable and type-safe manner
- Requires that type `T` includes an `id: string`

---

### 🧩 Model-Specific Repositories

Each of the following classes extends `BaseRepository<T>` and passes static data during initialization:

- `UserRepository`
- `CourseRepository`
- `BookingRepository`

Each repository starts with **2–3 seeded records**.

---

## 🧪 Testing Script

The `test.ts` file:

- Creates instances of all repositories
- Invokes and logs all CRUD and filter methods
- Ensures results are type-safe and use `Promise` (async-compatible)

---
