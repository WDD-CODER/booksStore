'use strict';
// var test =     {id:'1', title: 'name1', price: '1$', imgUrl:'lori-ipsi1.jpg' }

// fromObjectToJson(test)

function fromObjectToJson(obj) {
const json = JSON.stringify(obj,null,4)
return json
}

function fromJsonToObject(json) {
const obj = JSON.parse(json)
return obj
}