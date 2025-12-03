import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/90 backdrop-blur-sm pb-[calc(0.5rem+var(--safe-bottom))]">
      <div className="max-w-md mx-auto flex">
        <NavItem to="/" label="Today" />
        <NavItem to="/sos" label="SOS" />
      </div>
    </nav>
  );
}

interface NavItemProps {
  to: string;
  label: string;
}

function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "flex-1 py-3 text-center text-sm font-medium",
          "transition-colors",
          isActive ? "text-black" : "text-gray-500"
        )
      }
    >
      {({ isActive }) => (
        <div className="flex flex-col items-center gap-1">
          <span>{label}</span>
          <span
            className={clsx(
              "h-1 w-8 rounded-full transition-all",
              isActive ? "bg-black" : "bg-transparent"
            )}
          />
        </div>
      )}
    </NavLink>
  );
}