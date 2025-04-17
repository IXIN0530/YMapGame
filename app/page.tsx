"use client"
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";


export default function Home() {
  const Map = React.useMemo(
    () =>
      dynamic(() => import("@/components/map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  return (
    <div className="mx-2 max-h-[100svh] overflow-hidden border border-black">
      <Map />
    </div>
  )
}
