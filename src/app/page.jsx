"use client";
import { FaCircle } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import "./globals.css";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const tasks = [
  {
    title: "Morning Yoga",
    desc: "Start the day with a 30-minute yoga session at 6:30am.",
    executed: false,
    priority: "High",
  },
  {
    title: "Grocery Shopping",
    desc: "Buy fresh vegetables, fruits, and dairy products.",
    executed: false,
    priority: "Medium",
  },
  {
    title: "Team Meeting",
    desc: "Attend the team sync-up meeting at 11:00am.",
    executed: true,
    priority: "High",
  },
  {
    title: "Lunch with Friends",
    desc: "Catch up with college friends at the new cafe.",
    executed: false,
    priority: "Low",
  },
  {
    title: "Finish Client Presentation",
    desc: "Prepare slides for the upcoming client presentation.",
    executed: false,
    priority: "High",
  },
  {
    title: "Evening Walk",
    desc: "Take a 20-minute walk around the park.",
    executed: true,
    priority: "Low",
  },
  {
    title: "Watch a Documentary",
    desc: "Watch the latest documentary on nature conservation.",
    executed: false,
    priority: "Medium",
  },
];

export default function Home() {
  const [renderList, setRenderList] = useState(tasks);
  const [addTaskModal, setAddTaskModal] = useState(false); // Default closed
  const [editInd, setEditInd] = useState(null);
  const [taskData, setTaskData] = useState({
    title: "",
    desc: "",
    priority: "Medium",
  });

  const openModal = () => setAddTaskModal(true);
  const closeModal = () => {
    setAddTaskModal(false);
    setEditInd(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    if (editInd !== null) {
      setTaskData({
        title: renderList[editInd].title,
        desc: renderList[editInd].desc,
        priority: renderList[editInd].priority,
      });
    } else {
      setTaskData({ title: "", desc: "", priority: "Medium" }); // Reset taskData
    }
  }, [editInd, renderList]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editInd !== null) {
      let tempArr = [...renderList];
      tempArr[editInd].title = taskData.title;
      tempArr[editInd].desc = taskData.desc;
      tempArr[editInd].priority = taskData.priority;
      setRenderList(tempArr);
      setEditInd(null);
    } else {
      const newTask = {
        title: taskData.title,
        desc: taskData.desc,
        executed: false, // Set as non-executed by default
        priority: taskData.priority,
      };
      setRenderList([...renderList, newTask]);
    }
    closeModal();
    setTaskData({ title: "", desc: "", priority: "Medium" }); // Reset taskData after submission
  };

  const toggleTaskStatus = (index) => {
    const tempArr = [...renderList];
    tempArr[index].executed = true; // Set to executed
    setRenderList(tempArr);
  };
  const priorityOrder = ["High", "Medium", "Low"];

  return (
    <div className="wrapper">
      <header className="headerClass">
        <div>
          <p id="heading">Today</p>
        </div>
        <div className="btnClass">
          <button onClick={openModal}>+ Add a Task</button>
        </div>
      </header>

      <section className="middleSection">
        <div className="todosSection">
          <div className="todosSection1">
            <FaCircle style={{ marginTop: 5 }} color="red" />
            <p>ToDos</p>
          </div>
          {/* Render non-executed tasks */}
          {renderList
            .filter((task) => !task.executed)
            .sort(
              (a, b) =>
                priorityOrder.indexOf(a.priority) -
                priorityOrder.indexOf(b.priority)
            ) // Sort based on priority
            .map((task, index) => (
              <div key={index} className="task">
                <div className="tgl">
                  <h3>{task.title}</h3>
                  <button
                    onClick={() => {
                      const taskIndex = renderList.findIndex(
                        (t) =>
                          t.title === task.title &&
                          t.desc === task.desc &&
                          t.priority === task.priority
                      );
                      toggleTaskStatus(taskIndex);
                    }}
                  >
                    ✓
                  </button>
                </div>
                <p>{task.desc}</p>
                <div className="edit">
                  <span id={task.priority}>{task.priority}</span>
                  <div>
                    <MdDelete
                      onClick={() => {
                        const newArr = renderList.filter(
                          (element) => element.desc !== task.desc
                        );
                        setRenderList(newArr);
                      }}
                      size={25}
                      color="red"
                    />
                    <MdEdit
                      onClick={() => {
                        const taskIndex = renderList.findIndex(
                          (t) =>
                            t.title === task.title &&
                            t.desc === task.desc &&
                            t.priority === task.priority
                        );
                        setEditInd(taskIndex);
                        setAddTaskModal(true);
                      }}
                      color="#543ee8"
                      size={25}
                    />
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="todosSection">
          <div className="todosSection1">
            <FaCircle style={{ marginTop: 5 }} color="#543ee8" />
            <p>Executed</p>
          </div>
          {/* Render executed tasks */}
          {renderList
            .filter((task) => task.executed)
            .map((task, index) => (
              <div key={index} className="task">
                <h3>{task.title}</h3>
                <p>{task.desc}</p>
                <div className="edit">
                  <span id={task.priority}>{task.priority}</span>
                  <MdDelete
                    onClick={() => {
                      const newArr = renderList.filter(
                        (element) => element.desc !== task.desc
                      );
                      setRenderList(newArr);
                    }}
                    size={25}
                    color="red"
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Modal */}
        {addTaskModal && (
          <div className="modalBackground" onClick={closeModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <h2>{editInd !== null ? "Edit Task" : "Add Task"}</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="formGroup">
                  <label htmlFor="taskName">Task Name</label>
                  <input
                    type="text"
                    id="taskName"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="taskDesc">Description</label>
                  <textarea
                    id="taskDesc"
                    name="desc"
                    value={taskData.desc}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="taskPriority">Priority</label>
                  <select
                    id="taskPriority"
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="modalActions">
                  <button type="submit" className="modalSubmitBtn">
                    {editInd !== null ? "Edit Task" : "Add Task"}
                  </button>
                  <button
                    type="button"
                    className="modalCancelBtn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
