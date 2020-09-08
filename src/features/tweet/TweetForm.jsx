import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sendTweet } from "./tweetSlice";
import { SpinnerCircular } from 'spinners-react';

function TweetForm({ history }) {
  const {sendingTweet, hasErrors} = useSelector((state) => state.tweet);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendTweet(text, history));
  };

  const sendingTweetRender = () => {
    if (sendingTweet) {
		return (
			<Fragment>
				<SpinnerCircular></SpinnerCircular>
				<p>Sending tweet...</p>
			</Fragment>
		);
	} else {
		return (
			<form onSubmit={handleSubmit}>
				<h1>New Tweet</h1>
				<textarea placeholder="Say something" required value={text} onChange={(e) => setText(e.target.value)} />
				<br />
				<button type="submit">Send</button>
			</form>
		);
	} 
  }

  return <div>{sendingTweetRender()}</div>;

  
}

export default TweetForm;
