import { Badge } from "@/components/ui/badge";
import type { RoleType } from "../../../data/schemas/index";

interface RoleBadgeProps {
	role: RoleType;
}

export function RoleBadge({ role }: RoleBadgeProps) {
	const getRoleColor = (role: RoleType) => {
		switch (role) {
			case "ADMIN":
				return "bg-red-500 hover:bg-red-600";
			case "MEMBER":
				return "bg-blue-500 hover:bg-blue-600";
			case "BILLING":
				return "bg-green-500 hover:bg-green-600";
			default:
				return "bg-gray-500 hover:bg-gray-600";
		}
	};

	const getRoleLabel = (role: RoleType) => {
		switch (role) {
			case "ADMIN":
				return "Administrador";
			case "MEMBER":
				return "Membro";
			case "BILLING":
				return "Financeiro";
			default:
				return "Desconhecido";
		}
	};

	return (
		<Badge className={`${getRoleColor(role)} text-white`}>
			{getRoleLabel(role)}
		</Badge>
	);
}
