'use strict'

import { sortByLatest } from '../../Helpers/lib.js'

const filter = document.querySelector('.filter')
filter.addEventListener('click', showFilter)

function showFilter(e) {
    if (e.target.closest('.filter-sort-container') != null) return
    filter.querySelector('.filter-sort-container').classList.toggle('active')
}

const checkIcons = [...filter.querySelectorAll('input[type="checkbox"]')]
const filterOptions = [...filter.querySelectorAll('li:not(.filter-sort-title)')]

checkIcons.forEach(check => check.addEventListener('click', showCheck))
filterOptions.forEach(option => option.addEventListener('click', showCheck, { capture: true }))

function showCheck(e) {
    e.stopPropagation()
    const closestOption = e.target.closest('li:not(.filter-sort-title)')
    closestOption.classList.toggle('active')
    const optionName = closestOption.querySelector('span').textContent
    switch (optionName) {
        case 'Latest':
            sortByLatest()
            break;
        case 'Oldest':
            sortByLatest(false, true)
            break
    }
}

