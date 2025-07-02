"use client";

import type { Score } from "@/models/Score";
import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const scoreColumns: ColumnDef<Score>[] = [
  {
    accessorKey: "player_name",
    header: "Player Name",
  },
  {
    accessorKey: "score",
    header: "Score",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "primary_key",
    header: "Primary Key",
  },
  {
    accessorKey: "player_id",
    header: "Player ID",
  },
  {
    accessorKey: "chat_id",
    header: "Chat ID",
  },
];
