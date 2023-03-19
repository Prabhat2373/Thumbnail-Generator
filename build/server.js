"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: './.env',
});
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const configuration = new openai_1.Configuration({
    organization: 'org-yYM0HNzVBWoCWNgj7clt0bRJ',
    apiKey: process.env.OPENAI_API_KEY,
});
app.get('/', async (req, res) => {
    try {
        const openai = new openai_1.OpenAIApi(configuration);
        const response = await openai.createImage({
            prompt: 'make a youtube tumbnail for gaming with valorant',
            size: '1024x1024',
            n: 2,
        });
        console.log('response', response);
        // const imgResponse = await fetch('https://api.openai.com/v1/images/generations0')
        // res.status(200).send(circular.stringify(response));
    }
    catch (error) {
        res.status(400).json({
            status: 'BAD REQUEST',
            message: error === null || error === void 0 ? void 0 : error.message,
        });
    }
});
app.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
});
