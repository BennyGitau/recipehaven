import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { MdOutlineElectricBolt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

function ErrorPage() {
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(timer);
          navigate("/recipes");
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <>
      <section className="relative h-full w-full overflow-hidden">
        <img
          src="https://img.freepik.com/free-photo/well-done-steak-homemade-potatoes_140725-3989.jpg?t=st=1722976358~exp=1722979958~hmac=66d72c9a7f9f4f9fbbb71042768a489bb6cfa766a6736ae39a37cfaae53f6afa&w=740"
          alt="404"
          className="h-[100vh] w-full object-cover"
        />
        <div className="absolute inset-0  flex space-y-5 flex-col items-center justify-center error-page">
          <div className="header w-2/5 flex justify-center border-2 border-gray-700 rounded-lg">
            <h1 className="uppercase text-lg font-semibold text-white/25 py-2">
              404 Page Not Found
            </h1>
          </div>
          <div className="w-2/5 h-[70%] space-y-5 text-white/50 bg-black/70 drop-shadow-xl shadow-xl shadow-gray-800 rounded-2xl">
            <div className="counter flex flex-col py-2 h-fit justify-center w-4/5 mx-auto items-center ">
              <h2 className="text-[8rem]">{counter}</h2>
              <span className="flex mb-4 rounded-3xl relative w-full h-2 border border-slate-400">
                <span
                  className={clsx(
                    "bar rounded-3xl absolute inset-y-0 left-0 bg-green-600 duration-500 ease-in-out"
                  )}
                  style={{
                    right: `${(counter / 10) * 100}%`,
                  }}
                />
              </span>
              <p>Until you are transported to a safe space</p>
            </div>
            <div className="flex flex-col items-center justify-center w-4/5 mx-auto h-fit py-8 rounded-xl bg-black">
              <p>Or just take a leap of faith and jump back home</p>
              <Link
                to={"/"}
                className="bg-green-600 flex  items-center space-x-5 text-white px-8 py-2 rounded-md mt-4"
              >
                <span>Jump Back Home </span>
                <MdOutlineElectricBolt />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ErrorPage;