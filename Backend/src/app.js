const express = require('express');
const cors = require("cors")
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())


const authRoutes = require('./routes/auth.routes')
const favoriteRoutes = require("./routes/favorite.routes")
const historyRoutes = require("./routes/history.routes")
const adminRoutes = require("./routes/admin.routes")
app.use("/api/auth", authRoutes)
app.use('/api/favorites', favoriteRoutes);
app.use('/api/history', historyRoutes)
app.use('/api/admin', adminRoutes)

module.exports = app