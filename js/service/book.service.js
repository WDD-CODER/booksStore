'use strict';

var gBooks = getBooks()

function getBooks() {
  gBooks = [
    {id:'1', title: 'name1', price: '1$', imgUrl:'lori-ipsi1.jpg' },
    {id:'2', title: 'name2', price: '2$', imgUrl:'lori-ipsi2.jpg'  },
    {id:'3', title: 'name3', price: '3$', imgUrl:'lori-ipsi3.jpg'  }
  ]
  return gBooks
}

function RemoveBook(idx) {
  gBooks.splice(idx, 1)
}

function updatePrice(idx, newPrice) {
  gBooks[idx].price = newPrice + '$'
}

function addBook(newReadyBook) {
  gBooks.unshift(newReadyBook)
  console.log('gBooks', gBooks);
  
}

function ShowDetails(){
  
}
