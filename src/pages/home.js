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
                button(state, actions, {text: 'Add todo', onclick: () => actions.goTo({page: 'add-todo'})})
            ])
        ]),

        list(state, actions, (todos.list || []).map(todo => ({
            title: todo.description,
            onclick: () => console.log('TODO...'),
            after: [
                h('span', {}, [icon('delete')])
            ]
        })))
    ])
}