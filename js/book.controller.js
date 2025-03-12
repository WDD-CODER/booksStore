'use strict';

function onInit() {
    render()
}

// זה פונקציה ריקה משטויות היא צריכה להכיל רק פונקציות נקיותץ צריך פונקציה לרנדור טבלה ואחת לרנדור כרטיסים
// פה הוא שם את התנאי לבדוק אם אין ספרים בכלל או רק מפולטרים
// הוא עשה זאת בפעולה יזימה של הזרקת האלמנט כשורה מהטבלה במקרה של הטבלה. אין צורך באלמנט בפני עצמו בדום בשיביל זה
// סטו בחר בדרך של קודם כל להחביא על יידי פונקציות יעודייות את כל האלמנטים ובהתאם לכניסה לנאי אם להציג כרטיסים או טבלה מציג רק את מה שרלוונטי
function render() {
    const books = getBooks()
    if (!books.length) {
        renderNoticeNoFilter()
        onFindStats()
        return
    }

    else
    renderBookTable()
    onFindStats()

}

function renderBookTable() {
    const elTbody = document.querySelector('tbody')
    var strHTMls = gBooks.map(book => {
        return `<tr>
                              <td>${book.title}</td>
                              <td>$${book.price}</td>
                              <td>
                              <button onclick="onUpdateBook('${book.id}')" class="update-button">update</button>
                              <button onclick="onRemoveBook('${book.id}')" class="delete-button">delete</button>   
                              <button onclick="onReadBook('${book.id}')" class="book-details">read</button>   
                              </td></tr>`
    })
    elTbody.innerHTML = strHTMls.join("")
    onFindStats()
}


function renderBookCards() {
}

// function changeLayout(el){
//     console.log("🚀 ~ changeLayout ~ el:", el)
//     const elMainContainer = document.querySelector('.main-container')
//     if (el.classList.contains('.card-layout')) {
//         showElement('.card-container')
//         hideElement('tbody')
//     }
//     else {
//         showElement('tbody')
//         hideElement('.card-container')
  
//     }
// }


function onSetLayout(el) {
    if(el.classList.contains('.card-layout')) changeLayout('.card-layout') 
   else if(el.classList.contains('.table')) changeLayout('.table') 
    //פונקציה שמגדירה את הלייאוט המבוקש ושומרת אותו במשתנה גלובלי לשימוש 
    // עתידי ובנוסף שומרת את הלייאוט לסטורז לשימוש כל פעם שאנחנו מתחילים את ם את האפליקציה
    //נגדיר גם בתחילת האפליקציה את המשתנה הגלובלי של הלייאטו בכדי
    //  שהאפליקציה תיקח את הערך שקיים בו או אם לא תדפיס את הלייאוט הדיפולטיבי (במקרה שלי טבלה)
}

function renderNoticeNoFilter() {
    const elTbody = document.querySelector('tbody')
    elTbody.innerHTML = ''
    var msg = 'No matching books were found'
    elTbody.innerHTML = `<tr><td colspan="3">${msg}</td></tr>`
    return

}

function onRemoveBook(bookId) {
    if (confirm('Are you sure you want to remove the book?'))
        removeBook(bookId)
    render()
    _onSuccess('remove')
}

function onUpdateBook(bookId) {
    var newBookPrice = +prompt('what\'s the new book\'s price?')

    if (!newBookPrice || isNaN(newBookPrice)) {
        alert('book must have a price bigger then 0! please set it or hit cancel to exit')
        return
    }

    updatePrice(bookId, newBookPrice)
    render()
    // לעדכן הודעה בהתאם להודעה
    _onSuccess('update')
}

function onAddBook() {
   
 // כן יכול להיות שעדיף את השטיה שלי שעושה מענה לכל תשובה של היוזר!


    // const title = prompt('Book title')
    // const price = +prompt('Book price')
    // const url = prompt('Book img url?')
    // if(!title||!price){
    //     return alert ('Please make sure price and title are filled.')
    // }


    //Make sure book has a legit title
    var newBookTitle = prompt('what\'s the book\'s title?')
    while (newBookTitle.trim() === '') {
        newBookTitle = prompt('book must have a title! please  set it or hit cancel to exit')
        if (newBookTitle === null) return
    }
    //Make sure book has a legit price 

    var newBookPrice = prompt('what\'s the book\'s price?')
    while (newBookPrice.trim() === '') {
        newBookPrice = prompt('book must have a price! please set it or hit cancel to exit')
        if (newBookPrice === null) return
    }
    //Make sure price is a legit number
    if (isNaN(newBookPrice)) {
        while (isNaN(newBookPrice) || newBookPrice.trim() === '') {
            newBookPrice = prompt('price must me a number only! please set it or hit cancel to exit')
            if (newBookPrice === null) return
        }
    }


    var newBookImgUrl = prompt('what\'s the image\'s url?')
    if (!newBookImgUrl || newBookImgUrl.trim() === '') newBookImgUrl = 'img/noImg.jpg'
    
    const newReadyBook = createBook(newBookTitle, newBookPrice,newBookImgUrl)    
     console.log("🚀 ~ onAddBook ~ newReadyBook:", newReadyBook)
     

    addBook(newReadyBook)
    render()
    _onSuccess('add')
}

