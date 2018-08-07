import home from './home'
import addTodo from './add-todo'

const pages = [
    {id: 'home', mount: home},
    {id: 'add-todo', mount: addTodo}
]

export default (storage, actions) => {
    const page = pages.find(p => p.id === storage.page)
    if (! page) {
        throw new Error('Page not found')
    }

    return page.mount(storage, actions)
}