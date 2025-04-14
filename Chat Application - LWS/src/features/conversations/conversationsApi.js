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
      query: ({ sender, data }) => ({
        url: "/conversations",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // client side optimistic update start
        const tempId = `temp-${Date.now()}`;
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getConversions",
            arg?.sender,
            (draft) => {
              const tempData = {
                ...arg.data,
                id: tempId, // temporary ID (ফেক ID)
                timestamp: arg?.data?.timestamp, // আগের timestamp রাখা
              };
              draft.unshift(tempData);
            }
          )
        );
        // client side optimistic update end

        try {
          const conversation = await queryFulfilled;

          if (conversation?.data?.id) {
            // slient entry to message table
            const users = arg?.data?.users;
            const senderUser = users.find((user) => user.email === arg?.sender);
            const receiverUser = users.find(
              (user) => user.email !== arg?.sender
            );

            dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg?.data?.message,
                timestamp: arg?.data?.timestamp,
              })
            );

            const updatedConversation = {
              ...arg.data,
              id: conversation.data.id, // Replace temp ID with real ID
              timestamp: arg?.data?.timestamp, // Keep the original timestamp
            };

            dispatch(
              apiSlice.util.updateQueryData(
                "getConversions",
                arg?.sender,
                (draft) => {
                  const index = draft.findIndex((conv) => conv.id === tempId); // Find the temporary ID
                  if (index !== -1) {
                    draft[index] = updatedConversation; // Replace the optimistic entry with the real one
                  }
                }
              )
            );
          }
        } catch (err) {
          patchResult.undo();
        }
      },
    }),

    editConversion: builder.mutation({
      query: ({ id, sender, data }) => ({
        url: `/conversations/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        // client side optimistic update start
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getConversions",
            arg?.sender,
            (draft) => {
              // eslint-disable-next-line eqeqeq
              const draftConversation = draft.find((c) => c.id == arg?.id);
              draftConversation.sender = arg?.data?.sender;
              draftConversation.message = arg?.data?.message;
              draftConversation.timestamp = arg?.data?.timestamp;

              // Sort by timestamp after updating
              draft.sort(
                (a, b) => b.timestamp - a.timestamp
              );
            }
          )
        );
        // client side optimistic update end

        try {
          const conversation = await queryFulfilled;

          if (conversation?.data?.id) {
            // slient entry to message table
            const users = arg?.data?.users;
            const senderUser = users.find((user) => user.email === arg?.sender);
            const receiverUser = users.find(
              (user) => user.email !== arg?.sender
            );

            const res = await dispatch(
              messagesApi.endpoints.addMessage.initiate({
                conversationId: conversation?.data?.id,
                sender: senderUser,
                receiver: receiverUser,
                message: arg?.data?.message,
                timestamp: arg?.data?.timestamp,
              })
            ).unwrap();

            // update messages cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                res?.conversationId.toString(),
                (draft) => {
                  draft.unshift(res);
                }
              )
            );
            // update messages cache pessimistically end
          }
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetConversionsQuery,
  useGetConversationQuery,
  useAddConversionMutation,
  useEditConversionMutation,
} = conversationsApi;
