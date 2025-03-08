'use strict';

function getBooksFromLocalStorage() {
    if (localStorage.length < 1) {
        getBooks()
        addBooksToLocalStorage()
        return
    }

    else {
        
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i)
            const json =  localStorage.getItem(key)
            const obj = fromJsonToObject(json)
            gBooks.unshift(obj)
        }
    }
}

function addBooksToLocalStorage() {
    localStorage.clear()
    _saveBook() //, json)
}


function _saveBook() {
    gBooks.forEach(book => {
        var json = fromObjectToJson(book, null, 4)
        // _saveBook(book, json)
        localStorage.setItem(`${book.id}`, json)
    });

}
function RemoveBookFromStorage(bookId) {
    localStorage.removeItem(`${bookId}`)
}