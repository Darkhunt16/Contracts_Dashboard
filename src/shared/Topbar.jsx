
import { useAuth } from "../lib/auth";

export default function Topbar({ onOpenUpload }) {
  const { logout } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div>
        <button onClick={onOpenUpload} className="px-3 py-1 bg-indigo-600 text-white rounded">Upload file</button>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm">Hello, <strong>User</strong></div>
        <div>
          <button onClick={logout} className="px-3 py-1 border rounded">Logout</button>
        </div>
      </div>
    </div>
  );
}
