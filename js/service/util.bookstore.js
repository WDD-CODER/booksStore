'use strict';
// var test =     {id:'1', title: 'name1', price: '1$', imgUrl:'lori-ipsi1.jpg' }

// fromObjectToJson(test)
function GetClearPrice(book){
 return  parseFloat(book.price)
}

function get2DecimalNum(num){
  return parseFloat(num).toFixed(2)  
}

function fromObjectToJson(obj) {
const json = JSON.stringify(obj,null,4)
return json
}

function fromJsonToObject(json) {
const obj = JSON.parse(json)
return obj
}

function getId() {
    return [...Array(8)]
      .map(() => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
      .join('');
  }
  
  function getLoremIpsum(){
    return `Lorem, ipsum dolor sit amet consectetur adipisicing elit
    Officia voluptatibus at incidunt perspiciatis quos impedit, pariatur 
    porro cupiditate rem aperiam dignissimos! Tempora veniam ad soluta unde ab, 
    praesentium totam nam`
  }
