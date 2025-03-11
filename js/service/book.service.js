'use strict';
const BOOK_KEY = 'bookDB'

var gFilter = ''
var gBooks = _createBooks()
var gStats = {}


function getBooks() {
  var books = gBooks.filter(
    book => book.title.toLowerCase().includes(gFilter.toLowerCase()))
    console.log("🚀 ~ getBooks ~ books.length:", books.length)
  if (books.length === 0) renderNoticeNoFilter()
  else return books
  // }
}

function setFilter(val) {
  gFilter = val
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
    // var clearPriceNum = +book.price.split('$')[0]
    acc += GetClearPrice(book)
    return acc / gBooks.length
  }, 0)
  var booksAbove200 = gBooks.reduce((acc, book, idx, array) => {
    // var clearPriceNum = +book.price.split('$')[0]
    if (GetClearPrice(book) > 200) acc++
    return acc
  }, 0)
  var booksBetween = gBooks.reduce((acc, book, idx, array) => {
    // var clearPriceNum = +book.price.split('$')[0]
    if (GetClearPrice(book) > 100 && GetClearPrice(book) < 200) acc++
    return acc
  }, 0)
  var booksBelow100 = gBooks.reduce((acc, book, idx, array) => {
    // var clearPriceNum = +book.price.split('$')[0]
    if (GetClearPrice(book) < 100) acc++
    return acc
  }, 0)

  var numOfBooks = `Total Book Count : ${gBooks.length}`
  var AveragePricePerBook = `Average Book Price : ${get2DecimalNum(AverageBookPrice)}`
  var Above200 = `Books above 200$ : ${booksAbove200}`
  var Between = `Books Between 100$ and 200$ : ${booksBetween}`
  var Below100 = `Books Below 100$ : ${booksBelow100}`


  return gStats = {
    BooksCount: numOfBooks,
    avgPrice: AveragePricePerBook,
    moreThen200: Above200,
    Between: Between,
    lessThen100: Below100,
  }

}

// function getGFiltered(readyToUseInput){
//   gFiltered = gBooks.filter(book => book.title.toLowerCase().includes(`${readyToUseInput}`))

// }

// function getUserInput(usrInput) {    
//   var readyToUseInput = usrInput.toLowerCase()
//   getGFiltered(readyToUseInput)
// }

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