import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import { ClinicForm } from "./clinic-form/clinic-form";
import { ClinicTabs } from "./clinic-tabs";

export function Clinic() {
	const location = useLocation();
	const isClinicLocation = location.pathname === "/minha-clinica";
	const [isEditing, setIsEditing] = useState(false);

	const handleEditToggle = () => {
		setIsEditing(!isEditing);
	};

	const handleSave = () => {
		setIsEditing(false);
	};

	return (
		<>
			<Helmet title="Clínica" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Clínica
				</h1>

				<div className="w-full justify-between flex">
					<ClinicTabs />

					<Button
						variant="outline"
						size="icon"
						onClick={handleEditToggle}
						className={cn(
							"transition-colors",
							isEditing &&
								"bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
						)}
					>
						<Pencil className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
					</Button>
				</div>

				{isClinicLocation ? (
					<ClinicForm isEditing={isEditing} onSave={handleSave} />
				) : (
					<Outlet />
				)}
			</div>
		</>
	);
}
