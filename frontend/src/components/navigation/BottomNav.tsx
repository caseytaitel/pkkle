import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const items = [
    { label: "Today", path: "/" },
    { label: "SOS", path: "/sos" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `text-lg font-medium ${
              isActive ? "text-black" : "text-gray-500"
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}