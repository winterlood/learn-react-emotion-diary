import { createSlice } from "@reduxjs/toolkit";

let id = 0;

function getInitialState() {
  const rawData = localStorage.getItem("diary");
  if (!rawData) {
    return [];
  }
  const localData = JSON.parse(rawData);
  if (localData.length === 0) {
    return [];
  }

  console.log(localData);
  localData.sort((a, b) => Number(b.id) - Number(a.id));
  id = localData[0].id + 1;

  return localData;
}

const initialState = getInitialState();

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    createItem: (state, action) => {
      state.push({
        ...action.payload,
        date: new Date(action.payload.date).getTime(),
        id: id + 1,
      });
    },
    updateItem: (state, action) => {
      const idx = state.findIndex(
        (it) => String(it.id) === String(action.payload.id)
      );
      state[idx] = {
        ...action.payload,
        date: new Date(action.payload.date).getTime(),
      };
    },
    deleteItem: (state, action) => {
      return state.filter((it) => String(it.id) !== String(action.payload.id));
    },
  },
});

export const { createItem, updateItem, deleteItem } = diarySlice.actions;

export default diarySlice.reducer;
