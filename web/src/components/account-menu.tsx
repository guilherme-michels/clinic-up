import { Building, ChevronDown, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { trpc } from "@/App";

export function AccountMenu() {
	const navigate = useNavigate();
	const { signOut } = useAuth();

	const { data: profile, isLoading: isLoadingProfile } =
		trpc.auth.profile.useQuery();

	const handleSignOut = async () => {
		await signOut();
		navigate("/sign-in", { replace: true });
	};

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="flex select-none items-center gap-2"
					>
						{isLoadingProfile ? (
							<Skeleton className="h-4 w-40" />
						) : (
							profile?.name
						)}
						<ChevronDown className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-24" />
							</div>
						) : (
							<>
								<span>{profile?.name}</span>
								<span className="text-xs font-normal text-muted-foreground">
									{profile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DialogTrigger asChild>
						<DropdownMenuItem>
							<Building className="mr-2 h-4 w-4" />
							<Link to="minha-clinica">Perfil da organização</Link>
						</DropdownMenuItem>
					</DialogTrigger>
					<DropdownMenuItem
						asChild
						className="text-rose-500 dark:text-rose-400"
					>
						<button className="w-full" onClick={handleSignOut} type="button">
							<LogOut className="mr-2 h-4 w-4" />
							<span>Sair</span>
						</button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Dialog>
	);
}
