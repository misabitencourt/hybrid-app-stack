const { h } = window.hyperapp

export default ({state, actions, hasSearchBar, children}) => 
    h('div', {className: `block-title ${hasSearchBar ? 'searchbar-found' : ''}`}, children)