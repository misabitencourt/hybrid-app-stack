import {save, list, destroy, update} from '../repos/idb'

export default {

    sort: (a, b) => {
        if (a.description > b.description) {
            return 1
        }
        if (a.description < b.description) {
            return -1
        }
        return 0
    },

    list(filters) {
        return list('todos').then(todos => {            
            if (filters) {
                return todos.filter(fileters).sort(this.sort)
            }

            return todos.sort(this.sort)
        })
    },

    validate(todo) {
        if (! todo.description) {
            throw 'Please, inform the todo description'
        }
    },

    save(todo) {
        return new Promise((resolve, reject) => {
            try {
                this.validate(todo)
            } catch (e) {
                return reject(e)
            }
            
            if (todo.id) {
                return update('todos', todo).then(resolve).catch(reject)
            }

            return save('todos', todo).then(resolve).catch(reject)
        })
    },

    destroy(id) {
        return destroy('todos', id)
    }

}