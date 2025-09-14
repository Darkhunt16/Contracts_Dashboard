
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClasses = ({ isActive }) =>
    `block px-4 py-2 rounded ${isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200"}`;

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-4 text-2xl font-bold">Contracts</div>
      <nav className="p-2 space-y-1">
        <NavLink to="/" className={linkClasses} end>Contracts</NavLink>
        <a className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-200">Insights</a>
        <a className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-200">Reports</a>
        <a className="block px-4 py-2 rounded text-gray-700 hover:bg-gray-200">Settings</a>
      </nav>
    </aside>
  );
}
