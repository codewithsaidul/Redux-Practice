import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteImage from "../../assets/delete.svg";
import editImage from "../../assets/edit.svg";
import { useDeleteVideoMutation } from "../../feature/api/apiSlice";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";

export default function Description({
  id,
  title,
  description,
  date,
  isLoading,
}) {

  const [deleteVideo, { isSuccess }] = useDeleteVideoMutation();
  const navigate = useNavigate()

  const handleDelete = () => {
    if (id) deleteVideo(id)
  }


  useEffect(() => {
    if (isSuccess) navigate("/")
  }, [navigate, isSuccess])

  // check what to render
  let content = null;

  if (isLoading) {
    content = <DescriptionLoader />;
  }

  if (!isLoading && id) {
    content = (
      <>
        <h1 className="text-lg font-semibold tracking-tight text-slate-800">
          {title}
        </h1>
        <div className="pb-4 flex items-center space-between border-b gap-4">
          <h2 className="text-sm leading-[1.7142857] text-slate-600 w-full">
            Uploaded on {date}
          </h2>

          <div className="flex gap-6 w-full justify-end">
            <div className="flex gap-1">
              <div className="shrink-0">
                <img className="w-5 block" src={editImage} alt="Edit" />
              </div>
              <Link to={`/videos/edit/${id}`}>
                <span className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                  Edit
                </span>
              </Link>
            </div>
            <div onClick={handleDelete} className="flex gap-1">
              <div className="shrink-0">
                <img className="w-5 block" src={deleteImage} alt="Delete" />
              </div>
              <div className="text-sm leading-[1.7142857] text-slate-600 cursor-pointer">
                Delete
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-sm text-[#334155] dark:text-slate-400">
          {description}
        </div>
      </>
    );
  }

  return (
    <div>
      {content}
    </div>
  );
}
