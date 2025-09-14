import { useState } from "react";
import Sidebar from "../shared/Sidebar";
import Topbar from "../shared/Topbar";
import ContractsTable from "../shared/ContractsTable";
import UploadModal from "../shared/UploadModal";

export default function DashboardPage() {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Topbar onOpenUpload={() => setShowUpload(true)} />
        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">Contracts</h2>
          <ContractsTable />
        </main>
      </div>

      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}
