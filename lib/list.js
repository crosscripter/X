
syntax(`\\[(.*?)\\]`) 

len = ops['@$'] = () => push(pop().length)
list = ops['@'] = () => (str(), push(pop().split(',')))

