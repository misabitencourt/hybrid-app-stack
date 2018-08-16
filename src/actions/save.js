import { save as saveTodo } from './todo'

export default target => {

    switch (target) {
        case 'todo':
            return saveTodo;
    }

    return (state, actions) => Object.assign({}, state)
}