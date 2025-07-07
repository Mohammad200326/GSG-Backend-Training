function book(title, author, isRead) {
  return {
    title,
    author,
    isRead,
    toggleReadStatus() {
      this.isRead = !this.isRead;
    },
    describe() {
      console.log(
        `📖 ${this.title} by ${this.author} ${
          this.isRead ? "[Read]" : "[Unread]"
        }`
      );
    },
  };
}
const book1 = book("Software Development 1", "Mohammad", true);
const book2 = book("Software Development 2", "Ahmad", false);

book1.describe();
book2.describe();

book1.toggleReadStatus();
book1.describe();
