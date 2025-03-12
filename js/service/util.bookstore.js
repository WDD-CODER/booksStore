'use strict';


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
  
  function makeLorem(wordCount = 100) {
    let str = ''
    let isNewSentence = true

    for (let i = 0; i <= wordCount; i++) {
        if (isNewSentence) {
            str += getWord(true) + ' '
            isNewSentence = false
        } else {
            str += getWord(false) + ' '
            if (!(wordCount % (i + 2))) {
                str += '.\n'
                isNewSentence = true
            }
        }
    }
    return str
}

function getWord(isUpperCase) {
    const chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const length = Math.floor(Math.random() * (5 - 2) + 2)
    let word = ''

    for (let i = 0; i <= length; i++) {
        word += chars[Math.floor(Math.random() * (25 - 0 + 1) + 0)]
    }

    if (isUpperCase) word = word.charAt(0).toUpperCase() + word.substring(1)
    return word
}