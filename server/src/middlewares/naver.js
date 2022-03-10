const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.post("/direction", async (req, res) => {
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
  res.json({ result: data.route?.traavoidtoll[0] });
});

router.post("/coordToAdd", async (req, res) => {
  const { lat, lon } = req.body;
  const result = await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?request=coordsToaddr&coords=${lon},${lat}&orders=legalcode,roadaddr&output=json`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
      },
    }
  );

  if (result.data.status.code === 3) {
    res.json({ result: "결과없음" });
  } else {
    if (result.data.results.length === 1) {
      const { area1, area2, area3, area4 } = result.data.results[0].region;
      const address = [area1.name, area2.name, area3.name, area4.name]
        .filter((word) => word !== "")
        .join(" ");
      res.json({ address: address });
    } else {
      const { area1, area2, area3, area4 } = result.data.results[1].region;
      const { name, number1, number2 } = result.data.results[1].land;
      const address = [
        area1.name,
        area2.name,
        area3.name,
        area4.name,
        name,
        number1,
        number2,
      ]
        .filter((word) => word !== "")
        .join(" ");
      res.json({ address: address });
    }
  }
});

router.post("/addToCoord", async (req, res) => {
  const { address } = req.body;
  const result = await axios.get(
    `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${encodeURI(
      address
    )}`,
    {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.NAVER_CLIENT_SECRET,
      },
    }
  );
  const { x, y } = result.data.addresses[0];
  res.json({ lat: y, lon: x });
});

module.exports = router;
