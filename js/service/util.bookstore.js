'use strict';


function fromObjectToJson(obj) {
    const json = JSON.stringify(obj, null, 4)
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

function repeatRatingStars(num) {
    var stars = ''
    for (let i = 0; i < num; i++) {
        stars += '⭐'
    }
    return stars
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSortFieldValue(el) {
    const lowerValue = el.value.toLowerCase().toString()

    if (lowerValue.includes('cheap')) {
        return 'cheap'
    } else if (lowerValue.includes('expensive')) {
        return 'expensive'
    } else if (lowerValue.includes('title-up')) {
        return 'title-up'
    } else if (lowerValue.includes('title-down')) {
        return 'title-down'
    } else if (lowerValue.includes('rating-up')) {
        return 'rating-up'
    } else if (lowerValue.includes('rating-down')) {
        return 'rating-down'
    }
    return '';
}
