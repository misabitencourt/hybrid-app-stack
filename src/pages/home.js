import list from '../components/list/index'
import button from '../components/button/index'
const { h } = window.hyperapp

export default (state, actions) => h('div', {className: 'page-home'}, [
    h('div', {className: 'block'}, [
        h('div', {className: 'row'}, [
            button(state, actions, {text: 'Add todo', onclick: () => actions.goTo({page: 'add-todo'})})
        ])
    ]),    
    list(state, actions, (state.lists.todo || []).map(todo => ({
        title: todo.description,
        onclick: () => console.log('TODO...')
    })))
])