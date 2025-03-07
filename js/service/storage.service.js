'use strict';

function setBookToLocalStorage() {
    if (!localStorage) return
    var booksArray = gBooks.map(book => {
        var json = fromObjectToJson(book, null, 4)
        console.log("🚀 ~ setBookToLocalStorage ~ json:", json)
        _saveBooks(book,json)
        return json
    });
}

function _saveBooks(bookObject, json) {
    localStorage.setItem(`${bookObject.id}`, json)
}