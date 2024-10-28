"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader";
import { DataTableRowActions } from "../../../components/DataTable/DataTableRowActions";

export type MiniUrl = {
  id: string;
  alias: string;
  longUrl: string;
  shortUrl: string;
  visits: number;
};

// Here we define the columns for the data-table

export const columns: ColumnDef<MiniUrl>[] = [
  /* CheckBoxes column for selecting rows */
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  // Alias column
  {
    accessorKey: "alias",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alias" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[500px] truncate font-medium hover:text-clip">
          {row.getValue("alias")}
        </div>
      );
    },
  },

  // LongUrl column
  {
    accessorKey: "longUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Long URL" />
    ),
    cell: ({ row }) => {
      return (
        <HoverCard>
            <div className="max-w-[500px] truncate font-medium">
              <HoverCardTrigger>{row.getValue("longUrl")}</HoverCardTrigger>
            </div>
            <HoverCardContent className="w-auto">
              <div className="">{row.getValue("longUrl")}</div>
            </HoverCardContent>
          </HoverCard>
      );
    },
  },

  // ShortUrl column
  {
    accessorKey: "shortUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Short URL" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[500px] truncate font-medium hover:text-clip">
          {row.getValue("shortUrl")}
        </div>
      );
    },
  },

  // Visits column
  {
    accessorKey: "visits",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visits" />
    ),
    cell: ({ row }) => {
      return (
        <div className="max-w-[500px] truncate font-medium hover:text-clip">
          {row.getValue("visits")}
        </div>
      );
    },
  },

  // Actions column
  {
    accessorKey: "actions",
    header: ({ column }) => <div className="text-center"></div>,
    cell: ({ row }) => <div className="text-center"><DataTableRowActions row={row} /></div>,
  },
];
