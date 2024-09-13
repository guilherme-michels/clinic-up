import { useState } from "react";
import {
	Users,
	Cake,
	Calendar,
	AlertCircle,
	ChevronRight,
	Users2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeCardSkeleton } from "./home-card-skeleton";
import { Button } from "@/components/ui/button";
import { trpc } from "@/App";

interface PatientStats {
	totalPatients: number;
	birthdaysThisMonth: number;
	patientsLastSixMonths: number;
	patientsWithOverdueDebts: number;
}

// Dados simulados
const patientStats: PatientStats = {
	totalPatients: 1250,
	birthdaysThisMonth: 15,
	patientsLastSixMonths: 780,
	patientsWithOverdueDebts: 23,
};

interface StatItemProps {
	icon: React.ReactNode;
	label: string;
	value: number;
	onClick: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ icon, label, value, onClick }) => (
	<Button
		variant="ghost"
		className="w-full justify-start text-left hover:bg-muted/50"
		onClick={onClick}
	>
		<div className="flex items-center space-x-2 justify-between w-full">
			<p className="flex gap-2 items-center font-thin">
				{icon}
				{label}
			</p>
			<div>
				<p className="text-base flex items-center gap-4">
					{value}
					<ChevronRight className="h-4 w-4 text-muted-foreground" />
				</p>
			</div>
		</div>
	</Button>
);

export function PatientCard() {
	const { data: stats, isLoading } = trpc.patient.getMetrics.useQuery();

	const handleStatClick = (statName: string) => {
		console.log(`Clicou em ${statName}`);
	};

	return (
		<Card className="h-max-[400px]">
			<CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
				<CardTitle className="font-semibold">
					Informações dos Pacientes
				</CardTitle>
				<Button className="flex items-center gap-2">
					Analisar métricas
					<Users2 className="h-4 w-4 text-muted" />
				</Button>
			</CardHeader>
			<CardContent className="space-y-4 overflow-y-auto">
				{!isLoading && stats ? (
					<>
						<StatItem
							icon={<Users className="h-4 w-4 text-muted-foreground" />}
							label="Total de Pacientes"
							value={stats.totalPatients}
							onClick={() => handleStatClick("Total de Pacientes")}
						/>
						<StatItem
							icon={<Cake className="h-4 w-4 text-muted-foreground" />}
							label="Aniversariantes do Mês"
							value={stats.birthdaysThisMonth}
							onClick={() => handleStatClick("Aniversariantes do Mês")}
						/>
						<StatItem
							icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
							label="Atendidos (últimos 6 meses)"
							value={stats.recentlyAttended}
							onClick={() => handleStatClick("Atendidos (últimos 6 meses)")}
						/>
						<StatItem
							icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
							label="Pacientes com Débitos"
							value={stats.patientsWithDebts}
							onClick={() => handleStatClick("Pacientes com Débitos")}
						/>
					</>
				) : (
					<HomeCardSkeleton />
				)}
			</CardContent>
		</Card>
	);
}
