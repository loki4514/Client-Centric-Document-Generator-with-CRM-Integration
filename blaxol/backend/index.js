const connectToMongo = require('./db')
connectToMongo()
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.json())
app.use(cors())
// Modularize the router importing a routers from different modules
app.use('/api/admin',require('./routes/admin'))
app.use('/api/user',require('./routes/user'))
app.use('/api/simple',require('./routes/simple'))



app.listen(port, () => {
  console.log(`Blaxol backend app listening on port ${port}`)
})