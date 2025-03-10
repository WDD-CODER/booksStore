'use strict';

function getBookFromLocalStorage(bookObject){
    const book = localStorage.getItem(bookObject.id);
    return book;
}

function removeBookFromLocalStorage(bookObject) {
    localStorage.removeItem(bookObject.id)
}
function updateLocalStorage() {
    localStorage.clear()
    _saveBook() //, json)
}


function _saveBook() {
    gBooks.forEach(book => {
        var json = fromObjectToJson(book, null, 4)
        localStorage.setItem(`${book.id}`, json)
    });

}
