import { useDispatch, useSelector } from "react-redux";
import { tagRemove, tagSelected } from "../../redux/features/filters/filtersSlice";

const Tag = ({ title }) => {
  const { tags: selectedTags } = useSelector((state) => state.filters);
  const dispatch = useDispatch()

  const isSelected = selectedTags.includes(title);


  const handleTagSelected = () => {
    if (isSelected) {
        dispatch(tagRemove(title))
    } else {
        dispatch(tagSelected(title))
    }
  }

  const style = isSelected
    ? "bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
    : "bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer";

  return (
    <div className={style} onClick={handleTagSelected}>
      {title}
    </div>
  );
};

{
  /* <div className="bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer">
redux
</div> */
}

export default Tag;
