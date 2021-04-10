syntax('true|false')

on = () => push(true)
off = () => push(false)
yes = () => push(true)
no = () => push(false)

not = ops['!'] = () => push(!pop())
