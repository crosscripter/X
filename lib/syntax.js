_syntax = new RegExp(``, 'i')
_delimiters = new RegExp(`(?:[^\\s\\'\\"\\[\\]\\{\\}]+|\\'[^\\']*\\'|\\"[^\\"]*\\"|\\[.*\\]|\\{.*\\})+`, 'g') 

splitd = text => text.match(_delimiters) || [] 
syntax = re => _syntax = new RegExp(`${_syntax.toString().slice(1,-1)}|${re}`)
