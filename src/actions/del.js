import todoSrv from '../services/todo'

export default ({model, id}) => (state, actions) => {
    switch (model) {
        case 'todos':
            todoSrv.destroy(id).then(() => actions.fetch({model: 'todos'}))
            return Object.assign({}, state)
        default:
            return Object.assign({}, state)
    }
}