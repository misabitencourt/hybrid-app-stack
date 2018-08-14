
const { h } = window.hyperapp

export default (state, actions, inputs) => h('div', {className: 'list inline-labels no-hairlines-md'}, [
    h('ul', {}, inputs.map(input => h('li', {className: 'item-content item-input'}, [
        h('div', {className: 'item-inner'}, [input])
    ])))
])