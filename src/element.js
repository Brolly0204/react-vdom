class Element {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }
}

function createElement(node, props, children) {
  return new Element(node, props, children)
}

function setAttr(ele, key, value) {
  switch(key) {
    case 'value':
      if (ele.nodeName.toUpperCase() === 'INPUT' || ele.nodeName.toUpperCase() === 'TEXTAREA') {
        ele.value = value
      } else {
        ele.setAttribute(key, value)
      }
      break
    case 'style':
      ele.styleText = value
      break
    case 'className':
      ele['className'] = value
      break
    default:
      ele.setAttribute(key, value)     
  }
}


function render(vdom) {
  console.log(vdom)
  const ele = document.createElement(vdom.type)
  for (var key in vdom.props) {
    setAttr(ele, key, vdom.props[key])
  }
  vdom.children.forEach(child => {
    const el = child instanceof Element ? render(child) : document.createTextNode(child)
    ele.appendChild(el)
  })
  return ele
}

function renderDOM(ele, root) {
  root.appendChild(ele)
}

export { createElement, render, renderDOM, Element, setAttr }
