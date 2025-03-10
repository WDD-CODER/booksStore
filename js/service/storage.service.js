'use strict';

// function getBooksFromLocalStorage(bookObject){
//     for (let i = 0; i < localStorage.length; i++) {
//         const book =(localStorage.getItem(bookObject.id));
//     }
    
//     console.log("🚀 ~ getBookObjctFromLocalStorage ~ book:", book)
//     return book;
// }

// function getBookObjectFromLocalStorage(bookObject){
//    const curBookJson =(localStorage.getItem(bookObject.id))
//    sa = fromJsonToObject(curBookJson)
//    return curBook;
// }


// function removeBookFromLocalStorage(bookObject) {
//     localStorage.removeItem(bookObject.id)
// }
// function updateLocalStorage() {
//     localStorage.clear()
//     _saveBook() //, json)
// }



// function _saveBook() {
//     gBooks.forEach(book => {
//         var json = fromObjectToJson(book, null, 4)
//         localStorage.setItem(`${book.id}`, json)
//     });

// }
///////////////////

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key)
    return JSON.parse(val)
}
