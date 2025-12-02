import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/navigation/BottomNav";

export default function RootLayout() {
  const location = useLocation();

  const hideNav =
    location.pathname.startsWith("/pre") ||
    location.pathname.startsWith("/post") ||
    location.pathname.startsWith("/sos");

  return (
    <div className="min-h-screen pb-20">
      <Outlet />

      {!hideNav && <BottomNav />}
    </div>
  );
}