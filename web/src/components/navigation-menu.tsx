import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuTrigger,
	NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ListItemProps {
	href: string;
	title: string;
	children?: React.ReactNode;
}

const ListItem = ({ href, title, children }: ListItemProps) => {
	return (
		<li className="list-none">
			<NavigationMenuLink asChild>
				<Link
					to={href}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
					)}
				>
					<div className="text-sm font-medium leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
						{children}
					</p>
				</Link>
			</NavigationMenuLink>
		</li>
	);
};

export function NavMenu() {
	return (
		<NavigationMenu>
			<NavigationMenuItem>
				<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
				<NavigationMenuContent>
					<ul className="grid gap-2 grid-cols-2 p-2 w-[300px]">
						<ListItem href="/pagina-inicial" title="Página inicial" />
						<ListItem href="/agenda" title="Agenda" />
						<ListItem href="/pacientes" title="Pacientes" />
						<ListItem href="/equipe" title="Equipe" />
						<ListItem href="/analise-dados" title="Análise de dados" />
						<ListItem href="/marketing" title="Marketing" />
						<ListItem href="/minha-clinica" title="Clínica" />
					</ul>
				</NavigationMenuContent>
			</NavigationMenuItem>
		</NavigationMenu>
	);
}
