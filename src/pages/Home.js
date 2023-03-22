import { useEffect, useState } from "react";

import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import DiaryList from "./../components/DiaryList";
import { useSelector } from "react-redux";

const Home = () => {
  const diary = useSelector((state) => state.diary);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  useEffect(() => {
    if (diary.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(diary.filter((it) => firstDay <= it.date && it.date <= lastDay));
    } else {
      setData([]);
    }
  }, [diary, curDate]);

  const increaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
  };

  const decreaseMonth = () => {
    setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  };

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diary={data} />
    </div>
  );
};

export default Home;
