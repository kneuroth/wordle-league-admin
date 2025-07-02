import { useState, useEffect } from "react";
import { scoreColumns } from "./scores/columns";
import { DataTable } from "./scores/data-table";

export default function Scores() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch("https://s0f0zido6g.execute-api.us-east-1.amazonaws.com/getScores")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => setScores(json))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (err) return <p>Error: {err.message}</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* <pre>{JSON.stringify(scores, null, 2)}</pre> */}
      <DataTable columns={scoreColumns} data={scores}></DataTable>
    </div>
  );
}
