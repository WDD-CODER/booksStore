'use strict';

function onInit() {
    console.log('gBooks', gBooks);

    render(gBooks)
}
function render(gBooks) {
    if (!gBooks) {
        console.log('empty');
        return
    }

    const elTable = document.querySelector('table')
    elTable.innerHTML = `<tbody> <tr class="table-header"><th>title</th><th>price </th><th>action</th></tr></tbody>`
    const elTbody = elTable.querySelector('tbody')
    gBooks.map(book => {
        elTbody.innerHTML += `<tr>
                              <td>${book.title}</td>
                              <td>${book.price}</td>
                              <td>
                              <button onclick="" class="read-button">read</button>
                              <button onclick="onUpdateBook('${book.price}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.title}')" class="delete-button">delete</button>   
                              <button onclick="onShowDetails('${book.id}','${book.imgUrl}')" class="book-details">details</button>   
                              </td></tr>`
    })
}

function onRemoveBook(bookTitle) {
    var idx = gBooks.findIndex(book => book.title === bookTitle)
    RemoveBook(idx)
    render(gBooks)
}

function onUpdateBook(bookPrice) {
    var newPrice = prompt('what\'s the new price?')
    var idx = gBooks.findIndex(book => book.price === bookPrice)
    updatePrice(idx, newPrice)
    render(gBooks)
}

function onAddBook() {
    const newBookName = prompt('what\'s the book\'s name?')
    const newBookPrice = prompt('what\'s the book\'s price?') + '$'
    const newReadyBook = {
        title: newBookName,
        price: newBookPrice,
    }
    addBook(newReadyBook)
    render(gBooks)
}

function onShowDetails(bookId,bookImgUrl) {
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
    const modal = document.querySelector('.modal')
    modal.close()
}

