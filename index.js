const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const chickenSoup = ["每一天都是新的開始。", "越努力，越幸運。", "你是最棒的。"]; // 自行補齊至15句
const poison = ["努力不一定成功，但放棄很舒服。", "你不是胖，是骨架大。", "醒醒吧。"]; // 自行補齊至15句

app.post('/', async (req, res) => {
    const events = req.body.events;
    for (let event of events) {
        if (event.type === 'message') {
            const all = [...chickenSoup, ...poison];
            const msg = all[Math.floor(Math.random() * all.length)];
            
            await axios.post('https://api.line.me/v2/bot/message/reply', {
                replyToken: event.replyToken,
                messages: [{ type: 'text', text: msg }]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
                }
            });
        }
    }
    res.sendStatus(200);
});

app.listen(process.env.PORT || 3000);
