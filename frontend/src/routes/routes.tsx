import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import TodayPage from "../pages/today/TodayPage";
import PreSessionPage from "../pages/pre/PreSessionPage";
import PostSessionPage from "../pages/post/PostSessionPage";
import SOSPage from "../pages/sos/SOSPage";
import GroundingPage from "../pages/sos/GroundingPage";
import ChatbotPage from "../pages/sos/ChatbotPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,   // <-- layout wrapper
    children: [
      { path: "/", element: <TodayPage /> },
      { path: "/pre", element: <PreSessionPage /> },
      { path: "/post", element: <PostSessionPage /> },
      { path: "/sos", element: <SOSPage /> },
      { path: "/sos/ground", element: <GroundingPage /> },
      { path: "/sos/chat", element: <ChatbotPage /> },
    ],
  },
]);