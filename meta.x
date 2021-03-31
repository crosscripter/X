# Metaprogramming Helpers

locals = `let depth=pop();
         let locals=[];
         for (let i=depth; i > 0; i--)
             locals.push(stack[stack.length - i]);
         locals`
