'use strict';
var gFiltered = '';

function onInit() {
    getBooksFromLocalStorage()
    render(gBooks)
}

function render(booksArray) {
    if (!booksArray) {
        console.log('empty booksArray');
        booksArray = getBooks()
        getCurStats(booksArray)
    }

    const elTable = document.querySelector('table')
    elTable.innerHTML = `<tbody> <tr class="table-header"><th>title</th><th>price </th><th>action</th></tr></tbody>`
    const elTbody = elTable.querySelector('tbody')
    booksArray.map(book => {
        elTbody.innerHTML += `<tr>
                              <td>${book.title}</td>
                              <td>${book.price}</td>
                              <td>
                              <button onclick="" class="read-button">read</button>
                              <button onclick="onUpdateBook('${book.price}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onShowDetails('${book.id}','${book.imgUrl}')" class="book-details">details</button>   
                              </td></tr>`
    })
    getCurStats(booksArray)
}

function onRemoveBook(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId)
    _onSuccess()
    RemoveBook(idx)
    render(gBooks)
}

function onUpdateBook(bookPrice) {
    var newBookPrice = prompt('what\'s the new book\'s price?')
    while (newBookPrice.trim() === '') {
        newBookPrice = prompt('book must have a price! please set it or hit cancel to exit')
        if (newBookPrice === null) return
    }

    if (isNaN(newBookPrice)) {
        while (isNaN(newBookPrice) || newBookPrice.trim() === '') {
            newBookPrice = prompt('price must me a number only! please set it or hit cancel to exit')
            if (newBookPrice === null) return
        }
    }

    var idx = gBooks.findIndex(book => book.price === bookPrice)
    _onSuccess()
    updatePrice(idx, newBookPrice)
    render(gBooks)
}

function onAddBook() {
    var newBookTitle = prompt('what\'s the book\'s title?')
    while (newBookTitle.trim() === '') {
        newBookTitle = prompt('book must have a title! please  set it or hit cancel to exit')
        if (newBookTitle === null) return
    }

    var newBookPrice = prompt('what\'s the book\'s price?')
    while (newBookPrice.trim() === '') {
        newBookPrice = prompt('book must have a price! please set it or hit cancel to exit')
        if (newBookPrice === null) return
    }

    if (isNaN(newBookPrice)) {
        while (isNaN(newBookPrice) || newBookPrice.trim() === '') {
            newBookPrice = prompt('price must me a number only! please set it or hit cancel to exit')
            if (newBookPrice === null) return
        }
    }
    newBookPrice += ' $'

    var newBookImgUrl = prompt('what\'s the image\'s url?')
    if (!newBookImgUrl || newBookImgUrl.trim() === '') newBookImgUrl = 'img/noImg.jpg'
    const newReadyBook = {
        id: getId(),
        title: newBookTitle,
        price: newBookPrice,
        imgUrl: newBookImgUrl,
    }
    _onSuccess()
    addBookToGBooks(newReadyBook)
    render(gBooks)
}

function onShowDetails(bookId, bookImgUrl) {
    var idx = gBooks.findIndex(book => book.id === bookId)
    const modal = document.querySelector('.modal')
    const pre = modal.querySelector('pre')
    const curBook = gBooks[idx]
    var json = fromObjectToJson(curBook)
    pre.innerText = json
    modal.showModal()
    ShowDetails(bookImgUrl)
}

function onHideDetails() {
    document.querySelector('.modal').close()
}

function onUserInput(event) {
    var usrInput = event.target.value
    var readyToUseInput = usrInput.toLowerCase()
    gFiltered = gBooks.filter(book => book.title.toLowerCase().includes(`${readyToUseInput}`))
    render(gFiltered)
}

function onClearSearch() {
    document.querySelector('input').value = ''
    render(gBooks)
}

function _onSuccess() {
    document.querySelector('.success').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.success').style.display = 'none'
    }, 2000);
}

function onFindStats(AverageBookPrice,rendedBooks,booksAbove200,booksBetween,booksBelow100) {

    const elFooter = document.querySelector('footer')
    const spanAveragePricePerBook = elFooter.querySelector('.avg-price')
    const spanNumOfBooks = elFooter.querySelector('.sum-of-books')
    const spanAbove200 = elFooter.querySelector('.above-200')
    const spanBetween = elFooter.querySelector('.between')
    const spanBelow100 = elFooter.querySelector('.below-100')

    var AveragePricePerBook = `Average Book Price : ${AverageBookPrice}`
    var numOfBooks = `Total Book Count : ${rendedBooks.length}`
    var Above200 = `Books above 200$ : ${booksAbove200}`
    var Between = `Books Between 100$ and 200$ : ${booksBetween}`
    var Below100 = `Books Below 100$ : ${booksBelow100}`  

    spanNumOfBooks.innerText = numOfBooks
    spanAveragePricePerBook.innerText = AveragePricePerBook
    spanAbove200.innerText = Above200
    spanBetween.innerText = Between
    spanBelow100.innerText = Below100
}