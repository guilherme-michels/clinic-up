import { AppointmentStatusBadge } from "@/components/appointment-status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface PatientData {
	nome: string;
	celular: string;
	endereco: string;
	email: string;
	plano: {
		nome: string;
		numero: string;
	};
	dataNascimento: string;
	cpf: string;
}

const testPatientData: PatientData = {
	nome: "Maria Silva",
	celular: "(11) 98765-4321",
	endereco: "Rua das Flores, 123 - São Paulo, SP",
	email: "maria.silva@email.com",
	plano: {
		nome: "Plano Saúde Total",
		numero: "987654321",
	},
	dataNascimento: "15/05/1985",
	cpf: "123.456.789-00",
};

interface Appointment {
	data: string;
	status: "SCHEDULED" | "CANCELED" | "COMPLETED";
	nomePaciente: string;
}

const testAppointments: Appointment[] = [
	{ data: "2023-06-15", status: "SCHEDULED", nomePaciente: "Maria Silva" },
	{ data: "2023-07-20", status: "CANCELED", nomePaciente: "Maria Silva" },
	{ data: "2023-06-15", status: "SCHEDULED", nomePaciente: "Maria Silva" },
	{ data: "2023-07-20", status: "CANCELED", nomePaciente: "Maria Silva" },
	{ data: "2023-06-15", status: "SCHEDULED", nomePaciente: "Maria Silva" },
	{ data: "2023-07-20", status: "CANCELED", nomePaciente: "Maria Silva" },
	{ data: "2023-06-15", status: "SCHEDULED", nomePaciente: "Maria Silva" },
	{ data: "2023-07-20", status: "CANCELED", nomePaciente: "Maria Silva" },
];

export function PatientAbout() {
	const patient = testPatientData;
	const appointments = testAppointments;

	return (
		<div className="w-full grid-cols-1 2xl:grid-cols-2 grid gap-4">
			<Card className="h-fit">
				<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-semibold">Dados pessoais</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 overflow-y-auto">
					<div className="grid grid-cols-2 gap-2">
						<InfoItem label="Nome" value={patient.nome} />
						<InfoItem label="Celular" value={patient.celular} />
						<InfoItem label="Endereço" value={patient.endereco} />
						<InfoItem label="E-mail" value={patient.email} />
						<InfoItem
							label="Data de Nascimento"
							value={patient.dataNascimento}
						/>
						<InfoItem label="CPF" value={patient.cpf} />
					</div>
				</CardContent>

				<CardHeader className="flex-row items-center justify-between space-y-0 pb-2 pt-0">
					<CardTitle className="font-semibold">Plano</CardTitle>
				</CardHeader>

				<CardContent className="space-y-4 overflow-y-auto">
					<div className="grid grid-cols-2 gap-2">
						<InfoItem label="Plano de Saúde" value={patient.plano.nome} />
						<InfoItem label="Número do Plano" value={patient.plano.numero} />
					</div>
				</CardContent>
			</Card>

			<Card className="h-fit">
				<CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="font-semibold">Consultas</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4 overflow-y-auto flex flex-col max-h-[300px]">
					{appointments.map((appointment) => (
						<AppointmentItem key={appointment.data} appointment={appointment} />
					))}
				</CardContent>
			</Card>
		</div>
	);
}

function AppointmentItem({ appointment }: { appointment: Appointment }) {
	return (
		<div className="flex items-center justify-between px-3 py-2 border">
			<div className="flex-1">
				<p className="text-sm font-medium">
					{new Date(appointment.data).toLocaleDateString("pt-BR")}
				</p>
			</div>
			<div className="flex-1">
				<AppointmentStatusBadge status={appointment.status} />
			</div>
			<div className="flex-1">
				<p className="text-sm">{appointment.nomePaciente}</p>
			</div>
			<Button className="flex items-center gap-2">
				<Calendar size={16} />
				Ver na agenda
			</Button>
		</div>
	);
}

function InfoItem({ label, value }: { label: string; value: string }) {
	return (
		<div>
			<p className="text-sm font-medium text-zinc-300">{label}</p>
			<p className="text-sm">{value}</p>
		</div>
	);
}
