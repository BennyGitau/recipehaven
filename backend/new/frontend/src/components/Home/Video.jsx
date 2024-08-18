import React, { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons";
import {
  BiPlay,
  BiPause,
  BiArrowToRight,
  BiLeftArrowAlt,
  BiRightArrowAlt,
} from "react-icons/bi";
import { FaQuoteLeft } from "react-icons/fa";

import promo from "../../assets/video/promo.mp4";
import vidImg from "../../assets/imgs/sub1.jpg";

function PromoVideo() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState([0, 0]);
  const [currentTimeSec, setCurrentTimeSec] = useState();
  const [duration, setDuration] = useState([0, 0]);
  const [durationSec, setDurationSec] = useState();

  const sec2Min = (sec) => {
    const min = Math.floor(sec / 60);
    const secRemain = Math.floor(sec % 60);
    return {
      min: min,
      sec: secRemain,
    };
  };

  useEffect(() => {
    const { min, sec } = sec2Min(videoRef.current.duration);
    setDurationSec(videoRef.current.duration);
    setDuration([min, sec]);

    const interval = setInterval(() => {
      const { min, sec } = sec2Min(videoRef.current.currentTime);
      setCurrentTimeSec(videoRef.current.currentTime);
      setCurrentTime([min, sec]);
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = 0.1;
      videoRef.current.startTime = 3.35;
    }
  });

  return (
    <section className="w-full relative h-[85vh] bg-black z-20">
      <div className="playerContainer h-full w-full relative">
        <video
          className="videoPlayer object-cover w-full h-full border-red-600"
          // poster={img1}
          ref={videoRef}
          autoPlay
          loop
          muted
        >
          <source src={promo} type="video/mp4" />
        </video>
        <div className="controlsContainer flex absolute z-20 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="controls flex">
            {isPlaying ? (
              <button
                className="controlButton relative bg-cyan-50/95 rounded-full"
                onClick={handlePlay}
              >
                <IconContext.Provider
                  className="opacity-35"
                  value={{ color: "white", size: "12em", opacity: 0.5 }}
                >
                  <BiPause />
                </IconContext.Provider>
              </button>
            ) : (
              <button
                className="controlButton relative bg-slate-50/15 flex items-center justify-center rounded-full"
                onClick={handlePlay}
              >
                <IconContext.Provider value={{ color: "white", size: "12em" }}>
                  <span className="absolute left-2 uppercase text-xs font-bold">
                    Play
                  </span>
                  <span className="absolute left-10 flex h-[2px] w-4 bg-white"></span>
                  <BiPlay />
                </IconContext.Provider>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="absolute z-30 inset-0  flex justify-center">
        <div className="grid grid-cols-4 grid-rows-4  w-full h-full max-w-4xl xl:max-w-[73rem]">
          <div className="right pl-24 xl:pl-2 col-start-3 col-span-2 xl:col-start-4 text-white py-4">
            <div className="flex justify-between items-center w-full">
              <span className="border border-white rounded-xl px-3 py-1">
                Word on the Streets
              </span>
              <span className="text-2xl flex space-x-7">
                <BiLeftArrowAlt />
                <BiRightArrowAlt />
              </span>
            </div>
            <span className="h-[2px] w-full bg-gray-100 flex my-4" />
            <p className="relative text-xs grid gap-4 max-w-xs font-semibold">
              <FaQuoteLeft className="text-gray-800 absolute text-6xl left-3" />
              <span className="relative z-10">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Consequatur odio libero sapiente, ab molestiae nihil asperiores
                commodi optio nulla, sint in eius.
              </span>
              <span className="text-base font-semibold italic">
                Zinidine Zidane
              </span>
            </p>
          </div>
          <div className="left row-start-5 text-white py-4">
            <img
              src={vidImg}
              className="h-10 w-10 rounded-full object-cover"
              alt="vidImg"
            />
            <div className="relative w-fit border-t-2 space-y-3 mt-4 border-white">
              <p className="leading-tight text-xs max-w-[15rem] pt-4">
                Sed semper iaculis leo, at eleifend purus venenatis sed. In hac
                habitasse platea dictumst.
              </p>
              <button className="flex items-center justify-center space-x-3 font-semibold border-2 border-white rounded-xl px-3 text-sm">
                <span>All Recipes </span>
                <BiArrowToRight className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute z-20 top-0 right-0 pl-4 pb-4 h-52 w-[27.5rem] rounded-bl-2xl text-white bg-pink-200">
        <div className="h-full w-full py-5 px-2 pr-8 xl:pr-24 rounded-bl-2xl bg-black border-l border-b border-gray-100"></div>
      </div>
      <div className="absolute bottom-0 left-0 pt-4 pr-4 h-52 w-[24rem] rounded-tr-2xl text-white bg-pink-200">
        <div className="h-full w-full rounded-tr-2xl py-2 bg-green-500 pl-16"></div>
      </div>
    </section>
  );
}

export default PromoVideo;
