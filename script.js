let myLibrary = [];
const newButton = document.querySelector('#new_book');
const modal = document.querySelector('.modal');
const cardArea = document.querySelector('.cardarea')

window.onload = () => {
    setup();
}

function setup() {
    newButton.addEventListener('click',showModal);
}

function showModal() {
    modal.classList.toggle('active');
}

function addBook() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');
    read.value == 'on' ? read.value = 'Read' : read.value = 'Not read'
    const newBook = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(newBook);
    showBooks();
}

function deleteBook() {
    
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${pages} pages, read it? ${read}`
    }
}

function showBooks() {
    cardArea.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const newBookDiv = document.createElement("div");
        newBookDiv.classList.add('card');
        const titleDiv = document.createElement("div");
        titleDiv.innerHTML = `Title: ${myLibrary[i].title}`;
        titleDiv.classList.add('cardtitle');
        newBookDiv.appendChild(titleDiv);
        const authorDiv = document.createElement("div");
        authorDiv.innerHTML = `Author: ${myLibrary[i].author}`;
        authorDiv.classList.add('cardauthor');
        newBookDiv.appendChild(authorDiv);
        const pagesDiv = document.createElement("div");
        pagesDiv.innerHTML = `Number of Pages: ${myLibrary[i].pages}`;
        pagesDiv.classList.add('cardauthor');
        newBookDiv.appendChild(pagesDiv);
        const readDiv = document.createElement("div");
        readDiv.innerHTML = myLibrary[i].read;
        readDiv.classList.add('cardread');
        newBookDiv.appendChild(readDiv);
        const deleteDiv = document.createElement("div");
        deleteDiv.classList.add('carddelete');
        const deleteButton = document.createElement("button");
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', deleteBook);
        const trashPic = document.createElement('img');
        trashPic.src = './images/trash.png';
        deleteButton.appendChild(trashPic);
        deleteDiv.appendChild(deleteButton);
        newBookDiv.appendChild(deleteDiv);
        cardArea.appendChild(newBookDiv);
    }
}