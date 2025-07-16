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

function displayBooks(library) {
  return library.map((book) => {
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

    let removeBook = document.createElement("button");
    removeBook.classList.add("remove-book-button");
    removeBook.textContent = "Remove Book";
    bookCard.appendChild(removeBook);

    let currentBook = book.id;

    removeBook.addEventListener("click", function () {
      const index = library.findIndex((book) => book.id === currentBook);

      if (index > -1) {
        library.splice(index, 1);
      }

      bookCard.remove();
    });
  });
}

const newBookButton = document.createElement("button");
newBookButton.textContent = "New Book";
document.body.appendChild(newBookButton);

newBookButton.addEventListener("click", function () {
  //Spacing
  document.body.appendChild(document.createElement("br"));
  document.body.appendChild(document.createElement("br"));

  // Form Container
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");
  document.body.appendChild(formContainer);

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
  const submitForm = document.createElement("button");
  submitForm.textContent = "Submit";
  formContainer.appendChild(submitForm);
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

// const theHobbit = addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
