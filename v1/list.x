syntax /(\[.*?\])/

empty = len 0 == 
len = `pop().length`
range = `t=pop();f=pop();Array.from({length:t-f+1}).map((_,i)=>i+f);`
map = `q=pop();l=pop();l.map(x=>exec(JSON.stringify(x)+' '+q()));null`
