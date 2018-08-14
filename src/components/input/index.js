
const { h } = window.hyperapp


export default (state, actions, {type, name, placeholder}) => {

    switch (type) {
        default:
            return h('div', {className: 'item-input-wrap'}, [
                h('input', {type: 'text', placeholder, onChange: e => 
                    actions.model({prop: name, value: e.target.value})})
            ])
    }
}