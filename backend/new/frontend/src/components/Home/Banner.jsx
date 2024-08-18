import React from "react";
import { motion } from "framer-motion";
import bg from "../../assets/imgs/shape3-min.png";

function Banner() {
  return (
    <section className="relative h-[75vh] w-full bg-gray-200">
      <img
        src={bg}
        alt="banner_bg"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="max-w-4xl xl:max-w-[73rem] w-full h-full bg-blue-300 mx-auto absolute top-[2rem] left-1/2 -translate-x-1/2 space-y-7 flex flex-col justify-center items-end bg-transparent">
        <div className="banner_text w-full h-fit flex justify-end items-center">
          <h1 className="w-full flex flex-col justify-items-center leading-[4rem] xl:leading-[5rem] [&_span]:font-bold [&_span]:text-right [&_span]:text-[3.8rem] xl:[&_span]:text-[5rem]">
            <span className="overflow-hidden block">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: "0.41", ease: "easeOut" }}
                className="block w-full"
              >
                Fresh Flavors, Nutritional
              </motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: "0.41",
                  ease: "easeOut",
                  delay: "0.28",
                }}
                className="block w-full"
              >
                values, ready for all{" "}
              </motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: "0.41",
                  ease: "easeOut",
                  delay: "0.48",
                }}
                className="block w-full"
              >
                your health needs
              </motion.span>
            </span>
          </h1>
        </div>

        <div className="small_text pt-5 max-w-[356px] xl:max-w-lg border-t-2 border-black">
          <p className="font-semibold tr text-sm xl:text-lg">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit. Mauris metus dui, molestie iaculis
            dolor et, malesuada fermentum diam.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Banner;
