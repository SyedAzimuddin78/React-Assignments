import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "../../redux/reducer/reducer";
import "./createtodo.css";

const Createtodo = () => {
  const email = useSelector((state) => state.todo.username);
  const index = useSelector((state) => state.todo.index);
  const data1 = useSelector((state) => state.todo.data);
  const [data, setData] = useState(data1);
  const errorMsg = useSelector((state) => state.todo.errorMessage);

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const new_title = { ...data, [e.target.name]: e.target.value };
    setData(new_title);
  };
  const hidePopup = () => {
    dispatch(userSlice.actions.errorMessage({ errorMessage: "" }));
    dispatch(userSlice.actions.submitted());
    const item = {
      username: "",
      title: "",
      discription: "",
      currentstatus: false,
    };
    dispatch(userSlice.actions.editUser({ item: item, index: "" }));
    console.log("cancel");
  };

  const submit = (e) => {
    e.preventDefault();
    console.log("submit");
    if (!data.title || !data.discription) {
      dispatch(
        userSlice.actions.errorMessage({ errorMessage: "Fill All Fields" })
      );
      return;
    }
    const compeleteData = { ...data, username: email, currentstatus: false };
    dispatch(userSlice.actions.dataEntry({ new_data: compeleteData }));
    dispatch(userSlice.actions.submitted());
    dispatch(userSlice.actions.errorMessage({ errorMessage: "" }));
  };
  return (
    <div className="todo-popup">
      {/* <form onSubmit={submit}>
        <input name="title" type="text" onChange={handleChange} value={data.title}></input>
        <input type="text" name="discription" onChange={handleChange} value={data.discription}></input>
        <button type="submit">Create</button>
        
        {index!==""&&(<><button onClick={hidePopup}>cancel</button></>)}
      </form> */}

      <form onSubmit={submit} className="create_todo_form">
        <div className="popop-heading">
          <h1>{index === "" ? "Create Task" : "Edit Task"}</h1>
        </div>
        <div className="input_container">
          <div className="field-heading">Title</div>
          <input
            name="title"
            type="text"
            className="margin-bottom"
            placeholder="Enter Title.."
            value={data.title}
            onChange={handleChange}
          />
          <div className="field-heading">Description</div>
          <input
            type="text"
            className="margin-bottom"
            name="discription"
            placeholder="Enter Description.."
            onChange={handleChange}
            value={data.discription}
          ></input>
        </div>
        <div>{errorMsg}</div>
        <div className="btn_container">
          <button>Add</button>
          <button onClick={hidePopup}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Createtodo;
