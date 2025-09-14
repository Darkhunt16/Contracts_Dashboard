import { useEffect, useState } from "react";
import { fetchContracts } from "../lib/api";
import { Link } from "react-router-dom";

const STATUSES = ["Active", "Expired", "Renewal Due"];
const RISK = ["Low", "Medium", "High"];

export default function ContractsTable() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [page, setPage] = useState(1);

  const pageSize = 10;

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchContracts()
      .then((data) => {
        if (mounted) {
          setContracts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Failed to load contracts");
        setLoading(false);
      });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [q, statusFilter, riskFilter]);

  const filtered = contracts.filter((c) => {
    const matchesQ =
      q.trim() === "" ||
      c.name.toLowerCase().includes(q.toLowerCase()) ||
      c.parties.toLowerCase().includes(q.toLowerCase());
    const matchesStatus = !statusFilter || c.status === statusFilter;
    const matchesRisk = !riskFilter || c.risk === riskFilter;
    return matchesQ && matchesStatus && matchesRisk;
  });

  const total = filtered.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (loading)
    return <div className="p-6 bg-white rounded shadow">Loading contracts...</div>;
  if (error)
    return <div className="p-6 bg-white rounded shadow text-red-600">{error}</div>;
  if (!contracts.length)
    return <div className="p-6 bg-white rounded shadow">No contracts yet</div>;

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center gap-4 mb-4">
        <input
          placeholder="Search by name or parties..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="p-2 border rounded flex-1"
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="p-2 border rounded">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>

        <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="p-2 border rounded">
          <option value="">All risks</option>
          {RISK.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-600 border-b">
            <th className="py-2">Contract Name</th>
            <th>Parties</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Risk</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((c) => (
            <tr key={c.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{c.name}</td>
              <td>{c.parties}</td>
              <td>{c.expiry}</td>
              <td>{c.status}</td>
              <td>{c.risk}</td>
              <td className="text-right">
                <Link to={`/contracts/${c.id}`} className="text-indigo-600 hover:underline">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Showing {pageItems.length} of {total}</div>
        <div className="flex items-center gap-2">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-2 py-1 border rounded">Prev</button>
          <div className="px-3 py-1 border rounded">{page} / {pages}</div>
          <button onClick={() => setPage((p) => Math.min(pages, p + 1))} className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
