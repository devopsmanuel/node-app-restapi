import express from "express"
import usuarioRoutes from "./routes/usuario.routes.js"
import ticketRoutes from "./routes/ticket.routes.js"

const app = express()

const PORT = 3000

app.use(express.json())

app.use("/api", usuarioRoutes)
app.use("/api", ticketRoutes)

app.listen(PORT)
console.log(`Server on port: ${PORT}`)