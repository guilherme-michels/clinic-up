import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { trpc } from "@/App";
import {
	type Organization,
	OrganizationSchema,
} from "../../../../../../server/src/schemas";

interface AnamneseQuestionFormModalProps {
	isEditing: boolean;
	onSave: () => void;
}

export function AnamneseQuestionFormModal({
	isEditing,
	onSave,
}: AnamneseQuestionFormModalProps) {
	const { data: clinicData, isLoading } =
		trpc.organization.getCurrentUserOrganization.useQuery();
	const updateClinicData = trpc.organization.update.useMutation({
		onSuccess: () => {
			toast.success("Dados da clínica atualizados com sucesso!");
		},
		onError: (error) => {
			toast.error(`Erro ao atualizar dados: ${error.message}`);
		},
	});

	const { control, handleSubmit } = useForm<Organization>({
		resolver: zodResolver(OrganizationSchema),
		defaultValues: clinicData
			? {
					...clinicData,
					createdAt: new Date(clinicData.createdAt),
					updatedAt: new Date(clinicData.updatedAt),
				}
			: {},
	});

	const onSubmit = (data: Organization) => {
		updateClinicData.mutate(data);
		onSave(); // Chama a função onSave após a mutação bem-sucedida
	};

	if (isLoading) {
		return <div>Carregando dados da clínica...</div>;
	}

	return (
		<div className="mx-auto w-full">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
					<FormInput
						control={control}
						name="name"
						label="Nome da Clínica"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="slug"
						label="Slug"
						required
						disabled={!isEditing}
					/>
				</div>

				{isEditing && (
					<div className="flex justify-end space-x-2">
						<Button type="button" variant="outline" onClick={onSave}>
							Cancelar
						</Button>
						<Button type="submit">Salvar</Button>
					</div>
				)}
			</form>
		</div>
	);
}
