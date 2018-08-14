

export default ({prop, value}) => (state, actions) => {
    state.model[prop] = value
    return Object.assign({}, state)
}