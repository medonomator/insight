import { logger } from "../helpers/logger";
import TelegramBot from "../helpers/telegramBotLauncher";
import axios from "axios";
import * as cheerio from "cheerio";
import { uniq } from "lodash";

export const globalPostInfoToTelegramBot = async () => {
  try {
    const dzerjinsk = await axios.get("https://world-weather.ru/pogoda/russia/dzerzhinsk/");
    const gelendjik = await axios.get("https://www.gismeteo.ru/weather-gelendzhik-5213/");

    let $ = cheerio.load(dzerjinsk.data);
    $("#weather-now-number span").remove();
    let data: any = $("#weather-now-number").html();
    let temp = uniq(data.split(" "));
    let temperature = temp[temp.length - 1];

    TelegramBot.sendMessage(`Температура в Дзержинске: ${temperature}`);

    $ = cheerio.load(gelendjik.data);
    $(".tab-weather__value_m").remove()
    data = $(".tab-weather__value_l").html();
    temp = uniq(data.split(" "));
    temperature = temp[temp.length - 1];

    TelegramBot.sendMessage(`Температура в Геленджике: ${temperature}`);
  } catch (error) {
    logger.error(error);
  }
};
