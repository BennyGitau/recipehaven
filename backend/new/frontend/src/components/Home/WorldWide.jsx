import React from "react";
import globe from "../../assets/video/globe.mp4";
import bImg from "../../assets/imgs/bg_img.png";
import { Link } from "react-router-dom";

function WorldWide() {
  return (
    <section className="relative h-fit w-full flex justify-center">
      <img src={bImg} alt="shape" className="absolute inset-0 w-full h-full" />
      <div className="relative z-20 max-w-4xl xl:max-w-[73rem] w-full h-[98vh]">
        <div className="w-full h-fit py-12 flex flex-col justify-center items-center">
          <h4 className="text-xl font-bold border border-gray-950 px-6 py-1 rounded-2xl">
            Easy to Prepare
          </h4>
          <h1 className="mt-5 font-bold grid itc text-center text-4xl xl:text-6xl">
            <span className="text-red-600">Carefully crafted</span>
            <span>tested by millions worldwide</span>
          </h1>
          <span className="my-4 h-1 w-20 flex bg-green-600 rounded-3xl" />
          <p className="max-w-md text-center xl:text-lg font-semibold">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias
            fugit labore magni ratione mollitia ex ea autem.
          </p>
        </div>
        <div className="relative w-full h-full xl:h-full grid gap-12 grid-cols-7 grid-rows-5">
          <svg
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-30 left-[56%] top-8 xl:-translate-y-16 xl:left-[59%] xl:top-24"
          >
            <path
              d="M10 150 Q 50 50, 100 150 T 190 150"
              strokeWidth="3"
              fill="transparent"
              className="stroke-green-500"
            />
            <polygon
              points="185,155 195,150 185,145"
              className="fill-green-600"
            />
            <circle
              cx="10"
              cy="150"
              r="5"
              className="animate-pulse stroke-green-500 fill-green-600"
            />
          </svg>
          <div className="card relative z-10 w-full h-full col-start-2 rounded-lg col-span-2 row-span-2 bg-red-50 overflow-hidden">
            <img
              src="https://img.freepik.com/free-photo/delicious-taco-studio_23-2151047983.jpg?t=st=1722958934~exp=1722962534~hmac=aac45c8321be84c52c9fe0d28bfcc407db586009b1cd6a03e91e02f9c35d6ba0&w=740"
              alt="recipe"
              className="rounded-lg h-[55%] xl:h-[60%] w-full"
            />
            <div className="w-full h-fit px-2">
              <span className="text-xs text-gray-500">Dairy Free</span>
              <h3 className="flex justify-between items-center font-bold uppercase text-sm text-black">
                <span>A very nice meal</span>
                <span>⭐4.5</span>
              </h3>
              <p className="w-full flex justify-between items-center border-t border-slate-900 mt-1 pt-2">
                <span className="font-bold text-red-600">35 min</span>
                <span className="space-x-2">
                  <span>💖</span>
                  <span>💬</span>
                </span>
              </p>
            </div>
          </div>
          <svg
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-30 left-[30%] top-12 -rotate-[125deg] xl:left-[33%] xl:top-20 xl:-rotate-[125deg]"
          >
            <path
              d="M10 150 Q 50 50, 100 150 T 190 150"
              strokeWidth="3"
              fill="transparent"
              className="stroke-green-500"
            />
            <polygon
              points="185,155 195,150 185,145"
              className="fill-green-600"
            />
            <circle
              cx="10"
              cy="150"
              r="5"
              className="animate-pulse stroke-green-500 fill-green-600"
            />
          </svg>
          <div className="card relative z-10 w-full h-full col-start-6 col-span-2 row-span-2 bg-red-50 overflow-hidden">
            {" "}
            <img
              src="https://img.freepik.com/free-photo/baked-chicken-wings-asian-style_2829-10158.jpg?t=st=1722959072~exp=1722962672~hmac=89bb0fcf838fe2d4699363b932cbd93d47523c5ec72bd5a1c3c1329f8861ca78&w=740"
              alt="recipe"
              className="rounded-lg h-[55%] xl:h-[60%] w-full"
            />
            <div className="w-full h-fit px-2">
              <span className="text-xs text-gray-500">Dairy Free</span>
              <h3 className="flex justify-between items-center font-bold uppercase text-sm text-black">
                <span>A very nice meal</span>
                <span>⭐4.5</span>
              </h3>
              <p className="w-full flex justify-between items-center border-t border-slate-900 mt-1 pt-2">
                <span className="font-bold text-red-600">35 min</span>
                <span className="space-x-2">
                  <span>💖</span>
                  <span>💬</span>
                </span>
              </p>
            </div>
          </div>
          <svg
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-30 left-[18%] bottom-28 -rotate-[170deg] xl:left-[23%] xl:bottom-28 xl:-rotate-[170deg]"
          >
            <path
              d="M10 150 Q 50 50, 100 150 T 190 150"
              strokeWidth="3"
              fill="transparent"
              className="stroke-green-500"
            />
            <polygon
              points="185,155 195,150 185,145"
              className="fill-green-600"
            />
            <circle
              cx="10"
              cy="150"
              r="5"
              className="animate-pulse stroke-green-500 fill-green-600"
            />
          </svg>
          <div className="card relative z-10 w-full h-full row-start-3 col-span-2 row-span-2 bg-red-50 overflow-hidden">
            {" "}
            <img
              src="https://img.freepik.com/free-photo/well-done-steak-homemade-potatoes_140725-3989.jpg?t=st=1722959108~exp=1722962708~hmac=c8f137f9867c944248e2d9165b4439830a005643c662d1701c3b34267d053677&w=740"
              alt="recipe"
              className="rounded-lg h-[55%] xl:h-[60%] w-full"
            />
            <div className="w-full h-fit px-2">
              <span className="text-xs text-gray-500">Dairy Free</span>
              <h3 className="flex justify-between items-center font-bold uppercase text-sm text-black">
                <span>A very nice meal</span>
                <span>⭐4.5</span>
              </h3>
              <p className="w-full flex justify-between items-center border-t border-slate-900 mt-1 pt-2">
                <span className="font-bold text-red-600">35 min</span>
                <span className="space-x-2">
                  <span>💖</span>
                  <span>💬</span>
                </span>
              </p>
            </div>
          </div>
          <svg
            width="200"
            height="200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute z-30 left-[62%] bottom-48 -rotate-[300deg] xl:left-[62%] xl:bottom-56 xl:-rotate-[300deg]"
          >
            <path
              d="M10 150 Q 50 50, 100 150 T 190 150"
              strokeWidth="3"
              fill="transparent"
              className="stroke-green-500"
            />
            <polygon
              points="185,155 195,150 185,145"
              className="fill-green-600"
            />
            <circle
              cx="10"
              cy="150"
              r="5"
              className="animate-pulse stroke-green-500 fill-green-600"
            />
          </svg>
          <div className="card -translate-x-6 xl:-translate-x-10 relative z-10 w-full h-full row-start-3 col-start-6 col-span-2 row-span-2 bg-red-50 overflow-hidden">
            {" "}
            <img
              src="https://img.freepik.com/free-photo/fresh-orange-juice-glass-dark-background_1150-45560.jpg?t=st=1722959127~exp=1722962727~hmac=ba4b03df3a2f28579bd7fc12b4887023cb3138cc53cb016ab8511a96a1f01a11&w=740"
              alt="recipe"
              className="rounded-lg h-[55%] xl:h-[60%] w-full"
            />
            <div className="w-full h-fit px-2">
              <span className="text-xs text-gray-500">Dairy Free</span>
              <h3 className="flex justify-between items-center font-bold uppercase text-sm text-black">
                <span>A very nice meal</span>
                <span>⭐4.5</span>
              </h3>
              <p className="w-full flex justify-between items-center border-t border-slate-900 mt-1 pt-2">
                <span className="font-bold text-red-600">35 min</span>
                <span className="space-x-2">
                  <span>💖</span>
                  <span>💬</span>
                </span>
              </p>
            </div>
          </div>
          <span className="h-32 xl:h-12 flex w-[2px] bg-blue-950 absolute bottom-20 xl:bottom-36 left-1/2 -translate-x-1/2" />

          {/* see all recipe button */}
          <Link
            to={"/recipes"}
            className="absolute bottom-12 xl:bottom-8 2xl:bottom-24 left-1/2 -translate-x-1/2 text-white bg-green-600 py-3 px-8 rounded-lg text-xl font-bold uppercase"
          >
            Checkout all our recipes <span className="text-xs">(1024)</span>
          </Link>
          {/*<div className="card w-full h-full col-span-2 row-span-2 bg-red-300 overflow-hidden"></div>
          <div className="card w-full h-full col-span-2 row-span-2 bg-red-300 overflow-hidden"></div> */}

          <video
            className="videoPlayer rounded-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[18rem] h-[18rem]  xl:w-[25rem] xl:h-[25rem] object-cover border-red-600"
            // poster={img1}
            // ref={videoRef}
            autoPlay
            loop
            muted
          >
            <source src={globe} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}

export default WorldWide;
