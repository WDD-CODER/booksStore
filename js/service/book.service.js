'use strict';

var gBooks = [];

function getBooks() {

  gBooks = [
    { id: '1', title: 'drawing Tree', price: '1$', imgUrl: 'img/drawingTree.jpg' },
    { id: '2', title: 'expiration Dates', price: '2$', imgUrl: 'img/expirationDates.jpg' },
    { id: '3', title: 'happy Place', price: '3$', imgUrl: 'img/happyPlace.jpg' },
    { id: '4', title: 'harry Potter', price: '4$', imgUrl: 'img/harryPotter.jpg' },
    { id: '5', title: 'lions Gaze', price: '5$', imgUrl: 'img/lionsGaze.jpg' }
  ]
  return gBooks
}


function RemoveBook(idx) {
  gBooks.splice(idx, 1)
}

function updatePrice(idx, newPrice) {
  gBooks[idx].price = newPrice + '$'
}

function addBookToGBooks(newReadyBook) {
  gBooks.unshift(newReadyBook)
  addBooksToLocalStorage()
}

function ShowDetails(imgUrl) {
  document.querySelector('.modal img').src = imgUrl

}
