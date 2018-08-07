const { h } = window.hyperapp

export default (state, actions, items) => h('div', {className: 'list sample-list'}, [
    h('ul', {}, items.map(item => {
        return h('li', { onclick: item.onclick }, item.title)
    }))
])

