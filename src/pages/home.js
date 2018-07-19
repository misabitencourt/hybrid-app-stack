import title from '../components/title/index'
const { h } = window.hyperapp

export default (state, actions) => h('div', {className: 'page-home'}, [
    title({state, actions, children: 'Todo list'}),
])