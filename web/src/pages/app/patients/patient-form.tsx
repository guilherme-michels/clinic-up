import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/form-input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/App";
import { toast } from "sonner";
import { FormSelect } from "@/components/form-select";
import {
	createPatient,
	type PatientFormSchema,
} from "../../../../../server/src/zod-types/schemas";
import { useEffect } from "react";
import { format, parse, isValid } from "date-fns";

export function PatientForm() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<PatientFormSchema>({
		resolver: zodResolver(createPatient),
		defaultValues: {},
	});

	const { data: patient, isLoading: isLoadingPatient } =
		trpc.patient.getById.useQuery(id ?? "", {
			enabled: !!id,
		});

	useEffect(() => {
		if (patient) {
			for (const [key, value] of Object.entries(patient)) {
				if (key === "birthDate" && value) {
					const formattedDate = format(new Date(value), "dd/MM/yyyy");
					setValue("birthDate", formattedDate);
				} else {
					setValue(key as keyof PatientFormSchema, value ?? "");
				}
			}
		}
	}, [patient, setValue]);

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
			navigate("/pacientes");
		},
		onError: (error: unknown) => {
			if (error instanceof Error) {
				toast.error(`Erro ao atualizar paciente: ${error.message}`);
			} else {
				toast.error("Erro desconhecido ao atualizar paciente");
			}
		},
	});

	const onSubmit = (data: PatientFormSchema) => {
		const formattedData = {
			...data,
			birthDate: data.birthDate
				? (() => {
						const parsedDate = parse(data.birthDate, "dd/MM/yyyy", new Date());
						return isValid(parsedDate) ? parsedDate.toISOString() : undefined;
					})()
				: undefined,
		};

		if (id) {
			updateMutation.mutate({ ...formattedData, id });
		} else {
			createMutation.mutate(formattedData);
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
						required
						type="date"
						mask="date"
					/>

					<FormSelect
						control={control}
						name="gender"
						label="Sexo"
						options={[
							{ value: "MALE", name: "Masculino" },
							{ value: "FEMALE", name: "Feminino" },
							{ value: "OTHER", name: "Outro" },
						]}
						required
					/>

					<FormInput
						control={control}
						name="cpf"
						label="CPF"
						required
						mask="cpf"
					/>
					<FormInput
						control={control}
						name="rg"
						label="RG"
						required
						mask="rg"
					/>
					<FormSelect
						control={control}
						name="healthPlan"
						label="Plano de Saúde"
						options={[{ value: "PARTICULAR", name: "Particular" }]}
					/>
					<FormInput
						control={control}
						name="profession"
						label="Profissão"
						required
					/>
				</div>
			</section>

			<section>
				<h2 className="text-base font-semibold mb-2">Endereço</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<FormInput control={control} name="cep" label="CEP" required />
					<FormInput control={control} name="street" label="Rua" required />
					<FormInput control={control} name="number" label="Número" required />
					<FormInput
						control={control}
						name="complement"
						label="Complemento"
						required
					/>
					<FormInput
						control={control}
						name="neighborhood"
						label="Bairro"
						required
					/>
					<FormInput control={control} name="city" label="Cidade" required />
					<FormInput control={control} name="state" label="Estado" required />
				</div>
			</section>

			<section>
				<h2 className="text-base font-semibold mb-2">Responsável</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
					<FormInput
						control={control}
						name="responsibleName"
						label="Nome do Responsável"
						required
					/>
					<FormInput
						control={control}
						name="responsiblePhone"
						label="Telefone do Responsável"
						required
					/>
				</div>
			</section>

			<div className="flex justify-between space-x-2">
				{id ? (
					<Button type="button" onClick={() => navigate(`/pacientes/${id}`)}>
						Verificar perfil
					</Button>
				) : (
					<div />
				)}

				<div className="flex items-center gap-4">
					<Button
						type="button"
						variant="outline"
						onClick={() => navigate("/pacientes")}
					>
						Cancelar
					</Button>
					<Button type="submit" onClick={() => console.log(errors)}>
						{id ? "Atualizar Paciente" : "Adicionar Paciente"}
					</Button>
				</div>
			</div>
		</form>
	);
}
