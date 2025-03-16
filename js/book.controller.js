'use strict';

const gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

function onInit() {
    render()
}

function render() {
    const books = getBooks(gQueryOptions)
    if (!books.length) {
        renderNoticeNoFilter(books)
        return
    }
    if (getGLayout() === 'card-layout') renderBookCards(books)
    else renderBookTable(books)
}
function renderBookTable(books) {
    onHideElement('.card-container')

    const elTbody = document.querySelector('tbody')
    var strHTMls = books.map(book => {
        return `<tr>
                              <td>${book.title}</td>
                              <td>$${book.price}</td>
                              <td>${repeatRatingStars(book.rating)}</td>
                              <td>
                              <button onclick="onUpdateBook('${book.id}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onRenderDetailsModal('${book.id}')" class="book-details">read</button>   
                              </td></tr>`
    })
    elTbody.innerHTML = strHTMls.join("")
    onRenderStats(books)
}
function renderBookCards(books) {
    const elCardContainer = document.querySelector('.card-container')
    const elTbody = document.querySelector('tbody')
    elTbody.innerHTML = ''
    onShowElement('.card-container')

    var strHTMls = books.map(book => {
        return `<div class="book-card">
                              <p>${book.title}</p>
                              <p>$${book.price}</p>
                              <p>${repeatRatingStars(book.rating)}</p>
                              <img src="${book.imgUrl}" onerror="this.src='img/noImg.jpg'" alt="bookImg">
                              <section>
                              <button onclick="onUpdateBook('${book.id}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onRenderDetailsModal('${book.id}')" class="book-details">read</button>   
                              </section></div>`
    })
    elCardContainer.innerHTML = strHTMls.join("")
    onRenderStats(books)

}
function onRenderStats(books) {
    const curStats = getCurStats(books)
    const elFooter = document.querySelector('footer')
    const spanAveragePricePerBook = elFooter.querySelector('.avg-price')
    const spanNumOfBooks = elFooter.querySelector('.sum-of-books')
    const spanAbove200 = elFooter.querySelector('.above-200')
    const spanBetween = elFooter.querySelector('.between')
    const spanBelow100 = elFooter.querySelector('.below-100')

    spanNumOfBooks.innerText = `Total Book Count : ${curStats.BooksCount}`
    spanAveragePricePerBook.innerText = `Average Book Price : ${curStats.avgPrice}`
    spanAbove200.innerText = `Books above $200 : ${curStats.moreThen200}`
    spanBetween.innerText = `Books Between $100 and $200 : ${curStats.Between}`
    spanBelow100.innerText = `Books Below $100 : ${curStats.lessThen100}`
}
function renderNoticeNoFilter(booksArray) {
    const elTbody = document.querySelector('tbody')
    const msg = 'No matching books were found'
    elTbody.innerHTML = `<tr><td colspan="4">${msg}</td></tr>`
    onHideElement('.card-container')
    onRenderStats(booksArray)
    return
}

function onRenderSuccessMsg(newMsg) {
    const msg = `book was ${newMsg} successfully`
    onShowElement('.success')
    document.querySelector('.success').innerText = msg
    setTimeout(() => {
        onHideElement('.success')
    }, 2000);
}
function onRenderDetailsModal(bookId) {
    const book = getBookById(bookId)
    const modal = document.querySelector('.modal')

    localStorage.setItem('curBookId', bookId)

    document.querySelector('.book-title').innerText = book.title
    document.querySelector('.price').innerText = `price: $ ${book.price}`
    document.querySelector('.book-pre').innerText = `book description: ${book.description}`
    document.querySelector('.show-rating').innerText = book.rating
    document.querySelector('.book-img').src = book.imgUrl

    modal.showModal()
}


