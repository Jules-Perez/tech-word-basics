import { useEffect, useState } from "react";
import { IUser } from "./useApi";
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
            if (user) {
              resolve(user);
            }
          }
        });
    });
  };

  return { getLoggedUser };
}
