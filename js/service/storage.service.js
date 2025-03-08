'use strict';

function getBooksFromLocalStorage() {
    if (localStorage.length < 1) {
        getBooks()
        updateLocalStorage()
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
