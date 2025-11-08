import { useState, useEffect } from 'react';
import type { Score } from '@/models/Score';
import { scoreColumns } from './columns';
import { DataTable } from './data-table';

export default function Scores() {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { getScores } = await import('@/lib/api');
        const json = await getScores();
        setScores(json);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
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
