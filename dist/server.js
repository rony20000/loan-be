"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
// app.use(express.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    return res.status(200).json({ msg: "route is up" });
});
app.post("/api/calculate", (req, res) => {
    const { amount, months, insurance } = req.body;
    if (!amount || !months || (amount < 20000 || amount > 800000) || (months < 24 || months > 96)) {
        return res.status(400).json({ msg: "you should choose valid amount and months" });
    }
    // for every year we will raise fee by 6%
    const timeInYears = Math.ceil(months / 12) > 0 ? Math.ceil(months / 12) : 1;
    const percentage = insurance ? 4 * timeInYears : 6 * timeInYears;
    const installment = (amount / months) + (amount / months) * (percentage / 100);
    return res
        .status(201)
        .json({ installment: installment });
});
app.listen(port, () => {
    console.log(`server is up on port ${port}`);
});
