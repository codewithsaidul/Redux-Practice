// import Blank from "./Blank";
import { useParams } from "react-router-dom";
import { useGetMessagesQuery } from "../../../features/messages/messagesApi";
import Error from "../../ui/Error";
import Blank from "../Blank";
import ChatHead from "./ChatHead";
import Messages from "./Messages";
import Options from "./Options";

export default function ChatBody() {
  const { id } = useParams();

  const { data: messages, isLoading, isError, error } = useGetMessagesQuery(id);


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
  } else if (!isLoading && !isError && messages?.length === 0) {
    content = <Blank />;
  } else if (!isLoading && !isError && messages?.length !== 0) {
    content = (
      <>
        <ChatHead
          messages={messages[0]}
        />
        <Messages messages={messages} />
        <Options participant={messages[0]} />
      </>
    );
  }

  return (
    <div className="w-full lg:col-span-2 lg:block">
      <div className="w-full grid conversation-row-grid">
        {content}
        {/* <Blank /> */}</div>
    </div>
  );
}
