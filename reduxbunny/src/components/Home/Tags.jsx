import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagsAsync } from "../../redux/features/tags/tagSlice";
import Tag from "./Tag";

const Tags = () => {
  const { tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTagsAsync());
  }, [dispatch]);

  return tags.length > 0 ? (
    <section>
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
        {tags.map((tag) => (
          <Tag key={tag.id} title={tag.title} />
        ))}
      </div>
    </section>
  ) : null;
};

export default Tags;
