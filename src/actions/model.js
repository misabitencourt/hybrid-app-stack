

export default ({prop, value, set}) => (state, actions) => {
    if (set) {
        state.model = set
        return Object.assign({}, state)    
    }

    state.model[prop] = value
    
    return Object.assign({}, state)
}