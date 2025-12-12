import { Outlet, useLocation } from "react-router-dom";
import BottomNav from "../components/navigation/BottomNav";

export default function RootLayout() {
  const { pathname } = useLocation();

  const hideNavOn = [
    "/pre",
    "/post",
    "/regulate/ground",
    "/regulate/chat",
    "/session/success",
  ];

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