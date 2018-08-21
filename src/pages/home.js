import icon from '../components/icon/index'
import list from '../components/list/index'
import button from '../components/button/index'
const { h } = window.hyperapp

export default (state, actions) => {
    let todos = state.lists.find(l => l.model === 'todos') || {}

    return h('div', {className: 'page-home', 
        oncreate: () => actions.fetch({model: 'todos'})}, [

        h('div', {className: 'block'}, [
            h('div', {className: 'row'}, [
                button(state, actions, {text: 'Add todo', onclick: () => {                    
                    actions.goTo({page: 'add-todo'})
                }})
            ])
        ]),

        list(state, actions, (todos.list || []).map(todo => ({
            title: todo.description,
            onclick: () => {
                actions.model({set: todo})
                actions.goTo({page: 'add-todo'})
            },
            after: [
                h('span', {onclick: e => {
                    e.stopPropagation()
                    actions.deleteRecord({model: 'todos', id: todo.id})
                }}, [
                    icon('delete')
                ])
            ]
        })))
    ])
}