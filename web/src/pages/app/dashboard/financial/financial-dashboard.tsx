import { FinancialIncomeCard } from "./financial-income-card";
import { FinancialInflowOutflowCard } from "./financial-inflow-outflow-card";
import { FinancialPaymentMethodsCard } from "./financial-payment-methods-card";
import { FinancialTransactionSummaryCard } from "./financial-transactions-summary-card";

export function FinancialDashboard() {
	return (
		<div className="grid gap-4 2xl:grid-cols-3 grid-cols-2">
			<div className="col-span-2 gap-4 flex flex-col">
				<FinancialIncomeCard />
				<FinancialInflowOutflowCard />
			</div>

			<div className="grid grid-cols-2 2xl:grid-cols-1 col-span-2 2xl:col-span-1 gap-4">
				<FinancialTransactionSummaryCard />
				<FinancialPaymentMethodsCard />
			</div>
		</div>
	);
}
