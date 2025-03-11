'use strict';

const BOOK_KEY = 'bookDB'
var gBooks = _createBooks()
var gStats = getCurStats()
  function getBooks() {
    return gBooks
  }


function getBookById(bookId) {
  var book = gBooks.find(book => { return book.id === bookId })
  return book
}

function removeBook(bookId) {
  var bookToRemove = gBooks.find(book => book.id === bookId)
  gBooks.splice(bookToRemove, 1)
  _saveBook()
}

function updatePrice(bookId, newPrice) {
  var book = gBooks.find(book => {
    return book.id === bookId
  })
  book.price = newPrice + '$'
  _saveBook()
}

function addBookToGBooks(newReadyBook) {
  gBooks.unshift(newReadyBook)
  _saveBook()
}


function getCurStats() {

  var AverageBookPrice = gBooks.reduce((acc, book, idx, array) => {
    var clearPriceNum = +book.price.split('$')[0]
    acc += clearPriceNum
    return acc
  }, 0)
  var booksAbove200 = gBooks.reduce((acc, book, idx, array) => {
    var clearPriceNum = +book.price.split('$')[0]
    if (clearPriceNum > 200) acc++
    return acc
  }, 0)
  var booksBetween = gBooks.reduce((acc, book, idx, array) => {
    var clearPriceNum = +book.price.split('$')[0]
    if (clearPriceNum > 100 && clearPriceNum < 200) acc++
    return acc
  }, 0)
  var booksBelow100 = gBooks.reduce((acc, book, idx, array) => {
    var clearPriceNum = +book.price.split('$')[0]
    if (clearPriceNum < 100) acc++
    return acc
  }, 0)

  return  {
                   BooksCount: gBooks.length,
                   avgPrice: AverageBookPrice,
                   moreThen200: booksAbove200,
                   Between: booksBetween,
                   lessThen100: booksBelow100,
                 }
}

function _createBooks() {
  var books = loadFromStorage('bookDB') // null

  if (!books || !books.length) {

    books = [
      { id: '1', title: 'drawing Tree', price: '99$', imgUrl: 'img/drawingTree.jpg' },
      { id: '2', title: 'expiration Dates', price: '201$', imgUrl: 'img/expirationDates.jpg' },
      { id: '3', title: 'happy Place', price: '150$', imgUrl: 'img/happyPlace.jpg' },
      { id: '4', title: 'harry Potter', price: '110$', imgUrl: 'img/harryPotter.jpg' },
      { id: '5', title: 'lions Gaze', price: '180$', imgUrl: 'img/lionsGaze.jpg' }
    ]
  }
  saveToStorage(BOOK_KEY, books)
  return books

}

function _saveBook() {
  saveToStorage(BOOK_KEY, gBooks)

}