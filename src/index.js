import { createElement, render, renderDOM } from './element.js'
import patch from './patch'
import diff from './diff.js'
import './style.css'

const vDOM1 = createElement('ul', { className: 'list' }, [
  createElement('li', { className: 'item' }, ['a']),
  createElement('li', { className: 'item' }, ['b']),
  createElement('li', { className: 'item' }, ['c'])
])

const vDOM2 = createElement('ul', { className: 'list-group' }, [
  createElement('li', { className: 'item' }, ['1']),
  createElement('li', { className: 'item' }, ['b']),
  createElement('div', { className: 'item' }, ['s']),
])

const ele = render(vDOM1)
renderDOM(ele, document.getElementById('root'))

let patches = diff(vDOM1, vDOM2)
console.log(patches)
patch(ele, patches)
