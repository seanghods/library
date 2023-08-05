// Setup

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

// Book Creation

function addBook() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');
    const newBook = new Book(title.value, author.value, pages.value, read.value);
    myLibrary.push(newBook);
    showNewBook(newBook);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Showing Book

function showNewBook(newBook) {
    const newBookDiv = document.createElement("div");
    newBookDiv.classList.add('card');
    newBookDiv.setAttribute('id', `card-${counter}`);

    newBookDiv.appendChild(makeDiv('cardtitle', newBook.title, 'Title: '));
    newBookDiv.appendChild(makeDiv('cardauthor', newBook.author, 'Author: '));
    newBookDiv.appendChild(makeDiv('cardpages', newBook.pages, 'Number of Pages: '));
    newBookDiv.appendChild(makeDiv('cardread', newBook.read));

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add('carddelete');
    buttonDiv.setAttribute('id', `${counter}`);
    buttonDiv.appendChild(makeReadButton());
    buttonDiv.appendChild(makeDeleteButton());
    newBookDiv.appendChild(buttonDiv);

    cardArea.appendChild(newBookDiv);
    counter++;
}

function makeDiv(theClass, inner, innerLabel = '') {
    const newElement = document.createElement('div');
    newElement.innerHTML = innerLabel + inner;
    newElement.classList.add(theClass);
    return newElement;
}

function makeReadButton() {
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
    return readButton;
}

function makeDeleteButton() {
const deleteButton = document.createElement("button");
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', (event) => {
            const divRemove = document.querySelector(`#card-${event.target.parentNode.id}`);
            divRemove.remove();
            myLibrary.splice(event.target.id,1);
        });
        return deleteButton;
}