import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.254.116:3000",
});

export type UserType = "instructor" | "student" | null;

export interface IUser {
  id: number;
  user_type: UserType;
  user_id: string;
  name: string;
  password: string;
  email?: string;
  section?: string;
  is_verified?: boolean;
}
export type IUserKeys = "user_id" | "name" | "password" | "email" | "section";

const signupUser = async (user: IUser) => {
  try {
    const response = await api.post("/user/add", user);
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

const verifyUser = async (id: number) => {
  try {
    const response = await api.post("/user/verify/" + id);
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

export interface ILoginReq {
  email: string;
  password: string;
}

const loginUser = async (loginRequirements: ILoginReq) => {
  try {
    const response = await api.get("/login", { params: loginRequirements });
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

const getUser = async (user_id: string) => {
  try {
    const response = await api.get(`/users/${user_id}`);
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

export interface IAnswerLog {
  user_id: number;
  level_id: number;
  category_id: number;
  is_correct?: boolean;
  duration_seconds: number;
}

const answer = async (answerLog: IAnswerLog) => {
  try {
    const response = await api.post("/answer", answerLog);
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

const getUserAnswerLogs = async (id: number) => {
  try {
    const response = await api.get("/answer_log/" + id);
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

const getUserAnswerLogsByCategory = async (id: number, category_id: number) => {
  try {
    const response = await api.get(`/answer_log/category/${id}/${category_id}`);
    return response.data;
  } catch (err: any) {
    console.log(err.response?.data);
  }
};

export function useApi() {
  return {
    getAllUsers,
    getUser,
    signupUser,
    loginUser,
    verifyUser,
    answer,
    getUserAnswerLogs,
    getUserAnswerLogsByCategory,
  };
}
