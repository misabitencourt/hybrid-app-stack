import todoSrv from '../services/todo'

export default ({model, list, filters}) => (state, actions) => {
    if (model && list) {
        const modelList = state.lists.find(list => list.model === model)
        if (modelList) {
            modelList.list = list
        } else {
            state.lists.push({model, list})
        }

        return Object.assign({}, state)
    }

    switch (model) {
        case 'todos':
            todoSrv.list(filters).then(todos => {
                actions.fetch({model, list: todos})
            })
        default:
            return Object.assign({}, state)
    }
}