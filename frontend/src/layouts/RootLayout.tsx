import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/navigation/BottomNav";

export default function RootLayout() {
  const { pathname } = useLocation();

  // Define exactly which routes should hide the nav
  const hideNavOn = [
    "/pre",
    "/post",
    "/sos/ground",
    "/sos/chat",
    "/session/success",
  ];

  // Should navbar be hidden?
  const hideNav = hideNavOn.some(path => pathname.startsWith(path));

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Outlet />
      </div>

      {!hideNav && <BottomNav />}
    </div>
  );
}