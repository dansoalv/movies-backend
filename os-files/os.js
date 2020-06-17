const os = require('os')

console.log("IP address", os.networkInterfaces().en0.map(i => i.address))
console.log("Free memory", os.freemem())
console.log("OS", os.type())
console.log("Versión ", os.release())
console.log("User", os.userInfo())