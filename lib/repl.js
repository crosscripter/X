cls = () => setTimeout(() => console.clear(), 1)

repl = () => {
    with (require('readline').createInterface(process.stdin, process.stdout)) {
        cls()
        setPrompt('')

        on('line', line => { 
            if (!line) return prompt()
            try { 
                run(line)
                if (!/^#/.test(line) && line !== 'dump') dump()
            } catch (e) { 
                log(e)
            }
            prompt() 
        })

        prompt()
    }
}