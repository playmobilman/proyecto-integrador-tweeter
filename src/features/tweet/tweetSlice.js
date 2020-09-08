import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

const tweetSlice = createSlice({
	name: 'tweet',
	initialState: {
		tweets: [],
		sendingTweet: false,
		sendTweetError: null,
		loading: true,
		hasErrors: false,
	},
	reducers: {
		getTweets(state, action) {
			state.loading = true;
		},
		sendTweetStart(state, action) {
      state.sendingTweet = true;
		},
		sendTweetSuccess(state, action) {
			state.sendingTweet = false;
			state.sendTweetError = null;
			state.tweets.push(action.payload);
		},
		sendTweetError(state, action) {
      state.loading = false;
      state.sendingTweet = false;
			state.sendTweetError = action.payload;
		},
		fetchTweetsSuccess(state, action) {
			state.loading = false;
			state.hasErrors = false;
			state.tweets = action.payload;
		},
		fetchTweetsError(state, action) {
			state.loading = false;
			state.hasErrors = true;
		}
	},
});

export const {
	getTweets,
	getTweetsSuccess,
	getTweetsError,
	sendTweetError,
	sendTweetStart,
	sendTweetSuccess,
	fetchTweetsSuccess,
	fetchTweetsError
} = tweetSlice.actions;

export const sendTweet = (text, history) => async (dispatch) => {
  dispatch(sendTweetStart());
  try {
    const response = await api.post("/tweets", { text });
    dispatch(sendTweetSuccess(response.data));
    history.push("/tweets");
  } catch (error) {
    dispatch(sendTweetError(error.response?.data));
  }
};

export const fetchTweets = () => async dispatch => {
  dispatch(getTweets())
  try {
    const response = await api.get('/tweets');
    dispatch(fetchTweetsSuccess(response.data));
  } catch(error) {
    dispatch(fetchTweetsError(error.response?.data));
  }
}

export default tweetSlice.reducer;
