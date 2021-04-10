
map = ops['@>'] = () => {
    const oper = pop()
    const lst = pop()
    const results = []

    for (let x of lst) {
        push(`${JSON.stringify(x)} ${oper}`)
        ops['eval']()
        results.push(pop())
    }

    push(results)
}