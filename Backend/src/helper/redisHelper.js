// import redis from "redis";

// const client = redis.createClient({
//   url: process.env.REDIS_URL || "redis://localhost:6379",
//   socket: {
//     reconnectStrategy: false, // ✅ Stops auto-reconnect spam errors
//   },
// });

// let redisConnected = false;

// client.connect().catch(() => {}); // ✅ Prevents unhandled promise rejection

// client.on("error", (err) => {
//   if (redisConnected) {
//     redisConnected = false;
//     console.log("Redis Error:", err.message);
//   }
// });

// client.on("connect", () => {
//   redisConnected = true;
//   console.log("Redis Connected");
// });

// const setJWT = (key, value) => {
//   if (!redisConnected) return Promise.resolve(); // ✅ Skip if Redis not connected
//   return new Promise((resolve, reject) => {
//     try {
//       client.set(key, value, (err, res) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(res);
//         }
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getJWT = (key) => {
//   if (!redisConnected) return Promise.resolve(null); // ✅ Skip if Redis not connected
//   return new Promise((resolve, reject) => {
//     try {
//       client.get(key, (err, res) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(res); // ✅ Added: missing resolve on success
//         }
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const deleteJWT = (key) => {
//   if (!redisConnected) return Promise.resolve(); // ✅ Added: skip if Redis not connected
//   return new Promise((resolve, reject) => {
//     // ✅ Fixed: added Promise wrapper
//     try {
//       client.del(key, (err, res) => {
//         // ✅ Fixed: added callback
//         if (err) {
//           reject(err);
//         } else {
//           resolve(res);
//         }
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// export { setJWT, getJWT, deleteJWT }; // ✅ All three functions exported

import redis from "redis";

const client = redis.createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
  socket: {
    reconnectStrategy: false,
  },
});

let redisConnected = false;

client.connect().catch(() => {});

client.on("error", (err) => {
  if (redisConnected) {
    redisConnected = false;
    console.log("Redis Error:", err.message);
  }
});

client.on("connect", () => {
  redisConnected = true;
  console.log("Redis Connected");
});

// ✅ FIXED: async/await, no callbacks
const setJWT = async (key, value) => {
  if (!redisConnected) return null;
  return await client.set(key, value);
};

const getJWT = async (key) => {
  if (!redisConnected) return null;
  return await client.get(key);
};

const deleteJWT = async (key) => {
  if (!redisConnected) return null;
  return await client.del(key);
};

export { setJWT, getJWT, deleteJWT };
