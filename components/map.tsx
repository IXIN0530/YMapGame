"use client"
import { LatLngExpression, Map, PopupEvent } from "leaflet";
import React, { createRef, forwardRef, RefObject, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polyline, Tooltip, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css" //必須
import Leaflet from "leaflet"
import { motion } from "framer-motion";

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

import functions from "@/functions/functions";
import axios, { all } from "axios";
import MyPopup from "./myPopup";
import { ResultType } from "@/type";
import ShowResult from "./showResult";
import { useRouter } from "next/navigation";

const [iconX, iconY] = [20, 36];
const DefaultIcon = Leaflet.icon({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerIconShadow.src,
  iconSize: [iconX, iconY],
  iconAnchor: [iconX / 2, iconY], // アイコンのオフセット
  popupAnchor: [0, -32], // ポップアップのオフセット
  shadowAnchor: [iconX / 2, iconY],
  className: "hue-rotate-150"
});
Leaflet.Marker.prototype.options.icon = DefaultIcon;

type LatLng = [number, number]

type MarkerType = {
  pos: LatLng,
  text: string,
}

type MyPopupProps = {
  text: string,
  isOpen: boolean,
}

const MyMap = () => {

  //初回マウント
  const didMount = useRef(false);

  //タイマーの残り
  const [timer, setTimer] = useState<number>(0.1);

  //現在の問題が終了したか
  const isCurrentQesEnd = useRef<boolean>(false);

  //タイマーが稼働中か
  const isTimerOn = useRef<boolean>(false);
  //現在問題をとってきているか
  const [isFetchingQes, setIsFetchingQes] = useState(false);

  //全てのマーカ-の位置
  const [allMarkerPos, setAllMarkerPos] = useState<MarkerType[]>([]);

  //mapのref
  const mapRef = useRef<Map>(null);

  //myPopupが開かれているか
  const [isMessagePop, setIsMessagePop] = useState<MyPopupProps>({ text: "", isOpen: false });

  //中心？
  const [position, setPosition] = useState<[number, number]>([35.6851, 139.752789]);

  //地図の種類
  const [isSatellite, setIsSatellite] = useState(true);

  //関数の読み込み
  const { getLatLng, extractCateg, extractNearest, distance, strDist } = functions();

  //今回のカテゴリー
  const [categ, setCateg] = useState<string>("");

  //sleep関数
  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  //過去の記録
  const results = useRef<ResultType[]>([]);

  const isEnd = useRef<boolean>(false);

  const router = useRouter();


  //タイマーをセットする関数
  const setTime = async (time: number) => {
    //タイマー同時発動を防ぐ
    await sleep(1000);
    //他のタイマーが起動している場合
    if (isTimerOn.current) {
      return;
    }
    setTimer(time);
    isTimerOn.current = true;
    while (time > 0) {
      console.log(time);
      await sleep(1000);
      if (!isTimerOn.current) break;
      setTimer((e) => e - 1);
      time--;
    }
    isTimerOn.current = false;
    //もしもタイマー切れの場合、強制的にピンを打つ
    if (!isCurrentQesEnd.current) {
      // results.current = [...results.current, { distance: 9999, name: "タイマー切れ" }];
      // setQuestion();
      router.push("/");
    }
    setTimer(0);
  }

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const Marker: MarkerType = {
          pos: [e.latlng.lat, e.latlng.lng],
          text: "選択地点"
        }
        setAllMarkerPos([Marker]);
      },
    })
    return null;
  }

  const onPushClick = async () => {
    if (mapRef.current) {

      //問題が終了してる場合
      if (isCurrentQesEnd.current) {
        return;
      }

      //まだピンが撃たれていない場合
      if (allMarkerPos.length === 0) {
        alert("ピンをうってください");
        return;
      }
      //タイマーを止める
      isTimerOn.current = false;
      isCurrentQesEnd.current = true;

      const center: { lat: number, lng: number } = { lat: allMarkerPos[0].pos[0], lng: allMarkerPos[0].pos[1] };

      // setAllMarkerPos([...allMarkerPos, center]);
      setIsSatellite(isSatellite);

      const res = await axios.get(`api/getNearShop?lat=${center.lat}&lng=${center.lng}&query=${categ}`);
      const data = res.data["data"] || [];
      //近くになかった場合
      if (data.length === 0) {
        alert("近くにありませんでした");
        results.current = [...results.current, { distance: 9999, name: categ + "(カンスト)" }];
        setTime(5);
        await sleep(6000);
        setQuestion();
        return;
      }
      const nearest = extractNearest(data);
      setPosition([nearest!.lat, nearest!.lng]);
      const nearestMarker: MarkerType = {
        pos: [nearest!.lat, nearest!.lng],
        text: nearest!.name
      }
      setAllMarkerPos([...allMarkerPos, nearestMarker]);

      mapRef.current?.setMinZoom(1);
      if (nearest) {
        console.log("nearest:", nearest);
      }
      //距離を計算(km)
      const dist = distance([center.lat, center.lng], [nearest!.lat, nearest!.lng]);
      // 近ければ素早く飛ぶようにする
      const flyDuration = 0.5;

      mapRef.current.flyToBounds([
        [nearest!.lat, nearest!.lng], [center.lat, center.lng]
      ], { duration: flyDuration })

      //待つ関数
      await sleep(flyDuration * 1000);
      alert("距離は" + strDist(dist) + "です!");
      setTime(5);
      setIsMessagePop({ text: `${nearest.name},${strDist(dist)} \n ${timer.toString().slice(-1, 0)}`, isOpen: true });
      //結果を保存
      results.current = [...results.current, { distance: dist, name: categ + "(" + nearest.name + ")" }];
      await sleep(6000);
      setQuestion();

    }
  }

  //Enterキーが押された時、Guessボタンを押す

  //問題設定関数
  const setQuestion = async () => {
    console.log(results);
    //もし3問してたら結果を表示する
    if (results.current.length >= 3) {
      setIsMessagePop({ text: " categ", isOpen: false });
      isEnd.current = true;
      return;
    }

    resetQuestion();
    setIsFetchingQes(true)
    const Res = await axios.get("/api/getRandomPos");
    const Json = await Res.data["data"];
    setIsFetchingQes(false);

    //取得できなかった場合、再度取得
    if (Json === undefined || Json.length === 0) {
      setQuestion();
      return;
    }

    const latLng = getLatLng(Json[0]);
    mapRef.current?.setView(latLng, 20);
    const categ = extractCateg(Json);
    setCateg(categ);
    setIsMessagePop({ text: categ + "を探せ！", isOpen: true });
    setTime(20);
    await sleep(21000);
    //もしもまだピンが打たれていなかったら、画面の中心に打つ
    //すでにピンが売ってあったら、そこにする。
    if (allMarkerPos.length === 0) {
      const Marker: MarkerType = {
        pos: [mapRef.current?.getCenter().lat || 0, mapRef.current?.getCenter().lng || 0],
        text: "選択地点"
      }
      setAllMarkerPos([Marker]);
    }
    //ゲームが狩猟していなかったら、onPushClickを実行
    // if (!isCurrentQesEnd.current) {
    //   await sleep(1000);
    //   onPushClick();
    // }
  }
  //問題関連をリセットする関数
  const resetQuestion = () => {
    setAllMarkerPos([]);
    setIsMessagePop({ text: "", isOpen: false });
    setCateg("");
    isCurrentQesEnd.current = false;
    mapRef.current?.setMinZoom(14);
  }
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      //ランダムな地点、ランダムなカテゴリーの取得
      setQuestion();

    }
  }, [])
  //cursor-crosshairでカーソルがGeoGuesserのようになる
  return (
    <div className="relative">
      {isEnd.current ?
        <ShowResult results={results.current} isEnd={isEnd.current} />
        : null}

      <MyPopup text={isTimerOn.current ? isMessagePop.text + timer.toString() : isMessagePop.text} isOpen={isMessagePop.isOpen} />
      <motion.button onClick={onPushClick} className=" font-bold text-white p-2 absolute bottom-2 left-1/2 z-[1000] -translate-x-1/2 rounded-3xl bg-gradient-to-b from-lime-300
       to-green-500 shadow-slate-900 shadow-md w-1/2"
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.1, ease: "easeInOut", bounce: 0.5, damping: 10 }}
        whileHover={{ scale: 0.97 }}
      >Guess</motion.button>

      <MapContainer
        center={position}
        zoom={15}
        minZoom={14}
        scrollWheelZoom={true}
        style={{ height: '100vh', width: '100vw', cursor: "crosshair" }} //必須
        ref={mapRef}
      >
        <MapEvents />
        {/* OpenStreetMap */}
        {isSatellite && !isFetchingQes ?
          <TileLayer

            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          : null}

        {/* {!isSatellite && !isFetchingQes ? <TileLayer
          url="https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg"
          attribution='&copy; <a href="https://maps.gsi.go.jp/development/ichiran.html">国土地理院</a>'
        /> : null} */}

        {allMarkerPos.map((marker, index) => {
          return (
            <div key={index}>
              <Marker position={marker.pos}>
                {/* <Popup>{markerPos.toString()}</Popup> */}
                <Tooltip direction="bottom" permanent>
                  {marker.text}
                </Tooltip>
              </Marker>
              {allMarkerPos.length === 2 ? <Polyline positions={[allMarkerPos[0].pos, allMarkerPos[1].pos]} color="black" weight={1} dashArray={"4,2"} >
              </Polyline> : null}
            </div>
          );
        })}


      </MapContainer>
    </div>
  )
}

export default MyMap;
