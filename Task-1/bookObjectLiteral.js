const book1 = {
  title: "Software Development 1",
  author: "Mohammad",
  isRead: true,
  toggleReadStatus() {
    this.isRead = !this.isRead;
  },
  describe() {
    console.log(
      `📖 ${this.title} by ${this.author} ${this.isRead ? "Read" : "Unread"}`
    );
  },
};

const book2 = {
  title: "Software Development 2",
  author: "Ahmad",
  isRead: false,
  toggleReadStatus() {
    this.isRead = !this.isRead;
  },
  describe() {
    console.log(
      `📖 ${this.title} by ${this.author} ${this.isRead ? "Read" : "Unread"}`
    );
  },
};

book1.describe();
book2.describe();
book1.toggleReadStatus();
book1.describe();
