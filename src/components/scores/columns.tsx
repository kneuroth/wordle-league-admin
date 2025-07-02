"use client";

import type { Score } from "@/models/Score";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { deleteScore } from "@/lib/api";

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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Button
        onClick={() => {
          deleteScore(row.getValue("primary_key"));
        }}
      >
        Delete
      </Button>
    ),
  },
];
