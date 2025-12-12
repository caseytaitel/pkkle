import { NavLink } from "react-router-dom";
import clsx from "clsx";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/95 backdrop-blur-sm shadow-[0_-1px_4px_rgba(0,0,0,0.05)] pb-[calc(0.75rem+var(--safe-bottom))]">
      <div className="max-w-md mx-auto flex">
        <NavItem to="/" label="Today" />
        <NavItem to="/regulate" label="Regulate" />
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
          "flex-1 py-3.5 text-center text-sm font-semibold tracking-tight",
          "transition-colors",
          isActive ? "text-black" : "text-gray-400"
        )
      }
    >
      {({ isActive }) => (
        <div className="flex flex-col items-center gap-1">
          <span>{label}</span>
          <span
            className={clsx(
              "h-1 w-8 rounded-full transition-all duration-300",
              isActive ? "bg-black" : "bg-black/10"
            )}
          />
        </div>
      )}
    </NavLink>
  );
}