import service from '../services/todo'

export const save = (state, actions) => service.save(state.model).then(() => {
    actions.msg({title: 'Info', txt: 'Todo saved'})
    actions.goTo({page: 'home'})
    actions.fetch({model: 'todos'})
}).catch(err => actions.msg({title: 'Error', txt: err}))