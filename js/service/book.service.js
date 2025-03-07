'use strict';

var gBooks = getBooks()

function getBooks() {

  gBooks = [
    { id: '1', title: 'name1', price: '1$', imgUrl: 'img/drawingTree.jpg' },
    { id: '2', title: 'name2', price: '2$', imgUrl: 'img/expirationDates.jpg' },
    { id: '3', title: 'name3', price: '3$', imgUrl: 'img/happyPlace.jpg' },
    { id: '3', title: 'name3', price: '3$', imgUrl: 'img/harryPotter.jpg' },
    { id: '3', title: 'name3', price: '3$', imgUrl: 'img/lionsGaze.jpg' }
  ]
  return gBooks
}

function RemoveBook(idx) {
  gBooks.splice(idx, 1)
}

function updatePrice(idx, newPrice) {
  gBooks[idx].price = newPrice + '$'
}

function addBook(newReadyBook) {
  gBooks.unshift(newReadyBook)  
}

function ShowDetails(imgUrl){
  document.querySelector('.modal').style.backgroundImage = `url('${imgUrl}')`

}
