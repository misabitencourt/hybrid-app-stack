const { h } = window.hyperapp

export default (state, actions, {text, onclick}) => h(
    'button', 
    {
        className: 'col button button-big button-outline',
        onclick
    },
    text
)
