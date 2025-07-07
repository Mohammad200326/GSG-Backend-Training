function Book(title, author, isRead) {
  (this.title = title),
    (this.author = author),
    (this.isRead = isRead),
    (this.toggleReadStatus = function () {
      this.isRead = !this.isRead;
    });
  this.describe = function () {
    console.log(
      `📖 ${this.title} by ${this.author} ${
        this.isRead ? "[Read]" : "[Unread]"
      }`
    );
  };
}

const book1 = new Book("Software Development 1", "Mohammad", true);
const book2 = new Book("Software Development 2", "Ahmad", false);

book1.describe();
book2.describe();

book1.toggleReadStatus();
book1.describe();
