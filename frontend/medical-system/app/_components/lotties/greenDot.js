"use client";

import React from "react";
import Lottie from "react-lottie-player";
import greenDot from "@/public/greenDot.json";

export default function GreenDotAnimation() {
  return (
    <Lottie
      loop
      animationData={greenDot}
      play
      style={{ width: 30, height: 30 }}
    />
  );
}