function onAddBook() {
    var newBookTitle = prompt('what\'s the book\'s title?')
    if (newBookTitle === null || newBookTitle.trim() === '') {
        alert('book must have a title! please Try again')
        return
    }
    var newBookPrice = +prompt('what\'s the book\'s price?')
    if (newBookPrice === null || newBookPrice.trim() === '') {
        alert('book must have a title! please Try again')
        return
    }
    var newBookImgUrl = prompt('what\'s the image\'s url?')
    if (!newBookImgUrl || newBookImgUrl.trim() === '') newBookImgUrl = 'img/noImg.jpg'

    const newReadyBook = createBook(newBookTitle, newBookPrice, newBookImgUrl)

    addBook(newReadyBook)
    render()
    onRenderSuccessMsg('add')
}
function onSaveBookByModal() {
    const title = document.querySelector('[name="book-title"]')
    const price = document.querySelector('[name="book-price"]')
    const imgUrl = document.querySelector('[name="book-img"]')

    if (!price.value || !title.value) {
        alert('Make sure all needed info. price and title are inserted')
        return
    }
    console.log("🚀 ~ onSaveBookByModal ~ gBookId:", gBookId)
    if (gBookId) {
        updateBook(gBookId, title.value, price.value, imgUrl.value)
        gBookId = null

    }
    else {
        const newBook = createBook(title.value, price.value, imgUrl.value || getNoImgUrl())
        addBook(newBook)
    }

    clearModal()
    render()

}


function onRemoveBook(bookId) {
    if (confirm('Are you sure you want to remove the book?'))
        removeBook(bookId)
    render()
    onRenderSuccessMsg('remove')
}

function onUpdateBook(bookId, newTitle, newPrice, newUrl) {
    gBookId = bookId
    const modal = document.querySelector('.add-book.modal')
    const title = document.querySelector('[name="book-title"]')
    const price = document.querySelector('[name="book-price"]')
    const imgUrl = document.querySelector('[name="book-img"]')

    var book = getBookById(bookId)

    title.value = book.title
    price.value = book.price
    imgUrl.value = book.imgUrl

    modal.showModal()
    return book
}



function clearModal() {
    const modal = document.querySelector('.add-book.modal')
    const title = document.querySelector('[name="book-title"]').value = ''
    const price = document.querySelector('[name="book-price"]').value = ''
    const imgUrl = document.querySelector('[name="book-img"]').value = ''
}

function onUserInput(event) {
    var value = event.target.value
    setFilter(value)
    render()
}

function onClearFilters() {
    const inputValue = document.querySelector('input').value = ''
    const ratingValue = document.querySelector('.rating-field').value = ""
    const radioBtnCheap = document.querySelector('.sorting-low').checked = false
    const radioBtnExpensive = document.querySelector('.sorting-high').checked = false
    setFilter('')
    clearRating()
    clearSorting()
    render()

}

// Update rating in read model
function onUpdateRating(event, el) {
    const curBook = getBookById(localStorage.getItem('curBookId'))
    event.preventDefault()

    if (el.innerText.includes('-')) {
        if (curBook.rating <= 0) return
        else
            curBook.rating--
    }
    if (el.innerText.includes('+')) {
        if (curBook.rating >= 5) return
        else curBook.rating++
    }
    updateRating(curBook.id, curBook.rating)
    onRenderDetailsModal(curBook.id)
    render()
    return curBook
}

function onChangeSorting(el) {
    const value = el.value
    gQueryOptions.sortBy.value = value

    if (value === 'Expensive') {
        document.querySelector('.sorting-low').checked = false
    }
    if (value === 'Cheap') {
        document.querySelector('.sorting-high').checked = false
    }
    render()
    return
}

function onSetLayout(el) {
    const selector = el.classList[0]
    changeLayout(selector)
    render()
}

function onChangeRating(el) {
    const minimumRating = el.value.length
    gQueryOptions.filterBy.rating = minimumRating
    render()
}
function onOpenBookModal() {  
    clearModal()  
    const modal = document.querySelector('.add-book.modal')
    const title = document.querySelector('[name="book-title"]')
    const price = document.querySelector('[name="book-price"]')
    const imgUrl = document.querySelector('[name="book-img"]')

    modal.showModal()
}
function onCloseBookModal(event) {
    event.preventDefault()
    const modal = document.querySelector('.add-book.modal')
    modal.close()
}
function onShowElement(selector) {
    const element = document.querySelector(selector)
    element.classList.remove("hidden")
}
function onHideElement(selector) {
    const element = document.querySelector(selector)
    element.classList.add("hidden")
}

function onNextPage() {
    const lastPageIdx = getLastPage(gQueryOptions)
    gQueryOptions.page.idx++

    if (gQueryOptions.page.idx >= lastPageIdx) {
        gQueryOptions.page.idx = 0
    }
    render()
}

function onPreviousPage() {
    const lastPageIdx = getLastPage(gQueryOptions)
    gQueryOptions.page.idx--

    if (gQueryOptions.page.idx < 0) {
        gQueryOptions.page.idx = lastPageIdx - 1
    }
    render()
}
