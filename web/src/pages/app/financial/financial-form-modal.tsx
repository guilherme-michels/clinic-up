import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
	type FinancialTransactionFormSchema,
	createFinancialTransaction,
} from "../../../../../server/src/zod-types/schemas";

import { FormDatePicker } from "@/components/date-picker";
import { FormInput } from "@/components/form-input";
import { FormSelect } from "@/components/form-select";

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

import { trpc } from "@/App";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import type { FinancialTransaction } from "../../../../../server/src/schemas";

interface FinancialFormModalProps {
	isOpened: boolean;
	onClose: () => void;
	transaction?: FinancialTransaction;
}

export function FinancialFormModal({
	isOpened,
	onClose,
	transaction,
}: FinancialFormModalProps) {
	const [isPatientEnabled, setIsPatientEnabled] = useState(
		!!transaction?.patientId,
	);

	const utils = trpc.useContext();
	const createMutation = trpc.financialTransaction.create.useMutation({
		onSuccess: () => {
			toast.success("Transação financeira criada com sucesso!");
			utils.financialTransaction.invalidate();
			onClose();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (error: any) => {
			toast.error(`Erro ao criar transação financeira: ${error.message}`);
		},
	});

	const updateMutation = trpc.financialTransaction.update.useMutation({
		onSuccess: () => {
			toast.success("Transação financeira atualizada com sucesso!");
			utils.financialTransaction.invalidate();
			onClose();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (error: any) => {
			toast.error(`Erro ao atualizar transação financeira: ${error.message}`);
		},
	});

	const { data: categories } = trpc.transactionCategory.getAll.useQuery();

	const { data: patients } = trpc.patient.getAll.useQuery(undefined, {
		enabled: isPatientEnabled,
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<FinancialTransactionFormSchema>({
		resolver: zodResolver(createFinancialTransaction),
		defaultValues: transaction
			? {
					...transaction,
					date: new Date(transaction.date),
				}
			: {
					paymentMethod: "CREDIT_CARD",
					type: "INCOME",
					date: new Date(),
					patientId: "",
				},
	});

	const transactionType = useWatch({
		control,
		name: "type",
	});

	const onSubmit = (data: FinancialTransactionFormSchema) => {
		if (!isPatientEnabled) {
			data.patientId = null;
		}
		if (transaction) {
			updateMutation.mutate({ ...data, id: transaction.id });
		} else {
			createMutation.mutate(data);
		}
	};

	const handlePatientSwitch = (checked: boolean) => {
		setIsPatientEnabled(checked);
		if (!checked) {
			setValue("patientId", "");
		}
	};

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogClose onClick={onClose} />
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle className="font-bold flex flex-col text-xl">
						{transaction ? "Editar" : "Adicionar"} Transação Financeira
					</DialogTitle>
					<DialogDescription>
						Preencha os detalhes da transação financeira abaixo.
					</DialogDescription>
					<DialogDescription>
						{transaction ? "Edite" : "Adicione"} a transação financeira.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<div className="grid grid-cols-2 items-center gap-4">
						<FormSelect
							control={control}
							name="type"
							label="Tipo de Transação"
							options={[
								{ value: "INCOME", name: "Receita" },
								{ value: "EXPENSE", name: "Despesa" },
							]}
							required
						/>
						<FormSelect
							control={control}
							name="paymentMethod"
							label="Método de Pagamento"
							options={[
								{ value: "CASH", name: "Dinheiro" },
								{ value: "CREDIT_CARD", name: "Cartão de Crédito" },
								{ value: "DEBIT_CARD", name: "Cartão de Débito" },
								{ value: "BANK_TRANSFER", name: "Transferência Bancária" },
								{ value: "PIX", name: "PIX" },
								{ value: "OTHER", name: "Outro" },
							]}
							required
						/>

						<FormInput
							control={control}
							name="description"
							label="Descrição"
							required
						/>

						<FormInput
							control={control}
							name="amount"
							label="Valor"
							type="number"
							required
						/>
					</div>

					<FormDatePicker
						control={control}
						name="date"
						label="Data da Transação"
						required
					/>

					<div className="flex items-center space-x-2">
						<Switch
							checked={isPatientEnabled}
							onCheckedChange={handlePatientSwitch}
						/>
						<label htmlFor="patient-switch" className="text-sm">
							Associar a um paciente
						</label>
					</div>

					{isPatientEnabled && (
						<FormSelect
							control={control}
							name="patientId"
							label="Paciente"
							options={
								patients?.map((patient) => ({
									value: patient.id,
									name: patient.name,
								})) || []
							}
							required
						/>
					)}

					<FormSelect
						control={control}
						name="categoryId"
						label="Categoria"
						options={
							categories?.map((category) => ({
								value: category.id,
								name: category.name,
							})) || []
						}
						required
					/>

					<DialogFooter className="flex w-full justify-between items-center">
						<div className="flex gap-2">
							<Button onClick={onClose} type="button">
								Cancelar
							</Button>
							<Button type="submit">
								{transaction ? "Atualizar" : "Criar"}
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
