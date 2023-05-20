"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [temp, setTemp] = useState("C");
  const [data, setData] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSuccess = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const handleError = (error) => {
    console.error("Error getting geolocation:", error);
  };

  useEffect(() => {
    const apiRequest = async () => {
      try {
        const response = await fetch(
          `https://weather-proxy.freecodecamp.rocks/api/current?lat=${latitude}&lon=${longitude}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("An error occured when fetching data");
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    };
    apiRequest();
  }, [latitude, longitude]);

  const handleTempClick = () => {
    if (temp === "C") {
      setTemp("F");
    } else {
      setTemp("C");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <p className="text-7xl text-white  ">Weather App</p>

        <div className="flex flex-col items-center w-full">
          {data && data.weather && (
            <div className="flex flex-col items-center w-full">
              <p className="text-white text-3xl mt-12">
                {data.name}, {data.sys.country}
              </p>
              <div className="mt-5 text-white text-2xl">
                {temp === "C" ? data.main.temp : (parseInt(data.main.temp * 9) / 5 + 32)}{" "}
                °
                <button
                  className="text-[#3642b4] hover:text-[#162171]"
                  onClick={handleTempClick}
                >
                  {temp}
                </button>
              </div>

              <div className="flex items-center text-white text-2xl mt-4">
                <Image
                  width={50}
                  height={50}
                  src={data.weather[0].icon}
                  alt={data.weather[0].description}
                ></Image>{" "}
                <div className=""> {data.weather[0].main}</div>
              </div>


            </div>
          )}
        </div>
      </div>
      <p className="text-white text-sm">coded by <span className="text-blue-400">m1her</span></p>
    </main>
  );
}
