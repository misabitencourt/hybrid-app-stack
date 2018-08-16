import title from '../components/title/index'
import button from '../components/button/index'
import input from '../components/input/index'
import form from '../components/form/index'
const { h } = window.hyperapp

export default (state, actions) => h('div', {className: 'page-home'}, [
    title({state, actions, hasSearchBar: false, children: 'Create todo'}),

    form(state, actions, [
        input(state, actions, {type: 'text', name: 'description', placeholder: 'Todo'})
    ]),

    h('div', {className: 'block'}, [
        button(state, actions, {text: 'Save', onclick: () => actions.save('todo')})
    ])
])