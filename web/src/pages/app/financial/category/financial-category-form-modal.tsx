import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	type TransactionCategoryFormSchema,
	createTransactionCategory,
} from "../../../../../../server/src/zod-types/schemas";

import { FormInput } from "@/components/form-input";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import { trpc } from "@/App";

interface FinancialCategoryFormModalProps {
	isOpened: boolean;
	onClose: () => void;
}

export function FinancialCategoryFormModal({
	isOpened,
	onClose,
}: FinancialCategoryFormModalProps) {
	const utils = trpc.useContext();
	const createMutation = trpc.transactionCategory.create.useMutation({
		onSuccess: () => {
			toast.success("Categoria financeira criada com sucesso!");
			utils.transactionCategory.invalidate();
			onClose();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (error: any) => {
			toast.error(`Erro ao criar categoria financeira: ${error.message}`);
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TransactionCategoryFormSchema>({
		resolver: zodResolver(createTransactionCategory),
		defaultValues: {},
	});

	const onSubmit = (data: TransactionCategoryFormSchema) => {
		createMutation.mutate(data);
	};

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogClose onClick={onClose} />
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle className="font-bold flex flex-col text-xl">
						Adicionar Categoria de Finanças
					</DialogTitle>
					<DialogDescription>
						Preencha os detalhes da categoria financeira abaixo.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<FormInput
							control={control}
							name="name"
							label="Descrição"
							required
						/>
					</div>

					<DialogFooter className="flex w-full justify-between items-center">
						<div className="flex gap-2">
							<Button onClick={onClose} type="button">
								Cancelar
							</Button>
							<Button type="submit">Adicionar</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
