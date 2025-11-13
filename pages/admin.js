import { useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [data, setData] = useState({ total: 0, votes: [] });

  const fetchData = async () => {
    const res = await fetch("/api/admin?password=" + password);
    const d = await res.json();
    if (d.success) {
      setAuthorized(true);
      setData(d);
    } else {
      alert("Wrong password");
    }
  };

  const resetVotes = async () => {
    if (!confirm("Reset all votes?")) return;
    await fetch("/api/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    fetchData();
  };

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">Admin Login</h1>
        <input
          type="password"
          className="border p-2"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={fetchData}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-2 font-bold">Admin Dashboard</h1>
      <p className="mb-4">Total participants: {data.total}</p>

      <button
        onClick={resetVotes}
        className="px-4 py-2 bg-red-500 text-white rounded mb-6"
      >
        Reset Votes
      </button>

      <table className="table-auto border-collapse w-full text-sm">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Choice</th>
            <th className="border px-2 py-1">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.votes.map((v) => (
            <tr key={v.id}>
              <td className="border px-2 py-1">{v.id}</td>
              <td className="border px-2 py-1">{v.choice}</td>
              <td className="border px-2 py-1">{v.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
