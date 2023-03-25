'use strict'
import { debounce } from '../../Helpers/lib.js'
import { searchRequest } from '../../main.js'
const searchbarForm = document.querySelector('.searchbar-form')
const input = searchbarForm.querySelector('input')
const emptyInputPopup = document.querySelector('.invalid-popup')

const searchDebounce = debounce((data) => searchRequest(data))

searchbarForm.addEventListener('submit', e => {
    e.preventDefault()
    input.value = input.value.replaceAll(/\s{2,}/g, ' ')
    if (input.value || input.value.replace(' ', '')) {

    } else {
        emptyInputPopup.classList.add('active')
    }
})

document.querySelector('.searchbar-main-container').addEventListener('click', () => input.focus())

input.addEventListener('change', e => {
    emptyInputPopup.classList.remove('active')
    if (!e.target.value) return
    searchDebounce(e.target.value)
})