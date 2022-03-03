const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.post("*", async (req, res) => {
  const { cur, des } = req.body;
  const { data } = await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${cur[0]},${cur[1]}&goal=${des[0]},${des[1]}&option=traavoidtoll`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
      },
    }
  );

  res.json({ result: data });
});

module.exports = router;
