import { useEffect, useState } from "react";
import { AppName } from "../AppName";

const useTitle = (titleText: string) => {
  const [title, setTitle] = useState("");
  useEffect(() => {
    document.title = titleText + " - " + AppName + " | Notepad Web App";
    setTitle(titleText);
  }, [titleText]);
  return [title];
};

export default useTitle;
