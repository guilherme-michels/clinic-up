import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import type { User } from "../../../../../../server/src/schemas";

const users: User[] = [
	{
		id: "m5gr84i9",
		name: "Guilherme Michels",
		avatarUrl: "https://github.com/shadcn.png",
		createdAt: new Date(),
		email: "guilherme.michels@universo.univates.br",
		passwordHash: "a",
		updatedAt: new Date(),
	},
];

export function TeamListMobile() {
	return (
		<div className="space-y-4">
			{users.map((user) => (
				<Card key={user.id}>
					<CardContent className="p-4">
						<div className="flex items-center space-x-4">
							<Avatar className="h-12 w-12">
								<AvatarImage
									src={user.avatarUrl || undefined}
									alt={user.name || ""}
								/>
								<AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
							</Avatar>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium  truncate">{user.name}</p>
								<p className="text-sm text-gray-500 truncate">{user.email}</p>
								<p className="text-xs text-gray-400">
									Cadastrado em: {new Date(user.createdAt).toLocaleDateString()}
								</p>
							</div>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<MoreHorizontal className="h-4 w-4 cursor-pointer hover:opacity-50 transition-all" />
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Ações</DropdownMenuLabel>
									<DropdownMenuItem
										onClick={() => navigator.clipboard.writeText(user.id)}
									>
										Copiar ID
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>Ver detalhes</DropdownMenuItem>
									<DropdownMenuItem>Editar paciente</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
