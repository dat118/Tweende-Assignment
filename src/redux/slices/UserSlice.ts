import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppThunk } from "../store";
import { User } from "../../model";

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    getUsersFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const fetchUsers =
  (page: number): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(getUsersStart());
      const response = await axios.get(
        `https://randomuser.me/api/?results=10&page=${page}`
      );
      const users = response.data.results.map((result: any) => ({
        id: result.id.value || Math.random(),
        fullName: `${result.name.title} ${result.name.first} ${result.name.last}`,
        userName: result.login.username,
        thumbnailIcon: result.picture.thumbnail,
      }));
      dispatch(getUsersSuccess(users));
    } catch (error: any) {
      dispatch(getUsersFailure(error.message));
    }
  };

export const { getUsersStart, getUsersSuccess, getUsersFailure } =
  userSlice.actions;

export default userSlice.reducer;
