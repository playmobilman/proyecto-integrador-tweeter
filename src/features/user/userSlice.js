import api from "../../app/api";

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: {
    signingUp: false,
    signupError: null,
    loggedIn: false,
  },
  reducers: {
    signupUserStart(state, action) {
      state.signingUp = true;
    },
    signupUserSuccess(state, action) {
      state.signingUp = false;
      state.loggedIn = true;
      state.signupError = null;
    },
    signupUserError(state, action) {
      state.signingUp = false;
      state.loggedIn = false;
      state.signupError = action.payload;
    },
  },
});

export const {
  signupUserError,
  signupUserStart,
  signupUserSuccess,
} = userSlice.actions;

export const signupUser = (user, history) => {
  return async function (dispatch) {
    dispatch(signupUserStart());

    try {
      const response = await api.post("/users", user);

      dispatch(signupUserSuccess());

      // guardar en localStorage
      localStorage.setItem("token", response.data.token);

      // actulizar instancia de axios
      api.defaults.headers["Authorization"] = `Bearer ${response.data.token}`;

      // redireccionar a tweets
      history.push("/tweets");
    } catch (error) {
      dispatch(signupUserError(error.response?.data));
    }
  };
};

export default userSlice.reducer;
