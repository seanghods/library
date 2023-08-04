let myLibrary = [];
let counter = 0;
const newButton = document.querySelector('#new_book');
const modal = document.querySelector('.modal');
const cardArea = document.querySelector('.cardarea')

window.onload = () => {
    setup();
}

function setup() {
    newButton.addEventListener('click',showModal);
    document.addEventListener('keydown', (event) => {
        if (event.key == 'Control') modal.classList.remove('active');
    })
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
    showNewBook(newBook);
}

function showNewBook(newBook) {
    const newBookDiv = document.createElement("div");
        newBookDiv.classList.add('card');
        newBookDiv.setAttribute('id', `card-${counter}`);

        const titleDiv = document.createElement("div");
        titleDiv.innerHTML = `Title: ${newBook.title}`;
        titleDiv.classList.add('cardtitle');
        newBookDiv.appendChild(titleDiv);

        const authorDiv = document.createElement("div");
        authorDiv.innerHTML = `Author: ${newBook.author}`;
        authorDiv.classList.add('cardauthor');
        newBookDiv.appendChild(authorDiv);

        const pagesDiv = document.createElement("div");
        pagesDiv.innerHTML = `Number of Pages: ${newBook.pages}`;
        pagesDiv.classList.add('cardpages');
        newBookDiv.appendChild(pagesDiv);

        const readDiv = document.createElement("div");
        readDiv.innerHTML = newBook.read;
        readDiv.classList.add('cardread');
        newBookDiv.appendChild(readDiv);

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add('carddelete');
        buttonDiv.setAttribute('id', `${counter}`);
        const readButton = document.createElement("button");
        readButton.classList.add('button-read');
        readButton.addEventListener('click', (event) => {
            const divRead = document.querySelector(`#card-${event.target.parentNode.id}`);
            const reader = divRead.querySelector('.cardread')
            reader.innerHTML == 'Read' ? reader.innerHTML = 'Not read' : reader.innerHTML = 'Read';
            if (myLibrary[event.target.parentNode.id]['read'] == 'Read') {
                myLibrary[event.target.parentNode.id]['read'] = 'Not read';
            } else { 
                myLibrary[event.target.parentNode.id]['read'] = 'Read';
            }
        });
        buttonDiv.appendChild(readButton);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', (event) => {
            const divRemove = document.querySelector(`#card-${event.target.parentNode.id}`);
            divRemove.remove();
            myLibrary.splice(event.target.id,1);
        });
        buttonDiv.appendChild(deleteButton);
        newBookDiv.appendChild(buttonDiv);

        cardArea.appendChild(newBookDiv);
        counter++;
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}