import { useState, useEffect } from "react";
import { db } from "../utils/init-firebase";
import { collection, query, onSnapshot } from "firebase/firestore";

export const Data = () => {
  const [blogData, setBlogData] = useState();

  useEffect(() => {
    const q = query(collection(db, "blogPost"));

    const unsub = onSnapshot(q, (querySnapshot) => {
      let tmpArray = [];
      querySnapshot.forEach((doc) => {
        tmpArray.push({ ...doc.data(), id: doc.id });
      });
      setBlogData(tmpArray);
    });

    return () => {
      unsub();
    };
  }, []);

  return { blogData };
};
