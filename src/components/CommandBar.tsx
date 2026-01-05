import { useEffect, useMemo, useState } from "react";
import { appActions, appStore } from "@/lib/store";
import { useStore } from "@tanstack/react-store";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import { Book, Code, Monitor, Terminal, Zap } from "lucide-react";
import "./command-bar.css";

const R = 18;

export default function CommandBar() {
  const router = useRouter();
  const focusMode = useStore(appStore, (s) => s.focusMode);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isHovered, setIsHovered] = useState(false);

  const navItems = useMemo(
    () => [
      { path: "/", label: "Index", icon: Terminal, id: "home", shortcut: "1" },
      { path: "/projects", label: "Archive", icon: Code, id: "projects", shortcut: "2" },
      { path: "/blog", label: "Logs", icon: Book, id: "blog", shortcut: "3" },
    ] as const,
    []
  );

  const activeItem =
    navItems.find((item) => (item.path === "/" ? pathname === "/" : pathname.startsWith(item.path))) ??
    navItems[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "1") router.navigate({ to: "/" });
      if (e.key === "2") router.navigate({ to: "/projects" });
      if (e.key === "3") router.navigate({ to: "/blog" });
      if (e.key.toLowerCase() === "f") appActions.toggleFocusMode();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <nav className={`cmd-wrapper ${focusMode ? "focus-on" : "focus-off"}`}>
      <div
        className="cmd-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="nav-group">
          {navItems.map((item) => {
            const isActive = activeItem.id === item.id;
            // Instead of filtering, we use a class to animate the collapse
            const isHidden = !isHovered && !isActive;

            return (
              <Link
                key={item.id}
                to={item.path}
                data-active={isActive}
                className={`nav-link ${isHidden ? "is-hidden" : ""}`}
                style={{ borderRadius: R }}
              >
                <item.icon size={15} strokeWidth={2.5} className="z-10" />
                <span className="nav-text z-10">{item.label}</span>
                <span className="nav-shortcut z-10">{item.shortcut}</span>
              </Link>
            );
          })}
        </div>

        <div className="cmd-divider" />

        <button
          onClick={() => appActions.toggleFocusMode()}
          className={`focus-btn ${focusMode ? "is-active" : ""}`}
          style={{ borderRadius: R }}
        >
          {focusMode ? (
            <Zap size={14} fill="currentColor" className="z-10" />
          ) : (
            <Monitor size={14} className="z-10" />
          )}
          <span className="nav-text z-10">{focusMode ? "ACTIVE" : "ZEN"}</span>
          <span className="nav-shortcut z-10">F</span>
        </button>
      </div>
    </nav>
  );
}
