'use strict';

const BOOK_KEY = 'bookDB'

var gBooks = loadFromStorage(BOOK_KEY) || _createBooks(10)
var gStats = {}
var gBookId = null




// CREATE 

function getBooks(options) {
  var books = _FilterBy(options.filterBy)
  books = SortByStr(books, options.sortBy.sortField)
  const startIdx = options.page.idx * options.page.size
  books = books.slice(startIdx, startIdx + options.page.size)
  // }
  return books
}
function getLastPageIdx(options) {
  const length = _FilterBy(options.filterBy).length
  const numOfPages = Math.ceil(length / options.page.size) - 1
  return numOfPages
}
function getBookById(bookId) {
  var book = gBooks.find(book => { return book.id === bookId })
  return book
}

function getCurStats(books) {
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

function getGBookId() {
return gBookId
}

function setGBookId(bookId) {
  gBookId = bookId
return gBookId
}



// FILTER & SORTING
function _FilterBy(filterBy) { //
  const filterByTxt = filterBy.txt
  const filterByRating = filterBy.rating

  var books = gBooks.slice()
  if (filterByTxt) {
    const regex = new RegExp(filterByTxt, 'i')
    books = books.filter(book => regex.test(book.title))
  }
  if (filterByRating > 0) books = books.filter(book => book.rating >= filterByRating)


  return books
}
// function setFilter(val) {
//   gQueryOptions.filterBy.txt = val
// }

function SortByStr(books, sortField) {

  const lowerValue = sortField.toLowerCase();

  if (lowerValue.includes('cheap')) {
    books.sort((a, b) => b.price - a.price);
  } else if (lowerValue.includes('expensive')) {
    books.sort((a, b) => a.price - b.price);
  } else if (lowerValue.includes('title-up')) {
    books.sort((a, b) => a.title.localeCompare(b.title)); // A → Z
  } else if (lowerValue.includes('title-down')) {
    books.sort((a, b) => b.title.localeCompare(a.title)); // Z → A
  } else if (lowerValue.includes('rating-up')) {
    books.sort((a, b) => b.rating - a.rating);
  } else if (lowerValue.includes('rating-down')) {
    books.sort((a, b) => a.rating - b.rating);
  }
  return books;
}

function clearRating() {
  gQueryOptions.filterBy.rating = 0
}

function clearSorting() {
  gQueryOptions.sortBy.sortField = ''
  // gQueryOptions.sortBy.sortDir = 0
}

//UPDATE 
function updateBook(bookId, newTitle, newPrice, newUrl) {
  var book = gBooks.find(book => book.id === bookId)
  book.title = newTitle
  book.price = newPrice
  book.imgUrl = newUrl || NO_IMG_URL
  onRenderSuccessMsg('update')
  _saveBook()
  return book
}
function updateRating(bookId, rating) {
  var bookIdx = gBooks.findIndex(book => book.id === bookId)
  gBooks[bookIdx].rating = rating
  _saveBook()
}



// ADD & REMOVE
function removeBook(bookId) {
  var bookToRemove = gBooks.find(book => book.id === bookId)
  gBooks.splice(bookToRemove, 1)
  _saveBook()

}
function addBook(newReadyBook) {
  gBooks.unshift(newReadyBook)
  _saveBook()
  return newReadyBook
}
function createBook(title, price, url) {
  const book = {
    id: getId(),
    title,
    price,
    imgUrl: url || "img/default.jpg",
    description: makeLorem(),
    rating: getRandomInt(1, 5),
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

