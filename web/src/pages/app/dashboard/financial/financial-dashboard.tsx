import { FinancialIncomeCard } from "./financial-income-card";
import { FinancialPaymentMethodsCard } from "./financial-payment-methods-card";
import { FinancialTransactionSummaryCard } from "./financial-transactions-summary-card";

export function FinancialDashboard() {
	return (
		<>
			<div className="grid xl:grid-cols-3 gap-4 grid-cols-2">
				<FinancialIncomeCard />

				<div className="gap-4 grid grid-cols-1">
					<FinancialTransactionSummaryCard />
					<FinancialPaymentMethodsCard />
				</div>
			</div>
		</>
	);
}
