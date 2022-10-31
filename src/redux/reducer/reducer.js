import { createSlice } from "@reduxjs/toolkit";
const initialstate = {
  getdata: getLocalItems(),
  data: {
    username: "",
    title: "",
    discription: "",
    currentstatus: false,
  },
  index: "",
  loggedInUser: "",
  username: "",
  showPopup: false,
  errorMessage: null,
};
function getLocalItems() {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
}
const userSlice = createSlice({
  name: "todo",
  initialState: initialstate,
  reducers: {
    dataEntry(state, action) {
      if (state.index !== "") {
        const t = [...state.getdata];
        // eslint-disable-next-line array-callback-return
        t.map((item, index) => {
          if (index === state.index) {
            t[index] = action.payload.new_data;
          }
        });
        state.getdata = t;
        state.index = "";
        const temporary = {
          ...state.data,
          username: "",
          title: "",
          discription: "",
          currentstatus: false,
        };
        state.data = temporary;
      } else {
        state.getdata = [...state.getdata, action.payload.new_data];
      }
    },

    editUser(state, action) {
      state.data = action.payload.item;
      state.index = action.payload.index;
    },
    deleteUser(state, action) {
      const deletedRow = [...state.getdata];
      deletedRow.splice(action.payload.index, 1);
      state.getdata = deletedRow;
    },
    submitted(state) {
      state.showPopup = !state.showPopup;
    },
    createdUser(state, action) {
      state.loggedInUser = action.payload.displayName;
      state.username = action.payload.email;
    },

    errorMessage(state, action) {
      state.errorMessage = action.payload.errorMessage;
    },
    changestatus(state, action) {
      const t = [...state.getdata];
      t.map((item, index) => {
        if (index === action.payload.index) {
          t[index] = action.payload.item;
        }
      });
      state.getdata = t;
    },
  },
});
export default userSlice;
