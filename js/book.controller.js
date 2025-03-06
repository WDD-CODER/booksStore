'use strict';

function onInit() {
    render()
}
function render() {
    const elBody = document.querySelector('body')
    elBody.innerHTML = `<table> <tbody> <tr class="table-header"><th>title</th><th>price </th><th>action</th></tr></tbody></table>`
    const elTbody = document.querySelector('table')
    gBooks.map(book => {
        elTbody.innerHTML += `<td>book name</td>
                              <td>price$</td>
                              <td>
                              <button class="read-button">read</button>
                              <button class="update-button">update</button>
                              <button class="delete-button">delete</button>   
                              </td>`
    })
}