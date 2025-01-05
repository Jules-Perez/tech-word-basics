import axios from "axios";

const api = axios.create({
  //baseURL: "http://:3000",
  baseURL: "http://localhost:3000",
});

export type UserType = "instructor" | "student" | null;

export interface IUser {
  id: number;
  user_type: UserType;
  user_id: string;
  name: string;
  pass: string;
  email?: string;
  section?: string;
  is_verified?: boolean;
  byte_coins?: number;
  byte_power?: number;
  rank?: number;
  user_img_index?: number;
}
export type IUserKeys = "user_id" | "name" | "pass" | "email" | "section";

const signupUser = async (user: IUser) => {
  try {
    const response = await api.post("/user/add", user);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const editUser = async (user: IUser) => {
  try {
    const response = await api.post(`/user/edit/${user.id}`, user);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const verifyUser = async (id: number) => {
  try {
    const response = await api.post("/user/verify/" + id);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
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
    alert("Unexpected Error from the server");
  }
};

const getAllUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const getUser = async (user_id: string) => {
  try {
    const response = await api.get(`/users/${user_id}`);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const getUserTransaction = async (id: number) => {
  try {
    const response = await api.get(`/user/transactions/${id}`);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

export interface IAnswerLog {
  user_id: number;
  level_id: number;
  category_id: number;
  is_correct?: boolean;
  duration_seconds: number;
  is_skipped?: boolean;
}

const answer = async (answerLog: IAnswerLog, newScore: number) => {
  try {
    const response = await api.post("/answer", {
      new_score: newScore,
      ...answerLog,
    });
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const getUserAnswerLogs = async (id: number) => {
  try {
    const response = await api.get("/answer_log/" + id);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const getUserRewardLogs = async (id: number, category_id: number) => {
  try {
    const response = await api.get(`/user/hasRewarded/${id}/${category_id}`);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const getUserAnswerLogsByCategory = async (id: number, category_id: number) => {
  try {
    const response = await api.get(`/answer_log/category/${id}/${category_id}`);
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const purchase = async (id: number, coinSpent: number) => {
  try {
    const response = await api.post(`/user/purchase/${id}`, {
      coinSpent,
    });
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

const rewardUser = async (
  id: number,
  bytePowerReward?: number,
  coinReward?: number,
  category_id?: number
) => {
  try {
    const response = await api.post(`/user/reward/${id}`, {
      bytePowerReward,
      coinReward,
      category_id,
    });
    return response.data;
  } catch (err: any) {
    alert("Unexpected Error from the server");
  }
};

export function useApi() {
  return {
    getAllUsers,
    getUser,
    signupUser,
    editUser,
    loginUser,
    verifyUser,
    answer,
    getUserAnswerLogs,
    getUserRewardLogs,
    getUserAnswerLogsByCategory,
    getUserTransaction,
    rewardUser,
    purchase,
  };
}
