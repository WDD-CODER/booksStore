'use strict';
var gFiltered = '';

function onInit() {
    getBooksFromLocalStorage()
    render(gBooks)
}
function render(gFiltered) {
    if (!gFiltered) {
        console.log('no user input');
        gFiltered = getBooks()
    }

    const elTable = document.querySelector('table')
    elTable.innerHTML = `<tbody> <tr class="table-header"><th>title</th><th>price </th><th>action</th></tr></tbody>`
    const elTbody = elTable.querySelector('tbody')
    gFiltered.map(book => {
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
}

function onRemoveBook(bookId) {
    var idx = gBooks.findIndex(book => book.id === bookId)
    onSuccess()
    RemoveBook(idx)
    RemoveBookFromStorage(bookId)
    render(gBooks)
}

function onUpdateBook(bookPrice) {
    var newPrice = prompt('what\'s the new price?')
    var idx = gBooks.findIndex(book => book.price === bookPrice)
    onSuccess()
    updatePrice(idx, newPrice)
    render(gBooks)
}

function onAddBook() {
    const newBookName = prompt('what\'s the book\'s name?')
    const newBookPrice = prompt('what\'s the book\'s price?') + '$'
    var newBookImgUrl = prompt('what\'s the image\'s url?')
    if (!newBookImgUrl || newBookImgUrl.trim() === '') newBookImgUrl = 'img/noImg.jpg'
    const newReadyBook = {
        id: getId(),
        title: newBookName,
        price: newBookPrice,
        imgUrl: newBookImgUrl,
    }
    onSuccess()
    addBook(newReadyBook)
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
    gFiltered = gBooks.filter(book => book.title.includes(`${readyToUseInput}`))
    render(gFiltered)
}

function onClearSearch() {
    document.querySelector('input').value = ''
    render(gBooks)
}

function onSuccess() {
    document.querySelector('.success').style.display = 'block'
    setTimeout(() => {
        document.querySelector('.success').style.display = 'none'
    }, 2000);
}
