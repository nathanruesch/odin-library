const myLibrary = [];
const container = document.getElementById("container");
const newBookSubmit = document.getElementById("book-form-submit");

const newBookButton = document.getElementById("new-book-button");

const bookTitleInput = document.getElementById("book-title-input");
const bookAuthorInput = document.getElementById("book-author-input");
const bookPagesInput = document.getElementById("book-pages-input");
const bookReadInput = document.getElementById("book-read-input");

const formDialog = document.getElementById("form-dialog");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        readStatus = read ? "has been read" : "not read yet";
        return `${title} by ${author}, ${pages} pages, ${readStatus}`;
    }

    this.toggleReadStatus = function() {
        this.read = !this.read;
    }
}

function addBookToLibraryInput(event) {
    event.preventDefault();

    let _title = bookTitleInput.value;
    let _author = bookAuthorInput.value;
    let _pages = bookPagesInput.value;
    let _read = bookReadInput.checked;

    let pagesFixed = parseInt(_pages);

    let b = new Book(_title, _author, pagesFixed, _read);

    console.log(b);

    addBookToLibrary(b);

    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookPagesInput.value = "";
    bookReadInput.checked = false;

    formDialog.close();
}

function addBookToLibrary(book) {
    myLibrary[myLibrary.length] = book;

    console.log("Added book " + book + " to library.");

    addLibraryToPage();
}

function addLibraryToPage() {
    container.innerHTML = null;

    for (let i = 0; i < myLibrary.length; i++) {
        let b = myLibrary[i];

        console.log(b);

        let parentDiv = document.createElement("div");
        parentDiv.className = "library-book";
        parentDiv.id = "library-book-" + i;

        let bookTitle = document.createElement("h3");
        bookTitle.className = "library-book-title";
        bookTitle.textContent = b.title;
        bookTitle.id = "library-book-title-" + i;

        let bookAuthor = document.createElement("p");
        bookAuthor.className = "library-book-author";
        bookAuthor.textContent = b.author;
        bookAuthor.id = "library-book-author-" + i;

        let bookPages = document.createElement("p");
        bookPages.className = "library-book-pages";
        bookPages.textContent = b.pages;
        bookPages.id = "library-book-pages-" + i;

        let bookRead = document.createElement("p");
        bookRead.className = "library-book-read";
        bookRead.textContent = b.read ? "Has been read" : "Has not been read";
        bookRead.id = "library-book-read-" + i;

        let removeBookButton = document.createElement("button");
        removeBookButton.innerText = "X";
        removeBookButton.className = "library-book-remove-button";
        removeBookButton.id = "library-book-remove-button-" + i;
        removeBookButton.addEventListener("click", removeBookFromLibrary, false);
        removeBookButton.dataset.indexNumber = i;

        let changeReadButton = document.createElement("button");
        changeReadButton.innerText = "Read!";
        changeReadButton.className = "library-book-change-read";
        changeReadButton.id = "library-book-change-read-" + i;
        changeReadButton.addEventListener("click", changeReadStatus, false);
        changeReadButton.dataset.indexNumber = i;

        parentDiv.appendChild(bookTitle);
        parentDiv.appendChild(bookAuthor);
        parentDiv.appendChild(bookPages);
        parentDiv.appendChild(bookRead);
        parentDiv.appendChild(removeBookButton);
        parentDiv.appendChild(changeReadButton);

        container.appendChild(parentDiv);
    }
}

function openDialog(event) {
    formDialog.showModal();
}

function closeDialog(event) {
    formDialog.close();
}

function removeBookFromLibrary(event) {
    let bookIndex = event.target.dataset.indexNumber;

    console.log("Removing book from library at index " + bookIndex);

    if (myLibrary[bookIndex] !== undefined && myLibrary[bookIndex] !== null) {
        myLibrary.splice(bookIndex, 1);
        addLibraryToPage();
    }
}

function changeReadStatus(event) {
    let bookIndex = event.target.dataset.indexNumber;

    console.log("Changing read status of book at index " + bookIndex);

    let b = myLibrary[bookIndex];

    if (b !== undefined && b !== null) {
        console.log("Found book to change read status of");
        myLibrary[bookIndex].toggleReadStatus();
        addLibraryToPage();
    }
}

function generateTestData() {
    addBookToLibrary(new Book("test1", "James", 123, false));
    addBookToLibrary(new Book("test2", "Henry", 321, true));
    addBookToLibrary(new Book("test3", "Male", 231, false));
    addBookToLibrary(new Book("test4", "female", 312, true));

    addLibraryToPage();
}

closeDialog();
//generateTestData();

newBookSubmit.addEventListener("click", addBookToLibraryInput, false);
newBookButton.addEventListener("click", openDialog, false);