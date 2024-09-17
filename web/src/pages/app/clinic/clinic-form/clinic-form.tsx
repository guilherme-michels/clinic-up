import { trpc } from "@/App";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	type OrganizationFormSchema,
	createOrganization,
} from "../../../../../../server/src/zod-types/schemas";

interface ClinicFormProps {
	isEditing: boolean;
	onSave: () => void;
}

export function ClinicForm({ isEditing, onSave }: ClinicFormProps) {
	const { data: clinicData, isLoading } =
		trpc.organization.getCurrentUserOrganization.useQuery();
	const updateClinicData = trpc.organization.update.useMutation({
		onSuccess: () => {
			toast.success("Dados da clínica atualizados com sucesso!");
			onSave();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (error: any) => {
			toast.error(`Erro ao atualizar dados: ${error.message}`);
		},
	});

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<OrganizationFormSchema>({
		resolver: zodResolver(createOrganization),
		defaultValues: {
			name: "",
			slug: "",
			cnpj: "",
			email: "",
			phone: "",
			address: "",
			city: "",
			state: "",
			zipCode: "",
			website: "",
			businessHours: {} as { [key: string]: string | undefined },
			facebookUrl: "",
			instagramUrl: "",
			linkedinUrl: "",
			twitterUrl: "",
		},
	});

	useEffect(() => {
		if (clinicData) {
			reset({
				...clinicData,
				createdAt: new Date(clinicData.createdAt),
				updatedAt: new Date(clinicData.updatedAt),
				businessHours:
					typeof clinicData.businessHours === "string"
						? JSON.parse(clinicData.businessHours)
						: clinicData.businessHours || {},
			});
		}
	}, [clinicData, reset]);

	const onSubmit = (data: OrganizationFormSchema) => {
		updateClinicData.mutate(data);
	};

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
					<FormInput
						control={control}
						name="cnpj"
						label="CNPJ"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="email"
						label="E-mail"
						type="email"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="phone"
						label="Telefone"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="address"
						label="Endereço"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="city"
						label="Cidade"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="state"
						label="Estado"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="zipCode"
						label="CEP"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="website"
						label="Website"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="facebookUrl"
						label="Facebook URL"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="instagramUrl"
						label="Instagram URL"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="linkedinUrl"
						label="LinkedIn URL"
						required
						disabled={!isEditing}
					/>
					<FormInput
						control={control}
						name="twitterUrl"
						label="Twitter URL"
						required
						disabled={!isEditing}
					/>
				</div>

				{isEditing && (
					<div className="flex justify-end space-x-2">
						<Button type="button" variant="outline" onClick={onSave}>
							Cancelar
						</Button>
						<Button type="submit" onClick={() => console.log(errors)}>
							Salvar
						</Button>
					</div>
				)}
			</form>
		</div>
	);
}
