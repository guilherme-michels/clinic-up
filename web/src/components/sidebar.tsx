import {
	Calendar,
	Home,
	Settings,
	ShieldHalf,
	Users2,
	ChartNoAxesCombined,
	BadgeDollarSign,
	FileSliders,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

const icons = {
	Home: <Home className="size-4" />,
	Calendar: <Calendar className="size-4" />,
	Team: <ShieldHalf className="size-4" />,
	Patients: <Users2 className="size-4" />,
	Dashboard: <ChartNoAxesCombined className="size-4" />,
	Marketing: <BadgeDollarSign className="size-4" />,
	Clinic: <FileSliders className="size-4" />,
	Settings: <Settings className="size-4" />,
};

interface MenuItem {
	name: string;
	icon: keyof typeof icons;
	link: string;
}

const TooltipItem: React.FC<MenuItem & { isActive: boolean }> = ({
	name,
	icon,
	link,
	isActive,
}) => (
	<TooltipProvider>
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					to={link}
					className={`flex w-full items-center px-2 rounded-lg text-foreground transition-all hover:opacity-80 h-8 ${
						isActive ? "bg-foreground text-muted font-semibold" : ""
					}`}
				>
					{icons[icon]}
					<span className="ml-2 text-sm">{name}</span>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right" className="z-50">
				{name}
			</TooltipContent>
		</Tooltip>
	</TooltipProvider>
);

export const Sidebar: React.FC = () => {
	const location = useLocation();
	const menuItems: MenuItem[] = [
		{
			name: "Página inicial",
			icon: "Home",
			link: "/pagina-inicial",
		},
		{
			name: "Agenda",
			icon: "Calendar",
			link: "/agenda",
		},
		{
			name: "Equipe",
			icon: "Team",
			link: "/equipe",
		},
		{
			name: "Pacientes",
			icon: "Patients",
			link: "/pacientes",
		},
		{
			name: "Análise de dados",
			icon: "Dashboard",
			link: "/analise-dados",
		},
		{
			name: "Marketing",
			icon: "Marketing",
			link: "/marketing",
		},
		{
			name: "Clínica",
			icon: "Clinic",
			link: "/minha-clinica",
		},
		{
			name: "Configurações",
			icon: "Settings",
			link: "/configuracoes",
		},
	];

	return (
		<aside className="fixed inset-y-0 left-0 hidden xl:w-48 w-44 flex-col border-r bg-mesBlue sm:flex z-0 mt-16">
			<nav className="flex flex-col items-center gap-1 sm:py-5 px-2">
				{menuItems.map((item) => (
					<TooltipItem
						key={item.name}
						{...item}
						isActive={location.pathname.startsWith(item.link)}
					/>
				))}
			</nav>
		</aside>
	);
};
