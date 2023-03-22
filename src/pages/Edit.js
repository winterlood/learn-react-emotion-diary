import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [originData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diary = useSelector((state) => state.diary);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diary.length >= 1) {
      const targetDiary = diary.find((it) => parseInt(it.id) === parseInt(id));

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diary]);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
