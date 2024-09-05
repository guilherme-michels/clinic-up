import { useForm } from "react-hook-form";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { trpc } from "@/App";
import { useEffect } from "react";

import { anamneseTemplateSchema } from "../../../../../../server/src/zod-types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import type { z } from "zod";

type AnamneseTemplateForm = z.infer<typeof anamneseTemplateSchema>;

interface AnamneseFormModalProps {
	isOpened: boolean;
	onClose: () => void;
	anamneseId?: string;
}

export function AnamneseFormModal({
	isOpened,
	onClose,
	anamneseId,
}: AnamneseFormModalProps) {
	const utils = trpc.useContext();

	const { data: anamneseData, isLoading } =
		trpc.anamnesisTemplate.getById.useQuery(anamneseId as string, {
			enabled: !!anamneseId,
		});

	const { control, handleSubmit, reset } = useForm<AnamneseTemplateForm>({
		resolver: zodResolver(anamneseTemplateSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	const createAnamnese = trpc.anamnesisTemplate.create.useMutation({
		onSuccess: () => {
			toast.success("Template de anamnese criado com sucesso!");
			utils.anamnesisTemplate.invalidate();
			onClose();
		},
		onError: (error) => {
			toast.error(`Erro ao criar template de anamnese: ${error.message}`);
		},
	});

	const updateAnamnese = trpc.anamnesisTemplate.update.useMutation({
		onSuccess: () => {
			toast.success("Template de anamnese atualizado com sucesso!");
			utils.anamnesisTemplate.invalidate();
			onClose();
		},
		onError: (error) => {
			toast.error(`Erro ao atualizar template de anamnese: ${error.message}`);
		},
	});

	useEffect(() => {
		if (anamneseData) {
			console.log("Dados da anamnese recebidos:", anamneseData);
			reset({
				...anamneseData,
				description: anamneseData.description || "",
				createdAt: anamneseData.createdAt
					? new Date(anamneseData.createdAt)
					: undefined,
				updatedAt: anamneseData.updatedAt
					? new Date(anamneseData.updatedAt)
					: undefined,
			});
		} else {
			reset({
				title: "",
				description: "",
			});
		}
	}, [anamneseData, reset]);

	const onSubmit = async (data: AnamneseTemplateForm) => {
		if (anamneseId) {
			const updateData = {
				id: anamneseId,
				title: data.title,
				description: data.description,
			};
			updateAnamnese.mutate(updateData);
		} else {
			const { title, description } = data;
			createAnamnese.mutate({ title, description });
		}
	};

	if (isLoading) {
		return <div>Carregando dados do template de anamnese...</div>;
	}

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogContent className="max-w-2xl">
				<DialogTitle className="text-2xl font-bold mb-4">
					{anamneseId
						? "Editar Template de Anamnese"
						: "Novo Template de Anamnese"}
				</DialogTitle>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormInput
						control={control}
						name="title"
						label="Nome do Template"
						required
					/>

					<FormInput
						control={control}
						name="description"
						label="Descrição"
						required={false}
					/>

					<div className="flex justify-end space-x-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancelar
						</Button>
						<Button type="submit">{anamneseId ? "Atualizar" : "Criar"}</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
