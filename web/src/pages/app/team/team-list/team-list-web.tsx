import * as React from "react";
import {
	type ColumnDef,
	type ColumnFiltersState,
	type SortingState,
	type VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal, SlidersHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { MemberIncludeSchema } from "../../../../../../server/src/schemas";
import { trpc } from "@/App";
import type { z } from "zod";
import { RoleBadge } from "@/components/role-badge";

type MemberWithIncludes = z.infer<typeof MemberIncludeSchema>;

export const columns: ColumnDef<MemberWithIncludes>[] = [
	{
		id: "avatar",
		cell: ({ row }) => (
			<div className="w-full items-center justify-center flex">
				<Avatar className="size-8">
					<AvatarImage
						src={row.original.user.avatarUrl || undefined}
						alt={row.original.user.name || ""}
					/>
					<AvatarFallback>{row.original.user.name?.charAt(0)}</AvatarFallback>
				</Avatar>
			</div>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		id: "name",
		accessorKey: "user.name",
		header: "Nome",
		cell: ({ row }) => (
			<div className="flex flex-col">
				<span className="font-medium">{row.original.user.name}</span>
				<span className="text-sm text-muted-foreground">
					{row.original.user.email}
				</span>
			</div>
		),
	},
	{
		accessorKey: "role",
		header: "Função",
		cell: ({ row }) => <RoleBadge role={row.original.role} />,
	},
	{
		accessorKey: "createdAt",
		header: "Data de Cadastro",
		cell: ({ row }) => {
			const date = new Date(row.original.user.createdAt);
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const member = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MoreHorizontal className="h-4 w-4 cursor-pointer hover:opacity-50 transition-all" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>
						<DropdownMenuItem asChild>
							<Link to={`/equipe/cadastro/${member.id}`}>Editar</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function TeamListWeb() {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const { data: members, isLoading } = trpc.member.getAll.useQuery();

	const table = useReactTable({
		data: members || [],
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	if (isLoading) return <div>Carregando...</div>;

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrar por nome..."
					value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("name")?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							<SlidersHorizontal className="size-4 mr-2" />
							Colunas <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											key={header.id}
											className={
												header.column.id === "avatar" ||
												header.column.id === "actions"
													? "w-12 max-w-12"
													: ""
											}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell
											key={cell.id}
											className={
												cell.column.id === "avatar" ||
												cell.column.id === "actions"
													? "w-16 max-w-16"
													: ""
											}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									Nenhum resultado encontrado.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Anterior
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Próxima
					</Button>
				</div>
			</div>
		</div>
	);
}
