# 📚 Task: Library System with Classes

You're building a class-based system for a library.  
You need two types of items:

- `LibraryItem` – the base class.
- `Book` – a subclass that extends `LibraryItem`.

---

## ✅ Features Implemented

### 🔹 LibraryItem (Base Class)

- Stores a **private ID** and **title**.
- Uses a static `nextId` to auto-increment item IDs.
- Includes a static method `isLibraryItem(obj)` to check if an object is an instance of `LibraryItem`.

### 🔹 Book (Subclass)

- Inherits from `LibraryItem`.
- Adds private fields:
  - `#author` – book's author.
  - `#isRead` – read status (boolean).
- Increments a static counter `Book.count` for each created book.
- Methods:
  - `getAuthor()` – returns the author's name.
  - `toggleReadStatus()` – switches the value of `isRead`.
  - `isBookRead()` – returns `"Read"` or `"Unread"`.
  - `describe()` – logs a readable summary with emojis.
  - `Book.getBookCount()` – static method to get total number of created books.
