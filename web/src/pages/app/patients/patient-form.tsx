import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Patient, PatientSchema } from "../../../../../data/schemas";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";

export function PatientForm() {
	const { id } = useParams<{ id: string }>();
	const [isLoading, setIsLoading] = useState(false);

	const { control, handleSubmit, reset } = useForm<Patient>({
		resolver: zodResolver(PatientSchema),
		defaultValues: {
			name: "",
			email: null,
			phone: null,
			birthDate: new Date(),
			address: null,
			createdAt: new Date(),
			updatedAt: new Date(),
			organizationId: "",
		},
	});

	useEffect(() => {
		if (id) {
			setIsLoading(true);
			fetchPatient(id).then((data) => {
				reset(data);
				setIsLoading(false);
			});
		}
	}, [id, reset]);

	const onSubmit = (data: Patient) => {
		if (id) {
			console.log("Atualizando paciente:", data);
		} else {
			console.log("Adicionando novo paciente:", data);
		}
	};

	if (isLoading) return <div>Carregando...</div>;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
				<FormInput control={control} name="name" label="Nome" required />
				<FormInput control={control} name="email" label="E-mail" type="email" />
				<FormInput control={control} name="phone" label="Telefone" />

				<FormInput control={control} name="address" label="Endereço" />
			</div>

			<div className="flex justify-end space-x-2">
				<Button type="button" variant="outline">
					Cancelar
				</Button>
				<Button type="submit">
					{id ? "Atualizar Paciente" : "Adicionar Paciente"}
				</Button>
			</div>
		</form>
	);
}

// Função mock para buscar paciente - substitua pela sua implementação real
async function fetchPatient(id: string): Promise<Patient> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				id,
				name: "Paciente Exemplo",
				email: "exemplo@email.com",
				phone: "123456789",
				birthDate: new Date(),
				address: "Rua Exemplo, 123",
				createdAt: new Date(),
				updatedAt: new Date(),
				organizationId: "org123",
			});
		}, 500);
	});
}
