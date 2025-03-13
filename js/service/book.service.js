'use strict';
const BOOK_KEY = 'bookDB'
const NO_IMG_URL = "img/noImg.jpg"
var gFilter = ''
var gBooks = loadFromStorage(BOOK_KEY) || _createBooks(5)
var gStats = {}
var gLayout = ''


function getGLayout() {
  return gLayout
}

function changeLayout(selector) {
  gLayout = selector

}

function getBooks() {
  if (!gFilter) return gBooks
  var books = gBooks.filter(
    book => book.title.toLowerCase().includes(gFilter.toLowerCase()))
  return books
}

function setFilter(val) {
  gFilter = val
}

function getFilterBy() {

}

function getNoImgUrl() {
  return NO_IMG_URL
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

function updateRating(bookId, val) {
  var bookIdx = gBooks.findIndex(book => book.id === bookId)
  gBooks[bookIdx].rating = val
  _saveBook()

}

function updatePrice(bookId, newPrice) {
  var book = gBooks.find(book => book.id === bookId)
  book.price = newPrice
  _saveBook()
}
function addBook(newReadyBook) {
  gBooks.unshift(newReadyBook)
  _saveBook()
}


function getCurStats() {

  var BookPrice = 0
  const Stats = gBooks.reduce((acc, book) => {
    BookPrice += +book.price
    acc.BooksCount++
    acc.avgPrice = +(BookPrice / +acc.BooksCount).toFixed(2)
    if (book.price > 20) acc.moreThen20++
    else if (book.price > 10 && book.price < 20) acc.Between++
    else if (book.price < 10) acc.lessThen10++
    return acc
  }, { BooksCount: 0, avgPrice: 0, moreThen20: 0, Between: 0, lessThen10: 0 })
  return Stats
}


function createBook(title, price, url) {
  const book = {
    id: getId(),
    title,
    price,
    imgUrl: url || NO_IMG_URL,
    description: makeLorem(),
    rating: Math.random.toFixed(1),
  }
  return book
}

function _createBooks(num) {
  var books = loadFromStorage('bookDB') // null
  if (!books || !books.length) {
    books = []
    for (let i = 0; i < num; i++) {
      console.log('num', num);

      books.push(
        createBook(
          `harry Potter ${i + 1}`,
          (Math.random() * 100).toFixed(2),
          `img/harryPotter${i + 1}.jpg`
        )
      )
    }
  }
  saveToStorage(BOOK_KEY, books)
  return books
}

function _saveBook() {
  saveToStorage(BOOK_KEY, gBooks)
}

