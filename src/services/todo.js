import {save} from '../repos/idb'

export default {

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
                return reject(e);
            }
            
            return save('todos', todo).then(resolve).catch(reject)
        })
    }


}