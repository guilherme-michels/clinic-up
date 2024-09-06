import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Patient, PatientSchema } from "../../../../../server/src/schemas";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/App";
import { toast } from "sonner";

export function PatientForm() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const { control, handleSubmit, reset } = useForm<Patient>({
		resolver: zodResolver(PatientSchema),
		defaultValues: {
			name: "",
			email: null,
			phone: null,
			birthDate: new Date(),
			gender: "",
			cpf: "",
			rg: "",
			healthPlan: "",
			address: {
				cep: "",
				street: "",
				number: "",
				complement: "",
				neighborhood: "",
				city: "",
				state: "",
			},
			profession: "",
			responsiblePerson: {
				name: "",
				relationship: "",
				phone: "",
			},
			createdAt: new Date(),
			updatedAt: new Date(),
			organizationId: "",
		},
	});

	const { data: patient, isLoading: isLoadingPatient } =
		trpc.patient.getById.useQuery(id ?? "", {
			enabled: !!id,
		});

	const createMutation = trpc.patient.create.useMutation({
		onSuccess: () => {
			toast.success("Paciente criado com sucesso!");
			navigate("/patients");
		},
		onError: (error: unknown) => {
			if (error instanceof Error) {
				toast.error(`Erro ao criar paciente: ${error.message}`);
			} else {
				toast.error("Erro desconhecido ao criar paciente");
			}
		},
	});

	const updateMutation = trpc.patient.update.useMutation({
		onSuccess: () => {
			toast.success("Paciente atualizado com sucesso!");
			navigate("/patients");
		},
		onError: (error: unknown) => {
			if (error instanceof Error) {
				toast.error(`Erro ao criar paciente: ${error.message}`);
			} else {
				toast.error("Erro desconhecido ao criar paciente");
			}
		},
	});

	useEffect(() => {
		if (patient) {
			reset({
				...patient,
				birthDate: new Date(patient.birthDate),
				createdAt: new Date(patient.createdAt),
				updatedAt: new Date(patient.updatedAt),
			});
		}
	}, [patient, reset]);

	const onSubmit = (data: Patient) => {
		if (id) {
			updateMutation.mutate({ ...data, id });
		} else {
			createMutation.mutate(data);
		}
	};

	if (id && isLoadingPatient) {
		return <div>Carregando...</div>;
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
			<section>
				<h2 className="text-base font-semibold mb-2">Dados Pessoais</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<FormInput
						control={control}
						name="name"
						label="Nome Completo"
						required
					/>
					<FormInput
						control={control}
						name="email"
						label="E-mail"
						type="email"
						required
					/>
					<FormInput control={control} name="phone" label="Telefone" required />
					<FormInput
						control={control}
						name="birthDate"
						label="Data de Nascimento"
						type="date"
						required
					/>
					<FormInput control={control} name="gender" label="Sexo" required />
					<FormInput control={control} name="cpf" label="CPF" required />
					<FormInput control={control} name="rg" label="RG" />
					<FormInput
						control={control}
						name="healthPlan"
						label="Plano de Saúde"
					/>
					<FormInput control={control} name="profession" label="Profissão" />
				</div>
			</section>

			<section>
				<h2 className="text-base font-semibold mb-2">Endereço</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<FormInput
						control={control}
						name="address.cep"
						label="CEP"
						required
					/>
					<FormInput
						control={control}
						name="address.street"
						label="Rua"
						required
					/>
					<FormInput
						control={control}
						name="address.number"
						label="Número"
						required
					/>
					<FormInput
						control={control}
						name="address.complement"
						label="Complemento"
					/>
					<FormInput
						control={control}
						name="address.neighborhood"
						label="Bairro"
						required
					/>
					<FormInput
						control={control}
						name="address.city"
						label="Cidade"
						required
					/>
					<FormInput
						control={control}
						name="address.state"
						label="Estado"
						required
					/>
				</div>
			</section>

			<section>
				<h2 className="text-base font-semibold mb-2">Responsável</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<FormInput
						control={control}
						name="responsiblePerson.name"
						label="Nome do Responsável"
					/>
					<FormInput
						control={control}
						name="responsiblePerson.relationship"
						label="Relação com o Paciente"
					/>
					<FormInput
						control={control}
						name="responsiblePerson.phone"
						label="Telefone do Responsável"
					/>
				</div>
			</section>

			<div className="flex justify-end space-x-2">
				<Button
					type="button"
					variant="outline"
					onClick={() => navigate("/patients")}
				>
					Cancelar
				</Button>
				<Button type="submit">
					{id ? "Atualizar Paciente" : "Adicionar Paciente"}
				</Button>
			</div>
		</form>
	);
}
