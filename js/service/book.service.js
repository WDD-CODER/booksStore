'use strict';

const BOOK_KEY = 'bookDB'
const NO_IMG_URL = "img/noImg.jpg"

var gBooks = loadFromStorage(BOOK_KEY) || _createBooks(5)
var gStats = {}
var gLayout = ''
var gBookId = null

function getGLayout() {
  return gLayout
}

function changeLayout(selector) {
  gLayout = selector
}
// פה אפשר פשוט לעשות את זה על יידי להביא את הקווארי מהקונטרול ואז פשוט לעשות פילטר על בווקס עד שנגמרו כל האפשרויותץ
function getBooks(options) {
  var books = _FilterBy(options.filterBy)
  if (options.sortBy !== undefined) books = SortBy(books, options.sortBy.value)
  if (options.page.idx !== undefined) {
    const startIdx = options.page.idx * options.page.size
    books = books.slice(startIdx, startIdx + options.page.size)
  }
  return books
}

function getLastPage(options) {
  const length = _FilterBy(options.filterBy).length
  const numOfPages = Math.ceil(length / options.page.size)
  return numOfPages
}

// function nextPage() {
//   gQueryOptions.page.idx++
//   const numOfPages = gQueryOptions.page.size /
//     // if (gQueryOptions.page.idx <=  ) {
//     //   console.log('variable', variable);

//     // }
//     render()
// }
// function previousPage() {
//   gQueryOptions.page.idx--
//   render()
// }

function _FilterBy(filterBy) {
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



function SortBy(books, sortBy) {
  if (sortBy === 'Cheap') books.sort((book1, book2) => {
    return book1.price - book2.price
  })
  if (sortBy === 'Expensive') books.sort((book1, book2) => {
    return book2.price - book1.price
  })
  return books
}

function setFilter(val) {
  gQueryOptions.filterBy.txt = val
}

function clearRating() {
  gQueryOptions.filterBy.rating = 0
}

function clearSorting() {
  gQueryOptions.sortBy = {}
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

function updateRating(bookId, rating) {
  var bookIdx = gBooks.findIndex(book => book.id === bookId)
  gBooks[bookIdx].rating = rating
  _saveBook()
}


function updateBook(bookId, newTitle, newPrice, newUrl) {
  var book = gBooks.find(book => book.id === bookId)
  book.title = newTitle
  book.price = newPrice
  book.imgUrl = newUrl || NO_IMG_URL
  onRenderSuccessMsg('update')
  _saveBook()
  return book
}


function addBook(newReadyBook) {
  gBooks.unshift(newReadyBook)
  _saveBook()
  return newReadyBook
}


function getCurStats(booksArray) {
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

