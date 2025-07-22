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
  this.changeStatus = function () {
    this.read = !this.read;
  };
}

let libraryContainer = document.createElement("div");
libraryContainer.classList.add("library-container");
document.body.appendChild(libraryContainer);

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function displayBooks(library) {
  return library.map((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    libraryContainer.appendChild(bookCard);

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

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    bookCard.appendChild(buttonContainer);

    let removeBook = document.createElement("button");
    removeBook.classList.add("book-card-button");
    removeBook.textContent = "Remove Book";
    buttonContainer.appendChild(removeBook);

    let currentBook = book.id;

    removeBook.addEventListener("click", function () {
      const index = library.findIndex((book) => book.id === currentBook);

      if (index > -1) {
        library.splice(index, 1);
      }

      bookCard.remove();
    });

    let readStatus = document.createElement("button");
    readStatus.classList.add("book-card-button");
    readStatus.textContent = book.read ? "Mark as Unread" : "Mark as Read";
    buttonContainer.appendChild(readStatus);

    readStatus.addEventListener("click", function () {
      book.changeStatus();

      readStatus.textContent = book.read ? "Mark as Unread" : "Mark as Read";

      bookRead.textContent = book.read
        ? "You have read this book before"
        : "You have not read this book yet";
    });
  });
}

let newBookButtonContainer = document.createElement("div");
newBookButtonContainer.classList.add("new-book-button-container");
document.body.prepend(newBookButtonContainer);

const newBookButton = document.createElement("button");
newBookButton.classList.add("new-book-button");
newBookButton.textContent = "New Book";
newBookButtonContainer.appendChild(newBookButton);

newBookButton.addEventListener("click", function () {
  //Spacing
  newBookButtonContainer.appendChild(document.createElement("br"));
  newBookButtonContainer.appendChild(document.createElement("br"));

  // Form Container
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");
  newBookButtonContainer.appendChild(formContainer);

  // Book Title Field
  const newTitleLabel = document.createElement("label");
  newTitleLabel.textContent = "Book Title";
  newTitleLabel.setAttribute("for", "book-title");
  formContainer.appendChild(newTitleLabel);
  formContainer.appendChild(document.createElement("br"));

  const newBookTitle = document.createElement("input");
  newBookTitle.type = "text";
  newBookTitle.id = "book-title";
  formContainer.appendChild(newBookTitle);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(document.createElement("br"));

  // Book Author Field
  const newAuthorLabel = document.createElement("label");
  newAuthorLabel.textContent = "Book Author";
  newAuthorLabel.setAttribute("for", "book-author");
  formContainer.appendChild(newAuthorLabel);
  formContainer.appendChild(document.createElement("br"));

  const newBookAuthor = document.createElement("input");
  newBookAuthor.type = "text";
  newBookAuthor.id = "book-author";
  formContainer.appendChild(newBookAuthor);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(document.createElement("br"));

  // Book Page Count Field
  const newPageCountLabel = document.createElement("label");
  newPageCountLabel.textContent = "Page Count";
  newPageCountLabel.setAttribute("for", "page-count");
  formContainer.appendChild(newPageCountLabel);
  formContainer.appendChild(document.createElement("br"));

  const newBookPages = document.createElement("input");
  newBookPages.type = "number";
  newBookPages.id = "page-count";
  formContainer.appendChild(newBookPages);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(document.createElement("br"));

  // Read Status Field
  const readQuestion = document.createElement("p");
  readQuestion.classList.add("read-question");
  readQuestion.textContent = "Have you read this book before?";
  formContainer.appendChild(readQuestion);
  formContainer.appendChild(document.createElement("br"));

  const readInput = document.createElement("input");
  readInput.type = "radio";
  readInput.name = "read-status";
  readInput.value = true;
  readInput.id = "read";
  formContainer.appendChild(readInput);

  const readLabel = document.createElement("label");
  readLabel.textContent = " Yes";
  readLabel.setAttribute("for", "read");
  formContainer.appendChild(readLabel);
  formContainer.appendChild(document.createElement("br"));

  const notReadInput = document.createElement("input");
  notReadInput.type = "radio";
  notReadInput.name = "read-status";
  notReadInput.value = false;
  notReadInput.id = "not-read";
  formContainer.appendChild(notReadInput);

  const notReadLabel = document.createElement("label");
  notReadLabel.textContent = " No";
  notReadLabel.setAttribute("for", "not-read");
  formContainer.appendChild(notReadLabel);
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(document.createElement("br"));
  formContainer.appendChild(document.createElement("br"));

  //Submit Button
  let submitContainer = document.createElement("div");
  submitContainer.classList.add("submit-container");
  formContainer.appendChild(submitContainer);

  const submitForm = document.createElement("button");
  submitForm.classList.add("submit-button");
  submitForm.textContent = "Submit";
  submitContainer.appendChild(submitForm);
  submitForm.addEventListener("click", function () {
    event.preventDefault();

    let newTitle = newBookTitle.value;
    let newAuthor = newBookAuthor.value;
    let newPages = newBookPages.value;
    let newStatus = JSON.parse(
      document.querySelector('input[name="read-status"]:checked')?.value ||
        false
    );

    addBookToLibrary(newTitle, newAuthor, newPages, newStatus);
    displayBooks(myLibrary);
  });
});

// Dummy Data
const theHobbit = addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 320, true);
const harryPotter = addBookToLibrary(
  "Harry Potter and the Philosopher's Stone",
  "J.K. Rowling",
  309,
  false
);
const sunriseOnTheReaping = addBookToLibrary(
  "Sunrise on the Reaping",
  "Suzanne Collins",
  400,
  true
);
const twilight = addBookToLibrary("Twilight", "Stephenie Meyer", 498, false);
const theHungerGames = addBookToLibrary(
  "The Hunger Games",
  "Suzanne Collins",
  384,
  false
);

displayBooks(myLibrary);