function onReadBook(bookId) {
    const book = getBookById(bookId)

    const randPars = makeLorem()
    const modal = document.querySelector('.modal')
    document.querySelector('.book-title').innerText = book.title
    document.querySelector('.price').innerText = `price:  ${book.price}`
    document.querySelector('.book-pre').innerText = `book description: ${randPars}`
    document.querySelector('.book-img').src = book.imgUrl
    // בכדי לטפל בבונוס של הדירוג הוא שומר בכל פעם את השם של המודל עם התעודת זהות של הספר בסטורג
    // זה מאפשר לו יותר מאוחר לשלוף את המידע הזה מהלוקל סטורז בכדי להפעיל את העדכון מחיר לספר עם אותו תיודת זהות 
    // זה בעצם להשאיר פרורי לחם במערכת בכדי שבפעולה הבאה היה קל לשוף את המידע
    // אפשרות נוספת היא שימוש במשתנה גלובלי ובו יש את התעות זהות הרלוונטי

    

    modal.showModal()
}


function onUserInput(event) {
    var value = event.target.value
    setFilter(value)
    render()
}

function onResetFilter() {
    setFilter('')
    render()
    const title = document.querySelector('input').value = ''
}
function _onSuccess(str) {
    const msg = `book was ${str} successfully`
    showElement('.success')
    document.querySelector('.success').innerText = msg
    setTimeout(() => {
        hideElement('.success')
    }, 2000);
}

function onUpdateRating() {
    // כאן יש את הפריוונט דיפולט כי בגלל שאנחנו נעשה בתוך המודל שהוא בסגנון דיאלוג מודל כפתורים בכדי למנוע מהם
    //  את ההתנהגות הדיפולטיבית של סגירת המודל אנחנו נקבע להם שהם מעבירים את השינוי והאיוונט בכדי לאפשר פריוונט דיפולט איוונט

    // UpdateRating
    // זאת פונקציה שטתפל בסרוויס בבקשה לעדכון הריטינג היא תבדוק אם הדירוג
    //  אכן עומד בטווח מסויים -0-5 ואם כן היא תעדכן את המחיר של הספר לפי התעודת זהות שלו תשמור אותו ותחזיר אותו

    // בשלב האחרון הוא מקבל חזרה את הבוק ובהתאם מרנדר את הרייטינג לאלמנט הרלוונטי בדום 
}

function onFindStats() {
    const curStats = getCurStats()
    const elFooter = document.querySelector('footer')
    const spanAveragePricePerBook = elFooter.querySelector('.avg-price')
    const spanNumOfBooks = elFooter.querySelector('.sum-of-books')
    const spanAbove200 = elFooter.querySelector('.above-200')
    const spanBetween = elFooter.querySelector('.between')
    const spanBelow100 = elFooter.querySelector('.below-100')

    var numOfBooks = `Total Book Count : ${curStats.BooksCount}`
    var AveragePricePerBook = `Average Book Price : ${curStats.avgPrice}`
    var Above20 = `Books above $20 : ${curStats.moreThen20}`
    var Between = `Books Between $10 and $20 : ${curStats.Between}`
    var Below10 = `Books Below $10 : ${curStats.lessThen10}`
    

    spanNumOfBooks.innerText = numOfBooks
    spanAveragePricePerBook.innerText = AveragePricePerBook
    spanAbove200.innerText = Above20
    spanBetween.innerText = Between
    spanBelow100.innerText = Below10
}

function showElement(selector) {
    const element = document.querySelector(selector)
    element.classList.remove("hidden")
}

function hideElement(selector) {
    const element = document.querySelector(selector)
    element.classList.add("hidden")
}

// יצר 2 פונקציות מיועדות להחבאה ולהסתרה של האלמנטים.
//  שתיהן מקבלות את האלמנט מוסיפות או מסירות לו את הקלאס ששמנו בדום של הסתר לפי סלקטור
// לראות איפה אני צריך להוסיף אותן בקוד בכדי לפשט את הקריאה


function onAddModal() { }