import React from "react";
import "./styles.css";
const MessageList = ({ list, isLoading, deleteHandler }) => {
  function calcTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {list.map((el, index) => {
        return (
          <div key={index} className="list-item">
            <div>
              <span className="source-name">~{el.source}</span>
              <span>-{calcTime(el.timestamp)}</span>
              <span
                className="del-item-btn"
                onClick={() => deleteHandler(el.id)}
              >
                Delete
              </span>
            </div>
            <div className="text">
              <span>{el.text}</span>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
