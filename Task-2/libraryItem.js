// Library Item class
class LibraryItem {
  #id;
  #title;
  static nextId;

  constructor(title) {
    this.#title = title;
    this.#id = LibraryItem.nextId++;
  }

  getTitle() {
    return this.#title;
  }

  getId() {
    return this.#id;
  }

  static isLibraryItem(obj) {
    return obj instanceof LibraryItem;
  }
}

// Book class
class Book extends LibraryItem {
  #author;
  #isRead;
  static count = 0;

  constructor(title, author, isRead) {
    super(title);
    this.#author = author;
    this.#isRead = isRead;
    Book.count++;
  }
  getAuthor() {
    return this.#author;
  }

  toggleReadStatus() {
    this.#isRead = !this.#isRead;
  }

  isBookRead() {
    return this.#isRead ? "Read" : "Unread";
  }

  describe() {
    console.log(
      `📖 ${this.getTitle()} by ${this.getAuthor()} ${
        this.isBookRead() ? "[Read]" : "[Unread]"
      }`
    );
  }

  static getBookCount() {
    return Book.count;
  }
}

// main
const book1 = new Book("JS Learning", "Ahmad", false);
const book2 = new Book("Python Learning", "Mohammad", true);

console.log(book1.getTitle());
console.log(book1.getAuthor());
console.log(book1.isBookRead());
book1.toggleReadStatus();
console.log(book1.isBookRead());

console.log(LibraryItem.isLibraryItem(book1));
console.log(LibraryItem.isLibraryItem(book2));

book1.describe();
book2.describe();

console.log(Book.getBookCount());
