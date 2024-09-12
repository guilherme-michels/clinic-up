import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	type AppointmentFormSchema,
	createAppointment,
	updateAppointment,
} from "../../../../../../server/src/zod-types/schemas";

import { FormDatePicker } from "@/components/date-picker";
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

import { format } from "date-fns";
import { toast } from "sonner";
import { trpc } from "@/App";

interface AppointmentFormModalProps {
	isOpened: boolean;
	onClose: () => void;
	slotInfo?: {
		start: Date;
		end: Date;
		slots: Date[];
		action: "select" | "click" | "doubleClick";
	};
	appointment?: AppointmentFormSchema & { id: string };
}

export function AppointmentFormModal({
	isOpened,
	onClose,
	slotInfo,
	appointment,
}: AppointmentFormModalProps) {
	const utils = trpc.useContext();
	const createMutation = trpc.appointment.create.useMutation({
		onSuccess: () => {
			toast.success("Consulta criada com sucesso!");
			utils.appointment.invalidate();
			onClose();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (error: any) => {
			toast.error(`Erro ao criar consulta: ${error.message}`);
		},
	});

	const updateMutation = trpc.appointment.update.useMutation({
		onSuccess: () => {
			toast.success("Consulta atualizada com sucesso!");
			utils.appointment.invalidate();
			onClose();
		},
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		onError: (error: any) => {
			toast.error(`Erro ao atualizar consulta: ${error.message}`);
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<AppointmentFormSchema>({
		resolver: zodResolver(appointment ? updateAppointment : createAppointment),
		defaultValues: appointment || {
			type: "CONSULTATION",
			status: "SCHEDULED",
			description: "",
			consultationDate: slotInfo?.start || new Date(),
			consultationStartTime: slotInfo?.start
				? format(slotInfo.start, "HH:mm")
				: "",
			consultationEndTime: slotInfo?.end ? format(slotInfo.end, "HH:mm") : "",
			patientId: "b57ba013-a783-418c-8a24-9ffe88db01f5",
			memberId: "0442ade8-8aa7-4a89-a61d-8e99b0d8085a",
			userId: "0442ade8-8aa7-4a89-a61d-8e99b0d8085a",
		},
	});

	const onSubmit = (data: AppointmentFormSchema) => {
		const formattedData = {
			...data,
			consultationDate: data.consultationDate
				? new Date(data.consultationDate)
				: null,
			consultationStartTime: data.consultationStartTime || null,
			consultationEndTime: data.consultationEndTime || null,
		};

		if (appointment) {
			updateMutation.mutate({ id: appointment.id, ...formattedData });
		} else {
			createMutation.mutate(formattedData);
		}
	};

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogClose onClick={onClose} />
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle className="font-bold flex flex-col text-xl">
						{appointment ? "Editar consulta" : "Adicionar consulta"}
					</DialogTitle>
					<DialogDescription>
						Preencha os detalhes da consulta abaixo.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<FormInput
						control={control}
						name="description"
						label="Descrição"
						required
					/>
					<FormDatePicker
						control={control}
						name="consultationDate"
						label="Data da Consulta"
						required
					/>
					<FormInput
						control={control}
						name="consultationStartTime"
						label="Horário de Início"
						type="time"
						mask="time"
						required
					/>
					<FormInput
						control={control}
						name="consultationEndTime"
						label="Horário de Término"
						type="time"
						mask="time"
						required
					/>
					<FormInput
						control={control}
						name="patientId"
						label="ID do Paciente"
						required
					/>
					<FormInput
						control={control}
						name="memberId"
						label="ID do Membro"
						required
					/>
					<FormInput
						control={control}
						name="userId"
						label="ID do Usuário"
						required
					/>
					<DialogFooter className="flex w-full justify-between items-center">
						<div className="flex gap-2">
							<Button onClick={onClose} type="button">
								Cancelar
							</Button>
							<Button type="submit" onClick={() => console.log(errors)}>
								{appointment ? "Atualizar" : "Criar"}
							</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
