import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/types";
import { client } from "../../../shared/api";

type UserState = Partial<{
  state: "logged-in" | "logged-out" | "register" | "loading";

  signIn_username: string;
  signIn_password: string;
  signIn_error: boolean;

  loggedIn_fullName: string;

  register_username: string;
  register_nameState: "unknown" | "available" | "not-available" | "loading";
  register_password: string;
  register_fullName: string;
  register_success: boolean;
  register_error: boolean;
}>;

const initialState: UserState = {
  state: "logged-out",
  register_nameState: "unknown",
};

const checkSignInState = createAsyncThunk(
  "user/checkSignInState",
  async (_, api) => {
    const signInResult = await client.checkSignInState();
    const userResult = await client.getSignedInUser();
    return {
      loggedIn: signInResult,
      user: userResult,
    };
  }
);

const checkUserNameAvailable = createAsyncThunk(
  "user/checkUserNameAvailable",
  async (_, api) => {
    const state = (api.getState() as RootState).user;
    const result = await client.checkUserNameAvailable(
      state.register_username || ""
    );
    return result;
  }
);

const signIn = createAsyncThunk("user/signIn", async (_, api) => {
  const state = (api.getState() as RootState).user;
  const signInResult = await client.signIn({
    username: state.signIn_username || "",
    password: state.signIn_password || "",
  });
  const userResult = await client.getSignedInUser();
  return {
    loggedIn: signInResult,
    user: userResult,
  };
});

const register = createAsyncThunk("user/register", async (_, api) => {
  const state = (api.getState() as RootState).user;
  return client.register({
    username: state.register_username || "",
    password: state.register_password || "",
    fullName: state.register_fullName || "",
  });
});

const signOut = createAsyncThunk("user/signOut", async (_, api) => {
  return client.signOut();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<UserState["state"]>) => {
      state.state = action.payload;
    },
    setSignIn_username: (state, action: PayloadAction<string>) => {
      state.signIn_username = action.payload;
    },
    setSignIn_password: (state, action: PayloadAction<string>) => {
      state.signIn_password = action.payload;
    },
    setRegister_username: (state, action: PayloadAction<string>) => {
      state.register_username = action.payload;
    },
    setRegister_password: (state, action: PayloadAction<string>) => {
      state.register_password = action.payload;
    },
    setRegister_fullName: (state, action: PayloadAction<string>) => {
      state.register_fullName = action.payload;
    },

    clearErrors: (state) => {
      state.signIn_error = false;
      state.register_error = false;
    },
  },
  extraReducers: (builder) => {
    // checkSignInState
    builder.addCase(checkSignInState.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(checkSignInState.fulfilled, (state, action) => {
      state.state = action.payload.loggedIn ? "logged-in" : "logged-out";
      state.loggedIn_fullName = action.payload.user?.fullName || "";
    });
    builder.addCase(checkSignInState.rejected, (state, action) => {
      state.state = "logged-out";
    });

    // checkUserNameAvailable
    builder.addCase(checkUserNameAvailable.pending, (state, action) => {
      state.register_nameState = "loading";
    });
    builder.addCase(checkUserNameAvailable.fulfilled, (state, action) => {
      state.register_nameState = action.payload ? "available" : "not-available";
    });
    builder.addCase(checkUserNameAvailable.rejected, (state, action) => {
      state.register_nameState = "not-available";
    });

    // signIn
    builder.addCase(signIn.pending, (state, action) => {
      state.state = "loading";
      state.signIn_error = false;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.state = action.payload.loggedIn ? "logged-in" : "logged-out";
      state.loggedIn_fullName = action.payload.user?.fullName || "";
      state.signIn_error = !action.payload.loggedIn;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.state = "logged-out";
      state.signIn_error = true;
    });

    builder.addCase(register.pending, (state, action) => {
      state.state = "loading";
      state.register_error = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.state = action.payload ? "logged-out" : "register";
      state.register_error = !action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.state = "register";
      state.register_error = true;
    });

    // signOut
    builder.addCase(signOut.pending, (state, action) => {
      state.state = "loading";
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.state = "logged-out";
      state.loggedIn_fullName = "";
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.state = "logged-out";
    });
  },
  selectors: {
    getState: (state) => state.state,

    getLoggedIn_fullName: (state) => state.loggedIn_fullName,

    getSignIn_username: (state) => state.signIn_username,
    getSignIn_password: (state) => state.signIn_password,
    getSignIn_error: (state) => state.signIn_error,

    getRegister_username: (state) => state.register_username,
    getRegister_password: (state) => state.register_password,
    getRegister_fullName: (state) => state.register_fullName,
    getRegister_nameState: (state) => state.register_nameState,
    getRegister_error: (state) => state.register_error,
  },
});

export const userModel = {
  actions: {
    ...userSlice.actions,
    checkSignInState,
    checkUserNameAvailable,
    signIn,
    register,
    signOut,
  },
  selectors: userSlice.selectors,
};

export const userModelReducer = userSlice.reducer;
