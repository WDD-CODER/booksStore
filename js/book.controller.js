'use strict';

const LAYOUT_KEY = 'layoutDb'
const gQueryOptions = {
    filterBy: { txt: '', rating: 0, },
    sortBy: { sortField: '', sortDir: 0 },
    page: { idx: 0, size: 5 },
    layOut: {} // no need
}


var gLayout = loadFromStorage(LAYOUT_KEY) || 'table'

function onInit() {
    render()
}

function onClearFilters() {
    const inputValue = document.querySelector('input').value = ''
    const ratingValue = document.querySelector('.rating-field').value = ''
    const radioBtnCheap = document.querySelector('.sorting-low').checked = false
    const radioBtnExpensive = document.querySelector('.sorting-high').checked = false
    const sortBtnS = document.querySelectorAll('.table-header button').forEach(book => book.style.color = 'black')
    clearRating()
    clearSorting()
    render()

}

function onSetFilter(event) {
    var value = event.target.value
    gQueryOptions.filterBy.txt = value
    gQueryOptions.page.idx = ''
    render()
}



//get updated list and renders it
function render() {
    const books = getBooks(gQueryOptions)
    if (!books.length) {
        renderNoticeNoFilter(books)
        return
    }
    if (gLayout === 'card') renderBookCards(books)
    else renderBookTable(books)
    RenderStats(books)

}
// rendering functions
function RenderStats(books) {
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

function renderBookTable(books) {
    onHideElement('.card-container')
    const elActionTh = document.querySelector('.action.sort')
    elActionTh.classList.remove('hidden')
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
    // setQueryParams()
}
function renderBookCards(books) {
    const elCardContainer = document.querySelector('.card-container')
    const elActionTh = document.querySelector('.action.sort').classList.add('hidden')

    const elTbody = document.querySelector('tbody')
    elTbody.innerHTML = ''
    onShowElement('.card-container')

    var strHTMls = books.map(book => {
        return `<div class="book-card">
                              <p>${book.title}</p>
                              <p>$${book.price}</p>
                              <p>${repeatRatingStars(book.rating)}</p>
                              <img src="${book.imgUrl}" onerror="this.src='img/default.jpg'" alt="bookImg">
                                                            <section>
                              <button onclick="onUpdateBook('${book.id}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onRenderDetailsModal('${book.id}')" class="book-details">read</button>   
                              </section></div>`
    })
    elCardContainer.innerHTML = strHTMls.join("")
    // setQueryParams()
}
function renderNoticeNoFilter(booksArray) {
    const elTbody = document.querySelector('tbody')
    const msg = 'No matching books were found'
    elTbody.innerHTML = `<tr><td colspan="4">${msg}</td></tr>`
    onHideElement('.card-container')
    RenderStats(booksArray)
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
    gBookId = bookId
    const book = getBookById(bookId)
    const modal = document.querySelector('.modal')
    document.querySelector('.book-title').innerText = book.title
    document.querySelector('.price').innerText = `price: $ ${book.price}`
    document.querySelector('.book-pre').innerText = `book description: ${book.description}`
    document.querySelector('.show-rating').innerText = book.rating
    document.querySelector('.book-img').src = book.imgUrl

    setQueryParams(bookId)

    modal.showModal()
}

// CRUDL (CREAE, READ, UPDATE,DELETE)
function onAddBook() {
    const title = document.querySelector('[name="book-title"]')
    const price = document.querySelector('[name="book-price"]')
    const imgUrl = document.querySelector('[name="book-img"]')
    const rating = document.querySelector('.show-rating')

    if (!price.value || !title.value) {
        alert('Make sure all needed info. price and title are inserted')
        return
    }
    if (gBookId) {
        updateBook(gBookId, title.value, price.value, imgUrl.value)
    }
    else {
        const newBook = createBook(title.value, price.value, imgUrl.value)
        addBook(newBook)
    }
    gBookId = null
    clearModal()
    onRenderSuccessMsg('add')
    render()

}

// remove
function onRemoveBook(bookId) {
    if (confirm('Are you sure you want to remove the book?'))
        removeBook(bookId)
    render()
    onRenderSuccessMsg('remove')
}
// 


// פה אפשר ליצור משהו שעקב אחרי הקווריי ומשם מאפס את הקווארי ודואג לתת ערך דיפולטיבי ומעדכן את כל המקומות השונים בהתאם 
function clearModal() {
    const modal = document.querySelector('.add-book.modal')
    const title = document.querySelector('[name="book-title"]').value = ''
    const price = document.querySelector('[name="book-price"]').value = ''
    const imgUrl = document.querySelector('[name="book-img"]').value = ''

}


//update
function onUpdateBook(bookId, newTitle, newPrice, newUrl) {
    gBookId = bookId;
    var book = getBookById(bookId);
    const modal = document.querySelector('.add-book.modal');
    const title = document.querySelector('[name="book-title"]');
    const price = document.querySelector('[name="book-price"]');
    const imgUrl = document.querySelector('[name="book-img"]');
    const rating = document.querySelector('[name="rating"]');

    rating.innerText = book.rating;
    title.value = book.title;
    price.value = book.price;
    imgUrl.value = book.imgUrl;
    document.querySelector('.book-img-update').src = book.imgUrl;

    modal.showModal();
    return book;
}
function onUpdateRating(event, el) {
    const curBook = getBookById(gBookId)
    event.preventDefault()
    if (!gBookId) {
        alert('no book Yet, please add one before! ')
        return
    }

    if (el.innerText.includes('-')) {
        if (curBook.rating <= 0) return
        else curBook.rating--

    }
    if (el.innerText.includes('+')) {
        if (curBook.rating >= 5) return
        else curBook.rating++
    }
    updateRating(curBook.id, curBook.rating)
    var ratingBtns = document.querySelectorAll('button.show-rating').forEach((el) => el.innerText = curBook.rating)
    render()
    return curBook
}
function onChangeRating(el) {
    const minimumRating = el.value.length
    gQueryOptions.filterBy.rating = minimumRating
    render()
}
function onSetLayout(value) {
    gLayout = value
    console.log("🚀 ~ changeLayout ~ LAYOUT_KEY:", gLayout)
    saveToStorage(LAYOUT_KEY, gLayout)
    render()
}

function onChangeRadioBtn(el) {
    const direction = getSortFieldValue(el)
    if (direction === 'up') {
        document.querySelector('.sorting-low').checked = false
    }
    if (direction === 'down') {
        document.querySelector('.sorting-high').checked = false
    }
}
function onChangeSortingBtn(el) {
    const curElName = el.name.toLowerCase()
    const curElValue = el.value.toLowerCase()
    const sortBtnS = document.querySelectorAll('.table-header button').forEach(sortBtnS => {
        if (sortBtnS.name.toLowerCase() === curElName && sortBtnS.value.toLowerCase() === curElValue) {
            sortBtnS.style.color = 'yellow'
        } else sortBtnS.style.color = 'black'
    })
}


// PAGING

// helpers
function onChangeSorting(el) {
    const elValue = getSortFieldValue(el)
    gQueryOptions.sortBy.sortField = elValue
    onChangeSortingBtn(el)
    onChangeRadioBtn(el)
    SortByStr(gBooks, gQueryOptions.sortBy.sortField)
    render()
    return
}

function onNextPage() {
    const lastPageIdx = getLastPageIdx(gQueryOptions)
    gQueryOptions.page.idx++

    if (gQueryOptions.page.idx > lastPageIdx) {
        gQueryOptions.page.idx = 0
    }
    render()
}
function onPreviousPage() {
    const lastPageIdx = getLastPageIdx(gQueryOptions)
    gQueryOptions.page.idx--

    if (gQueryOptions.page.idx < 0) {
        gQueryOptions.page.idx = lastPageIdx
    }
    render()
}


// filterBy: { txt: '', rating: 0, },
// sortBy: { value: '' },
// page: { idx: 0, size: 5 },
// layOut: {}

PARAMS
function setQueryParams(bookId = null) {
    const queryParams = new URLSearchParams()

    const { filterBy, sortBy, page } = gQueryOptions

    if (bookId) queryParams.set('bookId', bookId)

    queryParams.set('filterByTxt', filterBy.txt)
    queryParams.set('filterByRating', filterBy.rating)

    if (gQueryOptions.sortBy.value) queryParams.set('sortBy', sortBy)

    if (gQueryOptions.page.idx !== undefined) {
        queryParams.set('pageIdx', page.idx)
    }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.host + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    const bookId = queryParams.get('bookId')
    if (bookId) onRenderDetailsModal(bookId)

    const filterByTxt = queryParams.get('title') || ''
    const filterByRating = +queryParams.get('filterByRating') || 0

    const filterBy = queryParams.filterBy
    filterBy.txt = filterByTxt
    filterBy.rating = filterByRating

    if (queryParams.get('sortby')) {
        const sortBy = queryParams.get('sortBy')
        gQueryOptions.sortBy = sortBy
    }

    if (queryParams.get('pageIdx')) {
        const page = +queryParams.get('pageIdx')
        const maxPage = getLastPageIdx(gQueryOptions)
        if (gQueryOptions.page.idx + diff < 0) return gQueryOptions.page.idx = maxPage
        if (gQueryOptions.page.idx + diff > maxPage) return gQueryOptions.page.idx = 0
        gQueryOptions.page.idx += diff
    }

    renderQueryParams()
}

function renderQueryParams() {
    const { filterBy, sortBy, page } =gQueryOptions

    document.querySelector('filter-btn input').value =  filterBy.txt 
    document.querySelector('rating-field').value = filterBy.rating

    if (sortBy.sortField) {
        
    }
} 

// HELPERS
function onOpenBookModal() {
    clearModal()
    const modal = document.querySelector('.add-book.modal')
    document.querySelector('.book-img-update').src = ''
    var res = document.querySelector('.add-book.modal .show-rating')
    res.innerText = 'X'

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

