import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { FinancialTabs } from "./financial-tabs";
import { FinancialListWeb } from "./financial-list-web";
import { FinancialFormModal } from "./financial-form-modal";

export function Financial() {
	const location = useLocation();
	const isFinancialList = location.pathname === "/financeiro";
	const [isFinancialFormModalOpen, setIsFinancialFormModalOpen] =
		useState(false);

	return (
		<>
			<Helmet title="Financeiro" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Financeiro
				</h1>

				<div className="w-full justify-between items-center flex">
					<FinancialTabs />

					<div className="gap-2 flex items-center">
						<DatePickerWithRange />
					</div>
				</div>

				{isFinancialList ? (
					<FinancialListWeb
						onAddClick={() => setIsFinancialFormModalOpen(true)}
					/>
				) : (
					<Outlet />
				)}

				{isFinancialFormModalOpen && (
					<FinancialFormModal
						isOpened={isFinancialFormModalOpen}
						onClose={() => setIsFinancialFormModalOpen(false)}
					/>
				)}
			</div>
		</>
	);
}
