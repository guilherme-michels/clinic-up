import { useState } from "react";

import {
	ChevronDown,
	Edit,
	Eye,
	MoreHorizontal,
	SlidersHorizontal,
} from "lucide-react";

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

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { trpc } from "@/App";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { truncateText } from "@/utils";
import type { AnamnesisTemplate } from "../../../../../../server/src/schemas";
import { AnamneseFormModal } from "./anamnese-form-modal";
import { AnamneseModal } from "./anamnese-modal";

export function AnamneseList() {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [isAnamneseQuestionsModalOpen, setIsAnamneseQuestionsModalOpen] =
		useState(false);
	const [selectedAnamneseId, setSelectedAnamneseId] = useState<string | null>(
		null,
	);
	const [isAnamneseFormModalOpen, setIsAnamneseFormModalOpen] = useState(false);

	const { data: anamneses, isLoading } =
		trpc.anamnesisTemplate.getSummary.useQuery();

	const columns: ColumnDef<AnamnesisTemplate>[] = [
		{
			accessorKey: "title",
			header: "Título",
			cell: ({ row }) => {
				const title = row.getValue("title") as string;
				return truncateText(title, 20);
			},
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
							<MoreHorizontal className="h-4 w-4 cursor-pointer hover:opacity-50 transition-all" />
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => {
									setSelectedAnamneseId(anamnese.id);
									setIsAnamneseQuestionsModalOpen(true);
								}}
							>
								<Eye className="mr-2 h-4 w-4" />
								Visualizar
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => {
									setSelectedAnamneseId(anamnese.id);
									setIsAnamneseFormModalOpen(true);
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

	const handleEditClick = (id: string) => {
		setSelectedAnamneseId(id);
		setIsAnamneseFormModalOpen(true);
	};

	const closeAnamneseFormModal = () => {
		setIsAnamneseFormModalOpen(false);
		setSelectedAnamneseId(null);
	};

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
						setIsAnamneseFormModalOpen(true);
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
			<div className="flex items-center justify-between space-x-2 py-4">
				<div className="text-sm text-muted-foreground">
					Página {table.getState().pagination.pageIndex + 1} de{" "}
					{table.getPageCount()}
				</div>
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

			{selectedAnamneseId && isAnamneseQuestionsModalOpen && (
				<AnamneseModal
					isOpened={isAnamneseQuestionsModalOpen}
					onClose={() => {
						setIsAnamneseQuestionsModalOpen(false);
						setSelectedAnamneseId(null);
					}}
					anamneseId={selectedAnamneseId}
				/>
			)}

			{isAnamneseFormModalOpen && (
				<AnamneseFormModal
					isOpened={isAnamneseFormModalOpen}
					onClose={closeAnamneseFormModal}
					anamneseId={selectedAnamneseId}
				/>
			)}
		</div>
	);
}
