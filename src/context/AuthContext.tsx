import { createContext, useContext, useReducer } from "react";
import { BASE_URL } from "../utils/consts.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import $axios from "../utils/axios";

type User = {
  email?: string;
  avatar?: any,
  banned?: boolean,
  first_name?: string,
  last_name?: string,
  position?: string,
};

type AuthState = {
  user: User | null;
};

type Action = {
  type: string;
  payload: any;
};

type AuthContextType = {
  user: User | null;
  register: (credential: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  activateUser: (uid: string, token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
};

const authContext = createContext<AuthContextType | null>(null);

export function useAuthContext(): AuthContextType {
  const context = useContext(authContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
}

const initialState: AuthState = {
  user: null,
};

const ACTIONS = {
  user: "USER",
};

function reducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case ACTIONS.user:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

function AuthContext({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  async function register(credential: any): Promise<void> {
    try {
      await axios.post(`${BASE_URL}/user/users/`, credential);
    } catch (error) {
      console.log(error);
    }
  }

  async function login(credentials: any): Promise<void> {
    try {
      const { data: tokens } = await axios.post(
        `${BASE_URL}/login/jwt/create/`,
        credentials
      );
      localStorage.setItem("tokens", JSON.stringify(tokens));

      const { data } = await $axios.get(`${BASE_URL}/profile/`);

      dispatch({
        type: ACTIONS.user,
        payload: data,
      });

      const oper = await axios.post(
        `${BASE_URL}/operator/actions/come_in_system/`,
        {},
        {
          headers: {
            Authorization: `Token ${tokens.access}`,
          },
        }
      );
      console.log(oper);
  

    } catch (error) {
      console.log(error);
    }
  }

  function logout(): void {
    localStorage.removeItem("tokens");
    navigate("/auth")
    dispatch({
      type: ACTIONS.user,
      payload: null,
    });
  }

  async function checkAuth(): Promise<void> {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens") || "");
      if (tokens) {
        const { data } = await $axios.get(`${BASE_URL}/user/profile/`);

        dispatch({
          type: ACTIONS.user,
          payload: data,
        });
      } else {
        dispatch({
          type: ACTIONS.user,
          payload: null,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function activateUser(uid: string, token: string): Promise<void> {
    try {
      await axios.post(`${BASE_URL}/user/users/activation/`, {
        uid,
        token,
      });
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  }

  const value: AuthContextType = {
    user: state.user,
    register,
    login,
    activateUser,
    logout,
    checkAuth,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

export default AuthContext;
