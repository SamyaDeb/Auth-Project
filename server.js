import express from "express"
import cors from "cors"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"

const app = express()
const port = process.env.PORT || 4000
connectDB();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: [
    // 'https://auth-app-frontend-3nzq.onrender.com',
    'https://auth-app-delta-three.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

//API Endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
