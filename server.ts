import express, { Response, Request, Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();


const app: Express = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
  }));
// app.use(express.json());

app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "route is up" });
});

app.post("/api/calculate", (req: Request, res: Response) => {
  const { amount, months, insurance } = req.body;
  
  if(!amount || !months || (amount < 20000 || amount > 800000) || (months < 24 || months > 96)) {
    return res.status(400).json({msg: "you should choose valid amount and months"})
  }

  // for every year we will raise fee by 6%
  
  const timeInYears = Math.ceil(months / 12) > 0 ? Math.ceil(months / 12) : 1
  const percentage = insurance ? 4 * timeInYears : 6 * timeInYears;
  const installment = (amount / months) + (amount / months ) * (percentage / 100);

  return res
    .status(201)
    .json({installment: installment});
});

app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
