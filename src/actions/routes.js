
export const goTo = ({page}) => (state, actions) => {
    state.prevPage.push(state.page)
    state.page = page
    return Object.assign({}, state)
}