const { h } = window.hyperapp

const icons = [
    {id: 'delete', getElement() {
        if (window.PLATFORM === 'android') {
            return h('i', {className: 'material-icons'}, 'delete')
        }

        return h('i', {className: 'f7-icons'}, 'delete_round')
    }},

    {id: 'back-page', getElement() {
        if (window.PLATFORM === 'android') {
            return h('i', {className: 'hidden'}, '')
        }

        return h('i', {className: 'icon icon-back'})
    }},

    {id: 'menu', getElement() {
        if (window.PLATFORM === 'android') {
            return h('i', {className: 'icon material-icons md-only'}, 'menu')
        }

        return h('i', {className: 'icon icon-menu'})
    }}
]

export default id => {
    const icon = icons.find(i => i.id === id)
    if (! icon) {
        return h('i', {className: 'hidden'}, [])
    }

    return icon.getElement()
}