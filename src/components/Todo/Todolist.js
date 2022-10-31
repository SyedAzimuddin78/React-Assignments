import React, { useEffect, useState } from "react";
import userSlice from "../../redux/reducer/reducer";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Createtodo from "./Createtodo";
import { useNavigate } from "react-router";
import "./todolist.css";
const Todolist = () => {
  const task = useSelector((state) => state.todo.getdata);
  const navigate = useNavigate();
  const [task2, settask] = useState(0);
  const data1 = useSelector((state) => state.todo.data);
  const change = useSelector((state) => state.todo.showPopup);
  const username = useSelector((state) => state.todo.username);
  const dispatch = useDispatch();
  const showPopup = () => {
    dispatch(userSlice.actions.submitted());
  };
  const deleteRow = (index) => {
    let c = window.confirm("sure you want to delete the row?");
    if (c) {
      // dispatch({ type: "deleteRow", index: index });
      dispatch(userSlice.actions.deleteUser({ index: index }));
    }
  };
  const editRow = (item, index) => {
    // dispatch({type:"editRow",user:{item:item,index:index}})
    dispatch(userSlice.actions.editUser({ item: item, index: index }));
    dispatch(userSlice.actions.submitted());
  };
  const statusChange = (item, index) => {
    const compeleteData = { ...item, currentstatus: !item.currentstatus };
    dispatch(
      userSlice.actions.changestatus({ item: compeleteData, index: index })
    );
  };

  useEffect(() => {
    if (username === "") {
      navigate("/");
    } else {
      if (task.length) {
        for (let i = 0; i < task.length; i++) {
          if (task[i].username === username) {
            settask(1);
            break;
          } else {
            settask(0);
          }
        }
      } else {
        settask(0);
      }
    }
    localStorage.setItem("lists", JSON.stringify(task));
  }, [username, task, navigate]);

  return (
    <div className="Todo-List">
      <button className="create_button" onClick={showPopup}>
        Create Task ✏
      </button>
      <>
        {!task2 ? (
          <p>
            You seem to have no tasks registered, click on the Create Todo
            button above to create one.
          </p>
        ) : (
          <div className=" heading taskBg">
            <div>
              <div className="taskText title">Title</div>
              <div className="taskText description">Description</div>
              <div className=" actions"> Actions</div>
            </div>
          </div>
        )}
      </>
      <div
        className={
          change ? "todo-backdrop todo-backdrop-visibility" : "todo-backdrop"
        }
      ></div>
      {change && <Createtodo />}

      {task?.map((item, index) => (
        <div key={index} >
          {item.username === username && (
            <div className="col taskBg" key={index}>
              <div>
                <div className="taskText title">{item.title}</div>
                <div className="taskText description">{item.discription}</div>
                <div className="iconsWrap actions">
                  <button
                    title="Completed / Not Completed"
                    className={item.currentstatus ? "complete-icon" : null}
                    onClick={() => statusChange(item, index)}
                  >
                    <FaCheck />
                  </button>
                  {item.currentstatus ? null : (
                    <>
                      <button
                        className="trash"
                        title="delete"
                        onClick={() => deleteRow(index)}
                      >
                        <FaTrash />
                      </button>
                      <button
                        className="edit"
                        title="edit"
                        onClick={() => editRow(item, index)}
                      >
                        <FaEdit />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todolist;
