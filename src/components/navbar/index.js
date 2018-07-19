import icon from '../icon/index'
const { h } = window.hyperapp

export default ({title='App', rightChildren='', state, actions}) => h('div', {className: 'navbar'}, [
    h('div', {className: 'navbar-inner'}, [
        h('div', {className: 'left', 'data-panel': 'left'}, [
            h('a', {href: 'javascript:;', className: 'link icon-only panel-open'}, [
                icon('menu')
            ])
        ]),

        h('div', {className: 'title sliding'}, title),

        h('div', {className: 'right', 'data-panel': 'right'}, rightChildren)
    ])
])

