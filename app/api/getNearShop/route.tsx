import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const param = searchParams.get("query");

  const query = {
    appid: process.env.YAHOO_APP_ID,
    lat: lat,
    lon: lng,
    output: "json",
    results: 5,
    sort: "dist",
    query: param,
    dist: 20,
  }

  const response = await axios.get("https://map.yahooapis.jp/search/local/V1/localSearch", { params: query });
  const data: any[] = response.data["Feature"] || [];
  console.log(data);
  return NextResponse.json({ data: data });
}