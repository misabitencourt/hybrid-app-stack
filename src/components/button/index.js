const { h } = window.hyperapp

export default (state, actions, {text, onclick, color}) => h(
    'button', 
    {
        className: `col button button-big button-outline ${color ? `color-${color}` : ''}`,
        onclick
    },
    text
)
