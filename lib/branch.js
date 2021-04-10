
ops['if'] = ops['?'] = () => {
    let f = pop()
    let t = pop()
    let c = pop()
    push(JSON.stringify(c ? t : f))
    ops['eval']()
}

ops['case'] = ops['->'] = () => {
    let expr = pop()
    let cases = pop()
    if (!cases[expr]) throw 'Unmatched case'
    push(JSON.stringify(cases[expr]))
    ops['eval']()
}