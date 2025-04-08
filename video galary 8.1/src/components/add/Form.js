// import Success from "../ui/Success";
import axios from "axios";
import { useState } from "react";
import { useAddVideoMutation } from "../../feature/api/apiSlice";
import Error from "../ui/Error";
import Success from "../ui/Success";
import TextArea from "../ui/TextArea";
import TextInput from "../ui/TextInput";

export default function Form() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [date, setDate] = useState("");
  const [views, setViews] = useState("");
  const [duration, setDuration] = useState("");
  const [file, setFile] = useState("");

  const [addVideo, { isLoading, isError, isSuccess }] =
    useAddVideoMutation();

  //  ============== Reset Form Fucntion
  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
    setVideoLink("");
    setDate("");
    setViews("");
    setDuration("");
    setFile("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file); // ফাইল ডাটা
    formData.append("upload_preset", "practice_preset"); // Cloudinary Upload Preset
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    // file processing
    try {
      if (file === "") {
        return;
      }
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
        formData
      );
      const secrueUrl = response.data.secure_url;

      await addVideo({
        title,
        author,
        description,
        link: videoLink,
        thumbnail: secrueUrl,
        date,
        views,
        duration,
      });

      resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="#" method="POST">
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Video Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <TextInput
                title="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextArea
                title="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="YouTube Video link"
                value={videoLink}
                onChange={(e) => setVideoLink(e.target.value)}
              />
            </div>

            <div className="col-span-6">
              <TextInput
                title="Thumbnail link"
                type="file"
                value={file}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
              <TextInput
                title="Upload Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <TextInput
                title="Video no of views"
                value={views}
                onChange={(e) => setViews(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            disabled={isLoading}
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-indigo-500"
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>

        {isSuccess && <Success message="Video was added successfully" />}
        {isError && <Error message="There was an Error" />}
      </div>
    </form>
  );
}
