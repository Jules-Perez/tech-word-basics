import { useEffect, useState } from "react";
import { IUser, useApi } from "./useApi";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export function useLoginSession() {
  const getLoggedUser = async (): Promise<IUser | null> => {
    return new Promise((resolve, reject) => {
      useAsyncStorage("loggedUser")
        .getItem()
        .then((e) => {
          if (!e) {
            resolve(null);
          } else {
            const user = JSON.parse(e) as IUser;
            useApi()
              .getUser(user.user_id)
              .then((e) => {
                e as IUser;
                resolve(e);
              });
          }
        });
    });
  };

  const LogOutUser = () => {
    useAsyncStorage("loggedUser").removeItem();
  };

  return { getLoggedUser, LogOutUser };
}
