"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const users = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
];

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [userData, setUserData] = useState([]);
  // const userData = [];
  const apiRequest = async (type, name) => {
    try {
      const response = await fetch(
        `https://twitch-proxy.freecodecamp.rocks/twitch-api/${type}/${name}`,
        {
          method: "GET",
        }
      );
      const streamResponse = await fetch(
        `https://twitch-proxy.freecodecamp.rocks/twitch-api/streams/${name}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("An error occured when fetching data");
      }
      const data = await response.json();
      const streamData = await streamResponse.json();
      console.log(data.display_name);

      const item = {
        name: data.display_name,
        game: data.game,
        status: data.status,
        logo: data.logo,
        isStreaming: streamData.stream,
        url: data.url,
      };

      setUserData((prevItems) => [...prevItems, item]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    users.forEach((user) => {
      apiRequest("channels", user);
    });
  }, []);

  const compare = (v1, condition) => {
    if (condition === "all") {
      return true;
    } else if (condition === "off") {
      return v1 === null;
    } else if (condition === "on") {
      return v1 !== null;
    }
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-14">
      <div id="list-card" className="w-[600px] h-[700px]">
        <header className="bg-transparent shadow-lg shadow-black border-2 border-white h-20 flex items-center">
          <p className="text-4xl text-white font-bold font-mono mx-5">
            TWITCH STREAMERS
          </p>
          <div className="content-center= text-center right-0 ml-4">
            <label className="text-white">All</label>
            <input
              type="radio"
              name="filter"
              value="all"
              onClick={() => setFilter("all")}
              checked={filter === "all"}
              onChange={() => {}}
            />
            <label className="text-red-400 ml-4">Offline</label>
            <input
              type="radio"
              name="filter"
              className="mr-4"
              value="all"
              onClick={() => setFilter("off")}
            />
            <label className="text-green-400">Online</label>
            <input
              type="radio"
              name="filter"
              value="all"
              onClick={() => setFilter("on")}
            />
          </div>
        </header>
        <div
          id="list"
          className="bg-transparent shadow-lg shadow-black border-2 border-white h-[500px] mt-4 overflow-scroll"
        >
          <ul className="text-white text-lg">
            {userData.length !== 0 ? (
              userData
                .slice()
                .sort((a, b) => {
                  if (a.isStreaming === null && b.isStreaming !== null) {
                    return 1;
                  }
                  if (a.isStreaming !== null && b.isStreaming === null) {
                    return -1;
                  }
                  return 0;
                })
                .map((user, index) =>
                  compare(user.isStreaming, filter) ? (
                    <li
                      key={index}
                      className="w-full border-2 flex p-2 items-center"
                    >
                      <Image
                        alt=""
                        width={50}
                        height={50}
                        src={user.logo}
                        className="w-14 h-14 rounded-full border-2 border-white mr-6"
                      ></Image>
                      <a
                        href={user.url}
                        className={`mr-8 hover:underline
                  ${
                    user.isStreaming !== null
                      ? "text-green-400"
                      : "text-red-400"
                  }
                  `}
                      >
                        {user.name}
                      </a>
                      <div className="w-full mr-0 line-clamp-1 text-center">
                        {user.isStreaming !== null ? (
                          <p className="text-sm">
                            {user.game} - {user.status}
                          </p>
                        ) : (
                          <p className="text-gray-500 text-sm">offline</p>
                        )}
                      </div>
                    </li>
                  ) : (
                    console.log("hello")
                  )
                )
            ) : (
              <p className="text-white text-lg m-4">Loading...</p>
            )}
          </ul>
        </div>
      </div>
    </main>
  );
}

// {userData.length !== 0
//   ? userData
//       .slice()
//       .sort((a, b) => {
//         if (a.isStreaming === null && b.isStreaming !== null) {
//           return 1;
//         }
//         if (a.isStreaming !== null && b.isStreaming === null) {
//           return -1;
//         }
//         return 0;
//       })
//       .map((user, index) =>
//       filter !== "all" && (typeof filter === typeof user.isStreaming ) ?
//         <li
//           key={index}
//           className="w-full border-2 flex p-2 items-center"
//         >
//           <Image
//             alt=""
//             width={50}
//             height={50}
//             src={user.logo}
//             className="w-14 h-14 rounded-full border-2 border-white mr-6"
//           ></Image>
//           <a
//             href={user.url}
//             className={`mr-8 hover:underline
//       ${
//         user.isStreaming !== null
//           ? "text-green-400"
//           : "text-red-400"
//       }
//       `}
//           >
//             {user.name}
//           </a>
//           <div className="w-full mr-0 line-clamp-1 text-center">
//             {user.isStreaming !== null ? (
//               <p className="text-sm">
//                 {user.game} - {user.status}
//               </p>
//             ) : (
//               <p className="text-gray-500 text-sm">offline</p>
//             )}
//           </div>
//         </li>
//        :
//         console.log("hello")

//     )
//   : <p className="text-white text-lg m-4">Loading...</p>}
