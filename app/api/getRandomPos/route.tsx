import allLocationList from "@/components/allLocationList";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const url = "https://map.yahooapis.jp/search/local/V1/localSearch"
  const appid = process.env.YAHOO_APP_ID;
  const ac = allLocationList[Math.floor(Math.random() * allLocationList.length)];
  const start = Math.floor(Math.random() * 200);
  // const acc = 13106

  //クエリの作成
  const query = {
    appid: appid,
    ac: ac,
    output: "json",
    results: 100,
    start: start,
  }

  //axiosでリクエスト(jsonで返ってくる)
  const response = await axios.get(url, { params: query });
  const data: any[] = response.data["Feature"];
  console.log(data);

  return NextResponse.json({ data: data });
}