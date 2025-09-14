import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchContractById } from "../lib/api";

function ClauseCard({ clause }) {
  return (
    <div className="border rounded p-3">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{clause.title}</h4>
          <p className="text-sm text-gray-600">{clause.summary}</p>
        </div>
        <div className="text-sm text-gray-500">Confidence: {(clause.confidence * 100).toFixed(0)}%</div>
      </div>
    </div>
  );
}

function EvidenceDrawer({ evidence }) {
  return (
    <div className="w-80 bg-white border-l p-4">
      <h3 className="font-semibold mb-2">Evidence</h3>
      {evidence.map((e, i) => (
        <div key={i} className="mb-3">
          <div className="text-xs text-gray-500">{e.source}</div>
          <div className="text-sm">{e.snippet}</div>
          <div className="text-xs text-gray-500">Relevance: {(e.relevance * 100).toFixed(0)}%</div>
        </div>
      ))}
    </div>
  );
}

export default function ContractDetail() {
  const { id } = useParams();
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEvidence, setShowEvidence] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchContractById(id)
      .then((d) => {
        setContract(d);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load contract");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!contract) return <div className="p-6">No contract found</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <div className="w-64 bg-white border-r p-4">
        <Link to="/" className="text-indigo-600 hover:underline">← Back</Link>
        <h2 className="mt-4 font-semibold">{contract.name}</h2>
        <div className="text-sm text-gray-600">{contract.parties}</div>
        <div className="mt-3 text-sm">Start: {contract.start}</div>
        <div className="text-sm">Expiry: {contract.expiry}</div>
        <div className="text-sm">Status: {contract.status}</div>
        <div className="text-sm">Risk: {contract.risk}</div>
      </div>

      <div className="flex-1 p-6">
        <h3 className="font-semibold mb-3">Clauses</h3>
        <div className="grid grid-cols-2 gap-4">
          {contract.clauses.map((c, i) => <ClauseCard key={i} clause={c} />)}
        </div>

        <h3 className="font-semibold mt-6 mb-3">AI Insights</h3>
        <div className="space-y-2">
          {contract.insights.map((ins, i) => (
            <div key={i} className="p-3 border rounded flex justify-between items-start">
              <div>
                <div className="font-medium">{ins.risk} risk</div>
                <div className="text-sm text-gray-700">{ins.message}</div>
              </div>
              <div className={`px-2 py-1 rounded text-sm ${ins.risk === "High" ? "bg-red-100 text-red-700" : ins.risk === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {ins.risk}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button onClick={() => setShowEvidence((s) => !s)} className="px-3 py-1 bg-indigo-600 text-white rounded">
            {showEvidence ? "Hide Evidence" : "Show Evidence"}
          </button>
        </div>
      </div>

      {showEvidence && <EvidenceDrawer evidence={contract.evidence} />}
    </div>
  );
}
