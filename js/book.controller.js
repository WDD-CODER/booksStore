'use strict';

function onInit() {
    render()
}

function render() {
    const books = getBooks()    
    if (!books ||books.length === 0) {
        renderNoticeNoFilter()
        return
    }

    const elNoBooksNotice = document.querySelector('.noticeNoBooks')   
    const elTbody = document.querySelector('tbody')
    elNoBooksNotice.classList.add('hidden') 
    elTbody.innerHTML = ''
    books.map(book => {
        elTbody.innerHTML += `<tr>
                              <td>${book.title}</td>
                              <td>${book.price}</td>
                              <td>
                              <button onclick="onUpdateBook('${book.id}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onShowDetails('${book.id}')" class="book-details">read</button>   
                              </td></tr>`
    })
    onFindStats()
}

function renderNoticeNoFilter(){    
    const elTbody = document.querySelector('tbody')
    elTbody.innerHTML = ''
    const elNoBooksNotice = document.querySelector('.noticeNoBooks')   
    elNoBooksNotice.classList.remove('hidden') 
}

function onRemoveBook(bookId) {
    removeBook(bookId)
    render()
    _onSuccess()
}

function onUpdateBook(bookId) {
    var newBookPrice = prompt('what\'s the new book\'s price?')

    if(!newBookPrice || isNaN(newBookPrice)) {
      alert('book must have a price bigger then 0! please set it or hit cancel to exit')
      return

    }

    updatePrice(bookId, newBookPrice)
    render()
    _onSuccess()
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
    render()
}

function onShowDetails(bookId) {
    const book = getBookById(bookId)
    const randPars = getLoremIpsum()
    const modal = document.querySelector('.modal')
    document.querySelector('.book-title').innerText = book.title
    document.querySelector('.price').innerText = `price:  ${book.price}`
    document.querySelector('.book-pre').innerText = `book description: ${randPars}`
    document.querySelector('.book-img').src = book.imgUrl
    modal.showModal()
}

function onHideDetails() {
    document.querySelector('.modal').close()
}

function onUserInput(event) {    
    var value = event.target.value
    setFilter(value)
    // console.log("🚀 ~ onUserInput ~ value:", value)
    // getUserInput(usrInput)
    render()
}

function onClearSearch() {
    document.querySelector('input').value = ''
    render()
}

function _onSuccess() {
    document.querySelector('.success').classList.remove('hidden')
    setTimeout(() => {
        document.querySelector('.success').classList.add('hidden')
    }, 2000);
}


function onFindStats() {
    getCurStats()

    const elFooter = document.querySelector('footer')
    const spanAveragePricePerBook = elFooter.querySelector('.avg-price')
    const spanNumOfBooks = elFooter.querySelector('.sum-of-books')
    const spanAbove200 = elFooter.querySelector('.above-200')
    const spanBetween = elFooter.querySelector('.between')
    const spanBelow100 = elFooter.querySelector('.below-100')

    spanNumOfBooks.innerText = gStats.BooksCount
    spanAveragePricePerBook.innerText = gStats.avgPrice
    spanAbove200.innerText = gStats.moreThen200
    spanBetween.innerText = gStats.Between
    spanBelow100.innerText = gStats.lessThen100
}