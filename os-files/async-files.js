const fs = require('fs')


const file = process.argv[2]
const content = fs.readFile(file, (err, content)=>{
    if(err){
        return console.log(err)
    }

    const lines = content.toString().split('\n').length
    console.log(lines)
})

