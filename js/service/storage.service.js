'use strict';

function setBookToLocalStorage() {
    if (!localStorage) return
    var booksArray = gBooks.forEach(book => {
        var json = fromObjectToJson(book, null, 4)
        console.log("🚀 ~ setBookToLocalStorage ~ json:", json)
        _saveBook(book, json)
    });
}

function _saveBook(bookObject, json) {
    localStorage.setItem(`${bookObject.id}`, json)
}
function RemoveBookFromStorage(bookId) {
    localStorage.removeItem(`${bookId}`)
}