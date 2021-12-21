import { useEffect, useState } from "react";
import { auth, fs } from "../Config/Config";

export default function GetCurrentUser() {
  const [isPending, setIsPending] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("users")
          .doc(user.uid)
          .get()
          .then((snapshot) => {
            setUser(snapshot.data().FullName);
            setIsPending(false);
          });
      } else {
        setIsPending(false);
        setUser(null);
      }
    });
  }, []);
  return user;
}
