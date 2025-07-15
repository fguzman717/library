const myLibrary = [];

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use the 'new' operator to call this constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    let readBool = this.read ? "already read" : "not read yet";
    console.log(
      `${this.title} by ${this.author}, ${this.pages} pages, ${readBool}`
    );
  };
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

const theHobbit = addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);

function displayBooks(array) {
  return array.map((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    document.body.appendChild(bookCard);

    let bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;
    bookCard.appendChild(bookTitle);

    let bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-details");
    bookAuthor.textContent = `by ${book.author}`;
    bookCard.appendChild(bookAuthor);

    let bookPages = document.createElement("div");
    bookPages.classList.add("book-details");
    bookPages.textContent = `This book has ${book.pages} pages`;
    bookCard.appendChild(bookPages);

    let bookRead = document.createElement("div");
    bookRead.classList.add("book-details");
    bookRead.textContent = book.read
      ? "You have read this book before"
      : "You have not read this book yet";
    bookCard.appendChild(bookRead);
  });
}

console.log(myLibrary);
displayBooks(myLibrary);
