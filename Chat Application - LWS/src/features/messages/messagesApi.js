import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: (id) =>
        `/messages?conversationId=${id}&_sort=timestamp&order=desc&page=1&limit=5`,
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        // create socket
        const socket = io("http://localhost:9000", {
          reconnectionDelay: 1000,
          reconnection: true,
          reconnectionAttemps: 10,
          transports: ["websocket"],
          agent: false,
          upgrade: false,
          rejectUnauthorized: false,
        });

        try {
          await cacheDataLoaded;
          socket.on("message", (data) => {
            const incoming = data?.data;
            
            // শুধু ওই conversation এর জন্য যদি হয়
            if (Number(incoming?.conversationId) !== Number(arg)) return;

            updateCachedData((draft) => {
              // 🔍 এখানে চেক করো ওই unique ID দিয়ে
              // console.log(incoming)
              // console.log(JSON.parse(JSON.stringify(draft)))

              const checking = draft.filter((m) => Number(m.id) === incoming.id && m.sender.email === incoming.sender.email && m.receiver.email === incoming.receiver.email);

              console.log(JSON.parse(JSON.stringify(checking)))

              // const myData = draft.filter(data => data)
              const exists = checking.some((m) => Number(m.id) === incoming.id && m.sender.email === incoming.sender.email && m.receiver.email === incoming.receiver.email);

              if (!exists) {
                draft.push(incoming); // 🟢 নতুন মেসেজ যোগ করো
              } else {
                console.log("⚠️ মেসেজ আগেই আছে, আবার যোগ করলাম না");
              }
            });
          });
        } catch (err) {}
        await cacheEntryRemoved;
        socket.close();
      },
    }),
    addMessage: builder.mutation({
      query: (data) => ({
        url: "/messages",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetMessagesQuery } = messagesApi;
