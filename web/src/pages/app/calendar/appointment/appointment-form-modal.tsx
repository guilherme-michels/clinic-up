import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	type Appointment,
	AppointmentSchema,
} from "../../../../../../server/src/schemas/index";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form-input";
import { AppointmentTabs } from "./appointment-tabs";

interface AppointmentFormModalProps {
	isOpened: boolean;
	onClose: () => void;
	slotInfo?: {
		start: Date;
		end: Date;
		slots: Date[];
		action: "select" | "click" | "doubleClick";
	};
	appointment?: Appointment;
}

export function AppointmentFormModal({
	isOpened,
	onClose,
	slotInfo,
	appointment,
}: AppointmentFormModalProps) {
	const { setValue, control, reset } = useForm<Appointment>({
		resolver: zodResolver(AppointmentSchema),
	});

	const [appointmentType, setAppointmentType] = useState<
		"appointment" | "scheduling"
	>("appointment");

	const defaultSlotInfo = {
		start: null,
		end: null,
		slots: [],
		action: "select",
	};

	const info = slotInfo ?? defaultSlotInfo;

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogClose onClick={onClose} />
			<DialogContent className="max-w-4xl">
				<DialogHeader>
					<DialogTitle className="font-bold flex flex-col text-xl">
						{appointment ? "Editar agendamento" : "Adicionar agendamento"}
					</DialogTitle>
				</DialogHeader>
				<form className="flex flex-col gap-4">
					<div className="flex gap-2">
						<AppointmentTabs />
					</div>

					<FormInput
						control={control}
						name="description"
						label="Descrição"
						required
						placeholder="Selecione o paciente"
					/>

					{/* <div className="items-top flex space-x-2 px-4 p-2">
						<Checkbox id="terms1" />
						<div className="grid gap-1.5 leading-none">
							<label
								htmlFor="terms1"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Enviar confirmação e lembrete de consulta automático.
							</label>
							<p className="text-sm text-muted-foreground">
								O paciente e o responsável receberão lembretes perto da data.
							</p>
						</div>
					</div> */}

					<DialogFooter className="flex w-full justify-between items-center">
						<div className="flex gap-2">
							<Button onClick={onClose} type="button">
								Cancelar
							</Button>
							<Button type="submit">Salvar</Button>
						</div>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
