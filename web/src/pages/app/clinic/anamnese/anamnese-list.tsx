import { useState } from "react";

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
	ChevronDown,
	MoreHorizontal,
	SlidersHorizontal,
	Eye,
	Edit,
} from "lucide-react";

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
import type { AnamnesisTemplate } from "../../../../../../server/src/schemas";
import { AnamneseModal } from "./anamnese-modal";
import { AnamneseFormModal } from "./anamnese-form-modal";

export function AnamneseList() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const [anamneseFormModalOpen, setAnamneseFormModalOpen] = useState(false);

	const [selectedAnamneseId, setSelectedAnamneseId] = useState<string | null>(
		null,
	);

	const { data: anamneses, isLoading } =
		trpc.anamnesisTemplate.getAll.useQuery();

	const columns: ColumnDef<AnamnesisTemplate>[] = [
		{
			accessorKey: "title",
			header: "Título",
		},
		{
			accessorKey: "description",
			header: "Descrição",
			cell: ({ row }) => row.getValue("description") || "N/A",
		},
		{
			accessorKey: "createdAt",
			header: "Data de Criação",
			cell: ({ row }) => {
				const date = row.getValue("createdAt") as string;
				return new Date(date).toLocaleDateString();
			},
		},
		{
			accessorKey: "updatedAt",
			header: "Última Atualização",
			cell: ({ row }) => {
				const date = row.getValue("updatedAt") as string;
				return new Date(date).toLocaleDateString();
			},
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const anamnese = row.original;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Abrir menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => {
									setSelectedAnamneseId(anamnese.id);
									setModalOpen(true);
								}}
							>
								<Eye className="mr-2 h-4 w-4" />
								Visualizar
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setSelectedAnamneseId(anamnese.id);
									setAnamneseFormModalOpen(true);
								}}
							>
								<Edit className="mr-2 h-4 w-4" />
								Editar
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];

	const table = useReactTable({
		data: anamneses || [],
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
					placeholder="Filtrar por título..."
					value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
					onChange={(event) =>
						table.getColumn("title")?.setFilterValue(event.target.value)
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

				<Button
					className="ml-4"
					onClick={() => {
						setSelectedAnamneseId(null);
						setAnamneseFormModalOpen(true);
					}}
				>
					Adicionar
				</Button>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
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
			<AnamneseModal
				isOpened={modalOpen}
				onClose={() => {
					setModalOpen(false);
					setSelectedAnamneseId(null);
				}}
				anamneseId={selectedAnamneseId ?? ""}
			/>

			<AnamneseFormModal
				isOpened={anamneseFormModalOpen}
				onClose={() => {
					setAnamneseFormModalOpen(false);
					setSelectedAnamneseId(null);
				}}
				anamneseId={selectedAnamneseId ?? ""}
			/>
		</div>
	);
}
