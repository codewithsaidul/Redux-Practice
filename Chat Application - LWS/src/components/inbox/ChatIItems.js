import gravatarUrl from "gravatar-url";
import moment from "moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetConversionsQuery } from "../../features/conversations/conversationsApi";
import getPartnerInfo from "../../utils/getPartnerInfo";
import Error from "../ui/Error";
import ChatItem from "./ChatItem";

export default function ChatItems() {
  const { user } = useSelector((state) => state.auth) || {};
  const { email } = user || {};
  const {
    data: conversations,
    isLoading,
    isError,
    error,
  } = useGetConversionsQuery(email);
  

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <li className="m-2 text-center">Loading...</li>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && conversations?.length === 0) {
    content = <li className="m-2 text-center">No conversations found!</li>;
  } else if (!isLoading && !isError && conversations?.length !== 0) {
    content = conversations.map((conversation) => {
      const { id, message, timestamp } = conversation;
      const { name, email: partnerEmail } = getPartnerInfo(
        email,
        conversation?.users
      );

      const senderEmail = conversation.participants.split("-")[0];

      const sender = conversation.users.find((user) => user.email === senderEmail);
      const senderName = sender?.email !== partnerEmail ? "You" : sender?.name.split(" ")[0]


      return (
        <li key={id}>
          <Link to={`/inbox/${id}`}>
            <ChatItem
              avatar={gravatarUrl(partnerEmail, {
                size: 80,
              })}
              name={name}
              lastMessage={message}
              lastTime={moment(timestamp).fromNow()}
              senderName={senderName}
            />
          </Link>
        </li>
      );
    });
  }

  return <ul>{content}</ul>;
}
