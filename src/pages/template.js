import navbar from '../components/navbar/index'

const { h } = window.hyperapp

export default (state, actions, children) => h('div', {id: 'app', className: 'framework7-root'}, [
    h('div.view.view-main.view-init.ios-edges', {}, [

    ]),

    h('div', {className: 'page page-current'}, [
        navbar({title: 'App', state, actions}),
        h('div', {className: 'page-content'}, children)
    ])
])

