import React, { useEffect, useRef, useState } from "react";
import axios from "../eaxios";
import MessageList from "./MessageList";
import "./styles.css";
export const Chatter = () => {
  const [chatMessage, setChatMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function onChangeHandler(e) {
    const val = e.target.value.toString();
    setChatMessage(val);
  }

  async function postHandler() {
    const payload = JSON.stringify({
      text: chatMessage,
    });

    try {
      await axios.post("messages/", payload);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteHandler(postId) {
    try {
      await axios.delete(`messages/${postId}`);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteAllHandler() {
    const confirmText = "Are you sure you want to delete all messages ?";
    if (!window.confirm(confirmText)) return;
    try {
      await axios.delete(`messages`);
      fetchData();
    } catch (e) {
      console.log(e);
    }
  }

  async function fetchData() {
    setIsLoading(true);
    try {
      const list = await axios.get("messages/");
      setMessagesList(list?.data);
      setChatMessage("");
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <h2>Chatter</h2>
      <p>Type something in the box below and then hit "POST"</p>
      <div className="input-container">
        <input
          type="text"
          name="input"
          placeholder="type something.."
          onChange={(e) => onChangeHandler(e)}
          value={chatMessage}
        />
        <button onClick={postHandler}>Post!</button>
        <button className="delete-all-btn" onClick={deleteAllHandler}>
          Delete All
        </button>
      </div>
      <MessageList
        list={messagesList}
        isLoading={isLoading}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};
