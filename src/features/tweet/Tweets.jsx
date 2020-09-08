import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchTweets } from './tweetSlice';
import { SpinnerCircular } from 'spinners-react';
import BlockUI from 'react-block-ui';
import 'react-block-ui/style.css';
import styles from './Tweets.module.css';

function Tweets() {
  const {tweets, loading, hasErrors } = useSelector((state) => state.tweet);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTweets());
  }, [dispatch]);

  const renderTweets = () => {
		// if (loading) return (
		// 	<Fragment>
		// 		<SpinnerCircular></SpinnerCircular>
		// 		<p>Loading tweets...</p>
		// 	</Fragment>
    // );
    
    if (hasErrors) return <p>Cannot display tweets...</p>;

		return tweets.map((tweet, index) => (
			<Fragment key={index}>
				<dl className={index % 2 === 0 ? styles.tweetAlternate : ''}>
					<dt>
						<strong>@{tweet.author.username}</strong>
					</dt>
					<dd>{tweet.text}</dd>
					<hr />
				</dl>
			</Fragment>
		));
  };

  return (
		<div>
			<Link to="/new-tweet">New Tweet</Link>
			<BlockUI tag="div" blocking={loading} message="Loading tweets...">
				{renderTweets()}
			</BlockUI>
		</div>
  );
}

export default Tweets;
