import { apiSlice } from "../api/apiSlice";
import { messagesApi } from "../messages/messagesApi";

export const conversationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversions: builder.query({
      query: (email) =>
        `/conversations?participants_like=${email}&_sort=timestamp&_order=desc&_page=1&_limit=5`,
    }),
    getConversation: builder.query({
      query: ({ userEmail, participantEmail }) =>
        `/conversations?participants_like=${userEmail}-${participantEmail}&&participants_like=${participantEmail}-${userEmail}`,
    }),
    addConversion: builder.mutation({
      query: ({sender, data}) => ({
        url: "/conversations",
        method: "POST",
        body: data
      }),
      async onQueryStarted (arg, { queryFulfilled, dispatch}) {
        const conversation = await queryFulfilled;

        if (conversation?.data?.id) {

          // slient entry to message table
          const users = arg?.data?.users;
          const senderUser = users.find(user => user.email === arg?.sender)
          const receiverUser = users.find(user => user.email !== arg?.sender)

          dispatch(messagesApi.endpoints.addMessage.initiate({
            conversationId: conversation?.data?.id,
            sender: senderUser,
            receiver: receiverUser,
            message: arg?.data?.message,
            timestamp: arg?.data?.timestamp
          }))
        }
      }
    }),
    editConversion: builder.mutation({
      query: ({id, sender, data}) => ( {
        
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data
      }),
      async onQueryStarted (arg, { queryFulfilled, dispatch}) {
        const conversation = await queryFulfilled;

        if (conversation?.data?.id) {

          // slient entry to message table
          const users = arg?.data?.users;
          const senderUser = users.find(user => user.email === arg?.sender)
          const receiverUser = users.find(user => user.email !== arg?.sender)

          dispatch(messagesApi.endpoints.addMessage.initiate({
            conversationId: conversation?.data?.id,
            sender: senderUser,
            receiver: receiverUser,
            message: arg?.data?.message,
            timestamp: arg?.data?.timestamp
          }))
        }
      }
    }),
  }),
});

export const { useGetConversionsQuery, useGetConversationQuery, useAddConversionMutation, useEditConversionMutation } = conversationsApi;
