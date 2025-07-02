export async function deleteScore(primaryKey: string): Promise<void> {
  const url = `https://s0f0zido6g.execute-api.us-east-1.amazonaws.com/deleteScore/${primaryKey}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Failed to delete score: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting score:", error);
    throw error;
  }
}