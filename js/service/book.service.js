'use strict';

var gBooks = getBooks()

function getBooks(){
     gBooks = [
        {title: 'name1', price: '1$'},
        {title: 'name2', price: '2$'},
        {title: 'name3', price: '3$'}
    ]
    return gBooks
    }

  function RemoveBook(idx){
    gBooks.splice(idx, 1)
  }
  
  function updatePrice(idx, newPrice){
    gBooks[idx].price = newPrice + '$'
  }