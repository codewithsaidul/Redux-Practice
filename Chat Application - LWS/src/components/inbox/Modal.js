import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  conversationsApi,
  useAddConversionMutation,
  useEditConversionMutation,
} from "../../features/conversations/conversationsApi";
import { useGetUsersQuery } from "../../features/users/usersApi";
import isValidEmail from "../../utils/isValidEmail";
import Error from "../ui/Error";

export default function Modal({ open, control }) {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState(undefined);
  const [responseError, setResponseError] = useState("");
  const [checkUser, setCheckUser] = useState(false);
  const dispatch = useDispatch();

  const { user: loggedInUser } = useSelector((state) => state.auth) || {};
  const { email: myEmail } = loggedInUser || {};

  const { data: participant } = useGetUsersQuery(to, {
    skip: !checkUser,
  });

  const [addConversion, { isSuccess: isAddConversationsSuccess }] =
    useAddConversionMutation();
  const [editConversion, { isSuccess: isEditConversationsSuccess }] =
    useEditConversionMutation();

  useEffect(() => {
    const isAviableParticipent = participant?.length > 0;
    if (isAviableParticipent && participant[0]?.email !== myEmail) {
      // check conversations exist or not
      dispatch(
        conversationsApi.endpoints.getConversation.initiate({
          userEmail: myEmail,
          participantEmail: to,
        })
      )
        .unwrap()
        .then((data) => setConversations(data))
        .catch(() => {
          setResponseError("There was a problem!");
        });
    }
  }, [participant, myEmail, dispatch, to]);

  // check add conversations success or edit conversations success
  useEffect(() => {
    if (isAddConversationsSuccess || isEditConversationsSuccess) {
      control();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddConversationsSuccess, isEditConversationsSuccess]);

  const debounceHandler = (fn, delay) => {
    let timeOutId;

    return (...args) => {
      clearInterval(timeOutId);

      timeOutId = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  const doSearch = (value) => {
    if (isValidEmail(value)) {
      // check user api
      setTo(value);
      setCheckUser(true);
    }
  };

  const handleSearch = debounceHandler(doSearch, 500);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (conversations.length > 0) {
      console.log(conversations[0]);
      editConversion({
        id: conversations[0]?.id,
        sender: myEmail,
        data: {
          participant: `${myEmail}-${participant[0]?.email}`,
          users: [
            loggedInUser,
            {
              email: participant[0]?.email,
              name: participant[0]?.name,
              id: participant[0]?.id,
            },
          ],
          message,
          timestamp: new Date().getTime(),
        },
      });
    } else if (conversations.length === 0) {
      addConversion({
        sender: myEmail,
        data: {
          participants: `${myEmail}-${participant[0]?.email}`,
          users: [
            loggedInUser,
            {
              email: participant[0]?.email,
              name: participant[0]?.name,
              id: participant[0]?.id,
            },
          ],
          message,
          timestamp: new Date().getTime(),
        },
      });
    }
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Send message
          </h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <input
                  id="to"
                  name="to"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Send to"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  conversations === undefined ||
                  (participant?.length > 0 && participant[0]?.email === myEmail)
                }
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:bg-violet-400 disabled:hover:bg-violet-300 disabled:focus:bg-violet-300"
              >
                Send Message
              </button>
            </div>

            {participant?.length === 0 && (
              <Error message="This User doesn't found!" />
            )}
            {participant?.length > 0 && participant[0]?.email === myEmail && (
              <Error message="You cann't message to yourself!" />
            )}

            {responseError && <Error message={responseError} />}
          </form>
        </div>
      </>
    )
  );
}
