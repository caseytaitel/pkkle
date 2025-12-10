import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import TodayPage from "../pages/today/TodayPage";
import PreSessionPage from "../pages/pre/PreSessionPage";
import PostSessionPage from "../pages/post/PostSessionPage";
import CenterPage from "../pages/center/CenterPage";
import CenterGroundingPage from "../pages/center/CenterGroundingPage";
import CenterChatPage from "../pages/center/CenterChatPage";
import SessionSuccessPage from "../pages/success/SessionSuccessPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <TodayPage /> },
      { path: "/pre", element: <PreSessionPage /> },
      { path: "/post", element: <PostSessionPage /> },
      { path: "/center", element: <CenterPage /> },
      { path: "/center/ground", element: <CenterGroundingPage /> },
      { path: "/center/chat", element: <CenterChatPage /> },
      { path: "/session/success", element: <SessionSuccessPage /> },
    ],
  },
]);