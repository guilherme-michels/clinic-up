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
import {
	ArrowDownLeft,
	ArrowUpRight,
	ChevronDown,
	MoreHorizontal,
	SlidersHorizontal,
} from "lucide-react";
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
import { trpc } from "@/App";
import type {
	FinancialTransaction,
	PaymentMethodType,
} from "../../../../../server/src/schemas";
import { PaymentMethodBadge } from "@/components/payment-methods-badge";

interface FinancialListWebProps {
	onAddClick: () => void;
}

export const columns: ColumnDef<FinancialTransaction>[] = [
	{
		accessorKey: "date",
		header: "Data",
		cell: ({ row }) => {
			const date = new Date(row.getValue("date"));
			return <div>{date.toLocaleDateString()}</div>;
		},
	},
	{
		accessorKey: "description",
		header: "Descrição",
	},
	{
		accessorKey: "amount",
		header: "Valor",
		cell: ({ row }) => {
			const amount = Number.parseFloat(row.getValue("amount"));
			const formatted = new Intl.NumberFormat("pt-BR", {
				style: "currency",
				currency: "BRL",
			}).format(amount);
			return <div>{formatted}</div>;
		},
	},
	{
		accessorKey: "type",
		header: "Tipo",
		cell: ({ row }) => {
			const type = row.getValue("type") as "INCOME" | "EXPENSE";
			return (
				<div>
					{type === "INCOME" ? (
						<div className="flex items-center text-green-600">
							<ArrowUpRight />
							Entrada
						</div>
					) : (
						<div className="flex items-center text-red-500">
							<ArrowDownLeft />
							Saída
						</div>
					)}
				</div>
			);
		},
	},
	{
		accessorKey: "paymentMethod",
		header: "Método de Pagamento",
		cell: ({ row }) => {
			const method = row.getValue("paymentMethod") as PaymentMethodType;
			return <PaymentMethodBadge method={method} />;
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const transaction = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<MoreHorizontal className="h-4 w-4 cursor-pointer hover:opacity-50 transition-all" />
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Ações</DropdownMenuLabel>
						<DropdownMenuItem asChild>
							<Link to={`/financeiro/editar/${transaction.id}`}>Editar</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link to={`/financeiro/${transaction.id}`}>Ver</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function FinancialListWeb({ onAddClick }: FinancialListWebProps) {
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});

	const { data: transactions, isLoading } =
		trpc.financialTransaction.getAll.useQuery();

	const table = useReactTable({
		data: transactions || [],
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

	return (
		<div className="w-full">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filtrar por descrição..."
					value={
						(table.getColumn("description")?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table.getColumn("description")?.setFilterValue(event.target.value)
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
				<Button className="ml-4" onClick={onAddClick}>
					Adicionar
				</Button>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
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
										<TableCell key={cell.id}>
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
									Nenhuma transação encontrada.
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
