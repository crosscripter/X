require('fs').readdirSync('./lib').forEach(file => {
    if (file.endsWith('.js') && file !== 'index.js') {
        // console.log('lib:', file)
        require(`./${file}`)
    }
})