import express from "express"
import usuarioRoutes from "./routes/usuario.routes.js"
import ticketRoutes from "./routes/ticket.routes.js"
import swaggerJSDocV1 from './swagger.js'
import cors from 'cors'

const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json())

app.use("/api/v1", usuarioRoutes)
app.use("/api/v1", ticketRoutes)

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`)
  swaggerJSDocV1(app, PORT)
})
