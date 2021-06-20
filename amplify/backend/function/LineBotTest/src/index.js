"use strict";
const line = require("@line/bot-sdk");
const puppeteer = require("puppeteer-core");
const crypto = require("crypto");
// const puppeteer = require("puppeteer");
const chromium = require("chrome-aws-lambda");
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });

const getRestaurantsInfoFromTabelog = async (input) => {
  try {
    console.log("インプット", input);
    const words = input.replace("　", " ").split(" ");
    const place = words[0].trim();
    const food = words[1].trim();
    console.log("場所:", place);
    console.log("ジャンル:", food);
    const browser = await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.goto("https://tabelog.com/");
    await page.type('input[name="sa"]', place);
    await page.type('input[name="sk"]', food);
    page.click('button[name="form_submit"]');
    await page.waitForNavigation();
    const rankLink = await page.evaluate(() => {
      return document.querySelector(".navi-rstlst__label--rank").href;
    });
    await page.goto(rankLink);
    const restaurantInfos = await page.evaluate(() => {
      const restaurants = document.querySelectorAll(".list-rst");
      const infos = [];
      restaurants.forEach((r) => {
        infos.push({
          name: r.querySelector(".cpy-rst-name").innerText,
          genre: r.querySelector(".cpy-area-genre").innerText,
          score: r.querySelector(".c-rating__val").innerText,
          url: r.querySelector(".cpy-rst-name").href,
        });
      });
      return infos;
    });
    await browser.close();
    console.log(restaurantInfos);
    return restaurantInfos;
  } catch (e) {
    console.log(e);
    return [{ name: "error" }];
  }
};

exports.handler = async function (event, context) {
  let signature = crypto
    .createHmac("sha256", process.env.CHANNELSECRET)
    .update(event.body)
    .digest("base64");
  let checkHeader = (event.headers || {})["x-line-signature"];
  let body = JSON.parse(event.body);
  // リクエストヘッダーを認証
  if (signature === checkHeader) {
    if (body.events[0].replyToken === "00000000000000000000000000000000") {
      //接続確認エラー回避
      let lambdaResponse = {
        statusCode: 200,
        headers: { "X-Line-Status": "OK" },
        body: '{"result":"connect check"}',
      };
      context.succeed(lambdaResponse);
    } else {
      let input = body.events[0].message.text;
      const restaurantInfos = await getRestaurantsInfoFromTabelog(input);
      let text = "";
      restaurantInfos.forEach((r) => {
        const info = `${r.name}
評価点: ${r.score}
${r.url}

`;
        text += info;
      });
      const message = {
        type: "text",
        text: text,
      };
      await client
        .replyMessage(body.events[0].replyToken, message)
        .then((response) => {
          let lambdaResponse = {
            statusCode: 200,
            headers: { "X-Line-Status": "OK" },
            body: '{"result":"completed"}',
          };
          context.succeed(lambdaResponse);
        })
        .catch((err) => console.log(err));
    }
  } else {
    console.log("署名認証エラー");
  }
};
