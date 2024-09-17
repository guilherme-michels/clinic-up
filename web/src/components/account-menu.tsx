import { Building, ChevronDown, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { trpc } from "@/App";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

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
						className="flex select-none items-center gap-2 h-10"
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
					<DropdownMenuItem asChild>
						<Link to="minha-clinica">
							<Building className="mr-2 h-4 w-4" />
							Perfil da organização
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<Link to="minha-conta">
							<User className="mr-2 h-4 w-4" />
							<span>Minha conta</span>
						</Link>
					</DropdownMenuItem>

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
