const diff = (oldDOM, newDOM) => {
  const patches = {}
  let index = 0
  walk(oldDOM, newDOM, index, patches)
  console.log(patches)
  return patches
}

const ATTR = 'ATTR'
const TEXT = 'TEXT'
const REMOVE = 'REMOVE'
const REPLACE = 'REPLACE'
let Index = 0

function isString(node) {
  return Object.prototype.toString.call(node) === '[object String]'
}

function walk(oldNode, newNode, index, patches) {
  const currentPatch = []
  let attrs

  if (!newNode) { // 删除旧节点
    currentPatch.push({type: REMOVE, index})
  } else if (isString(oldNode) && isString(newNode)) {
    if (oldNode !== newNode) {
      currentPatch.push({type: TEXT, text: newNode})
    }
  } else if (oldNode.type === newNode.type) { // 节点相同
    // 对比属性差异
    attrs = diffAttrs(oldNode.props, newNode.props)
    if (Object.keys(attrs).length) {
      currentPatch.push({type: ATTR, attrs})
    }
    diffChildren(oldNode.children, newNode.children, patches)
  } else { // 替换节点
    currentPatch.push({ type: REPLACE, newNode})
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

function diffChildren(oldChild, newChild, patches) {
  oldChild.forEach((child, idx) => {
    walk(child, newChild[idx], ++Index, patches)
  })
}

function diffAttrs(oldProps, newProps) {
  const patch = {}

  for (var key in oldProps) {
    if (oldProps[key] !== newProps[key] && typeof newProps[key] !== 'undefined') {
      patch[key] = newProps[key]
    }
  }

  for (var key in newProps) {
    if (!oldProps.hasOwnProperty(key)) {
       patch[key] = newProps[key]
    }
  }
  return patch
}

export default diff