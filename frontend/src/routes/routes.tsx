import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import TodayPage from "../pages/today/TodayPage";
import PreSessionPage from "../pages/pre/PreSessionPage";
import PostSessionPage from "../pages/post/PostSessionPage";
import HistoryPage from "../pages/history/HistoryPage";
import RegulatePage from "../pages/regulate/RegulatePage";
import RegulateGroundingPage from "../pages/regulate/RegulateGroundingPage";
import RegulateRedoPage from "../pages/regulate/RegulateRedoPage";
import RegulateCompletionPage from "../pages/regulate/RegulateCompletionPage";
import RegulateIntegratePage from "../pages/regulate/RegulateIntegrate";
import SessionSuccessPage from "../pages/success/SessionSuccessPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <TodayPage /> },
      { path: "/pre", element: <PreSessionPage /> },
      { path: "/post", element: <PostSessionPage /> },
      { path: "/history", element: <HistoryPage /> },
      { path: "/regulate", element: <RegulatePage /> },
      { path: "/regulate/ground", element: <RegulateGroundingPage /> },
      { path: "/regulate/redo", element: <RegulateRedoPage /> },
      { path: "/regulate/complete", element: <RegulateCompletionPage /> },
      { path: "/regulate/integrate", element: <RegulateIntegratePage /> },
      { path: "/session/success", element: <SessionSuccessPage /> },
    ],
  },
]);