import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useFadeNavigate() {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);

  function fadeTo(path: string, state?: any) {
    setExiting(true);

    setTimeout(() => {
      navigate(path, state ? { state } : undefined);
    }, 280); // matches fade-out animation
  }

  return { fadeTo, exiting };
}