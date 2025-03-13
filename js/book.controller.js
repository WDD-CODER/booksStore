'use strict';

function onInit() {
    render()
}
function render() {
    const books = getBooks()
    if (!books.length) {
        renderNoticeNoFilter()
        renderStats()
        return
    }

    if (getGLayout() === 'card-layout') {
        renderBookCards()
        renderStats()
    }
    else
        renderBookTable()
    renderStats()
}

function renderBookTable() {
    hideElement('.card-container')

    const elTbody = document.querySelector('tbody')
    var strHTMls = gBooks.map(book => {
        return `<tr>
                              <td>${book.title}</td>
                              <td>$${book.price}</td>
                              <td>${repeatRatingStars(book.rating)}</td>
                              <td>
                              <button onclick="onUpdateBook('${book.id}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onReadBook('${book.id}')" class="book-details">read</button>   
                              </td></tr>`
    })
    elTbody.innerHTML = strHTMls.join("")
    renderStats()
}


function renderBookCards() {
    const elCardContainer = document.querySelector('.card-container')
    const elTbody = document.querySelector('tbody')
    elTbody.innerHTML = ''
    showElement('.card-container')

    var strHTMls = gBooks.map(book => {
        return `<div class="book-card">
                              <p>${book.title}</p>
                              <p>$${book.price}</p>
                              <p>${repeatRatingStars(book.rating)}</p>
                              <img src="${book.imgUrl}" alt="bookImg">
                              <section>
                              <button onclick="onUpdateBook('${book.id}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onReadBook('${book.id}')" class="book-details">read</button>   
                              </section></div>`
    })
    elCardContainer.innerHTML = strHTMls.join("")
    renderStats()

}


function onSetLayout(el) {
    const selector = el.classList[0]
    changeLayout(selector)
    render()
}

function renderNoticeNoFilter() {
    hideElement('.card-container')
    const elTbody = document.querySelector('tbody')
    elTbody.innerHTML = ''
    var msg = 'No matching books were found'
    elTbody.innerHTML = `<tr><td colspan="3">${msg}</td></tr>`
    return

}

function onRemoveBook(bookId) {
    if (confirm('Are you sure you want to remove the book?'))
        removeBook(bookId)
    render()
    _onSuccess('remove')
}

function onUpdateBook(bookId) {
    var newBookPrice = +prompt('what\'s the new book\'s price?')

    if (!newBookPrice || isNaN(newBookPrice)) {
        alert('book must have a price bigger then 0! please set it or hit cancel to exit')
        return
    }

    updatePrice(bookId, newBookPrice)
    render()
    _onSuccess('update')
}

function onAddBook() {



    //Make sure book has a legit title
    var newBookTitle = prompt('what\'s the book\'s title?')
    while (newBookTitle === null || newBookTitle.trim() === '') {
        newBookTitle = prompt('book must have a title! please  set it or hit cancel to exit')
        if (newBookTitle === null) return
    }
    //Make sure book has a legit price 

    var newBookPrice = prompt('what\'s the book\'s price?')
    while (newBookPrice.trim() === '') {
        newBookPrice = prompt('book must have a price! please set it or hit cancel to exit')
        if (newBookPrice === null) return
    }
    //Make sure price is a legit number
    if (isNaN(newBookPrice)) {
        while (isNaN(newBookPrice) || newBookPrice.trim() === '') {
            newBookPrice = prompt('price must me a number only! please set it or hit cancel to exit')
            if (newBookPrice === null) return
        }
    }


    var newBookImgUrl = prompt('what\'s the image\'s url?')
    if (!newBookImgUrl || newBookImgUrl.trim() === '') newBookImgUrl = 'img/noImg.jpg'

    const newReadyBook = createBook(newBookTitle, newBookPrice, newBookImgUrl)

    addBook(newReadyBook)
    render()
    _onSuccess('add')
}

function onOpenBookModal() {
    const modal = document.querySelector('.add-book.modal')
    modal.showModal()
}
function onCloseBookModal() {
    const modal = document.querySelector('.add-book.modal')
    modal.close()
}

function onAddBookByModal(event) {
    const title = document.querySelector('[name="book-title"]')
    const price = document.querySelector('[name="book-price"]')
    const imgUrl = document.querySelector('[name="book-img"]')

    if (!price.value || !title.value) {
        alert('Make sure all needed info. price and title are inserted')
    }
    const newBook = createBook(title.value, price.value, imgUrl.value || getNoImgUrl())
    addBook(newBook)
    render()
    renderStats()

}


function onReadBook(bookId) {
    const book = getBookById(bookId)
    
    localStorage.setItem('curBookId', bookId)
    const modal = document.querySelector('.modal')
    document.querySelector('.book-title').innerText = book.title
    document.querySelector('.price').innerText = `price: $ ${book.price}`
    document.querySelector('.book-pre').innerText = `book description: ${book.description}`
    document.querySelector('.show-rating').innerText = book.rating
    document.querySelector('.book-img').src = book.imgUrl
    
    modal.showModal()
}


function onUserInput(event) {
    var value = event.target.value
    setFilter(value)
    render()
}

function onResetFilter() {
    setFilter('')
    render()
    const title = document.querySelector('input').value = ''
}
function _onSuccess(str) {
    const msg = `book was ${str} successfully`
    showElement('.success')
    document.querySelector('.success').innerText = msg
    setTimeout(() => {
        hideElement('.success')
    }, 2000);
}

function onUpdateRating(event, el) {
    const curBook = getBookById(localStorage.getItem('curBookId'))
    event.preventDefault()

    if (el.innerText.includes('-')) {
        console.log('-', el.innerText.includes('-'));
        if (curBook.rating <= 0) return
        else
            curBook.rating--
    }
    if (el.innerText.includes('+')) {
        console.log('-', el.innerText.includes('+'));
        if (curBook.rating >= 5) return
        else curBook.rating++
    }
    updateRating(curBook.id, curBook.rating)
    onReadBook(curBook.id)
    renderStats()
    render()
}

function renderStats() {
    const curStats = getCurStats()
    const elFooter = document.querySelector('footer')
    const spanAveragePricePerBook = elFooter.querySelector('.avg-price')
    const spanNumOfBooks = elFooter.querySelector('.sum-of-books')
    const spanAbove200 = elFooter.querySelector('.above-200')
    const spanBetween = elFooter.querySelector('.between')
    const spanBelow100 = elFooter.querySelector('.below-100')

    spanNumOfBooks.innerText = `Total Book Count : ${curStats.BooksCount}`
    spanAveragePricePerBook.innerText = `Average Book Price : ${curStats.avgPrice}`
    spanAbove200.innerText = `Books above $20 : ${curStats.moreThen20}`
    spanBetween.innerText = `Books Between $10 and $20 : ${curStats.Between}`
    spanBelow100.innerText = `Books Below $10 : ${curStats.lessThen10}`
}

function showElement(selector) {
    const element = document.querySelector(selector)
    element.classList.remove("hidden")
}

function hideElement(selector) {
    const element = document.querySelector(selector)
    element.classList.add("hidden")
}

