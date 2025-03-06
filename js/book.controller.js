'use strict';

function onInit() {
    render()
}

function render() {
    const elBody = document.querySelector('body')
    const elTbody = document.querySelector('table')
    elTbody.innerHTML = `<tr class="table-header">
                         <th>title</th>
                         <th>price </th>
                         <th>action</th>
                         </tr>`
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