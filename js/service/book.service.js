'use strict';

const BOOK_KEY = 'bookDB'
const NO_IMG_URL = "img/noImg.jpg"
const gQueryOptions = {
  filterBy: { txt: '', rating: 0 },
  sortBy: {},
  page: { idx: 0, size: 0 }
}


var gBooks = loadFromStorage(BOOK_KEY) || _createBooks(5)
var gStats = {}
var gLayout = ''


function getGLayout() {
  return gLayout
}

function changeLayout(selector) {
  gLayout = selector

}



function getBooks(gQueryOptions) {
  var options = gQueryOptions || {}
  const filterByTxt = options.filterBy.txt
  const filterByRating = options.filterBy.rating
  if (!filterByTxt && filterByRating < 0) var books = gBooks
  else if (!filterByTxt && filterByRating > 0) {
    var books = gBooks.filter(book => book.rating >= gQueryOptions.filterBy.rating)
  }
  else {
    var books = gBooks.filter(
      book => book.title.toLowerCase().includes(filterByTxt.toLowerCase()))
    var BooksByRating = books.filter(book => book.rating >= filterByRating)
    return BooksByRating
  }

  return books
}


function setFilter(val) {
  gQueryOptions.filterBy.txt = val
}

function clearRating() {
  gQueryOptions.filterBy.rating = 0
  document.querySelector('.sort-field').value = ""
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


function getCurStats(booksArray) {
  console.log("🚀 ~ getCurStats ~ booksArray:", booksArray)
  const books = booksArray
  var BookPrice = 0
  const Stats = books.reduce((acc, book) => {
    BookPrice += +book.price
    acc.BooksCount++
    acc.avgPrice = +(BookPrice / +acc.BooksCount).toFixed(2)
    if (book.price > 200) acc.moreThen200++
    else if (book.price > 100 && book.price < 200) acc.Between++
    else if (book.price < 100) acc.lessThen100++
    return acc
  }, { BooksCount: 0, avgPrice: 0, moreThen200: 0, Between: 0, lessThen100: 0 })
  return Stats
}


function createBook(title, price, url) {
  const book = {
    id: getId(),
    title,
    price,
    imgUrl: url || NO_IMG_URL,
    description: makeLorem(),
    rating: getRandomInt(0, 5),
  }
  return book
}

function _createBooks(num) {
  var books = loadFromStorage('bookDB') // null
  if (!books || !books.length) {
    books = []
    for (let i = 0; i < num; i++) {
var randomPrice = (Math.random() * 400).toFixed(2)
      books.push(
        createBook(
          `harry Potter ${i + 1}`,
          +randomPrice,
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

