import { useState, useEffect } from "react";

export default function Home() {
  const [total, setTotal] = useState(0);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/total")
      .then((res) => res.json())
      .then((data) => {
        setTotal(data.total);
        setLoading(false);
      });
    if (localStorage.getItem("voted")) setVoted(true);
  }, []);

  const handleVote = async (num) => {
    if (voted) return alert("You have already voted.");
    const res = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ choice: num }),
    });
    const data = await res.json();
    if (data.success) {
      setTotal(data.total);
      setVoted(true);
      localStorage.setItem("voted", "true");
    } else {
      alert(data.message);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-3xl font-bold mb-6">🎉 Participant Check</h1>

      {voted ? (
        <p className="text-green-600 text-xl">✅ Thank you for your vote!</p>
      ) : (
        <div className="space-y-4">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleVote(1)}
          >
            Ich bringe eine Person mit
          </button>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleVote(2)}
          >
            Ich bringe 2 Personen mit
          </button>
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => handleVote(3)}
          >
            Ich bringe 3 Personen mit
          </button>
              <a>
                href="/admin"
                className="mt-6 inline-block text-sm text-gray-500 hover:text-gray-700 underline"
                <!--Admin Login-->
              </a>
        </div>
      )}

      <div className="mt-10 text-lg">
        <p>
          Current total: <span className="font-bold">{total}</span> / 250
        </p>
      </div>
    </main>
  );
}
