import { ScaleLoader } from "react-spinners"

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-170px)]">
        <ScaleLoader  color="#155dfc" />
    </div>
  )
}

export default Loading