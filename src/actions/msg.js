import f7 from './f7'

export default ({title, txt}) => (state, actions) => {
    f7().notification.create({
        title: title,
        text: txt
    }).open()

    return Object.assign({}, state)
}