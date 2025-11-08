'use client';

import type { Score } from '@/models/Score';
import type { ColumnDef } from '@tanstack/react-table';

// Use zod??
export const scoreColumns: ColumnDef<Score>[] = [
  {
    accessorKey: 'player_name',
    header: 'Player Name',
  },
  {
    accessorKey: 'score',
    header: 'Score',
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'player_id',
    header: 'Player ID',
  },
  {
    accessorKey: 'chat_id',
    header: 'Chat ID',
  },
];
