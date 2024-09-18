import { CreditCard, DollarSign, PlusCircle } from "lucide-react";
import { FinancialCard } from "./financial-control-card";

export function FinancialHeader() {
	const totalToReceive = 0;
	const totalToPay = 0;
	const dailyBalance = 0;

	const handleConfirmReceive = () => {
		console.log("Recebimento confirmado");
	};

	const handlePayExpenses = () => {
		console.log("Despesas pagas");
	};

	const handleAddTransaction = () => {
		console.log("Adicionar lançamento");
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
			<FinancialCard
				title="Controle Financeiro"
				valueLabel="Valor total a receber hoje"
				value={totalToReceive}
				buttonLabel="Confirmar recebimento"
				buttonIcon={DollarSign}
				onButtonClick={handleConfirmReceive}
				cardType="entrada"
			/>
			<FinancialCard
				title="Despesas"
				valueLabel="Valor total a pagar hoje"
				value={totalToPay}
				buttonLabel="Pagar despesas"
				buttonIcon={CreditCard}
				onButtonClick={handlePayExpenses}
				cardType="despesa"
			/>
			<FinancialCard
				title="Balanço Diário"
				valueLabel="Saldo do dia"
				value={dailyBalance}
				buttonLabel="Adicionar lançamento"
				buttonIcon={PlusCircle}
				onButtonClick={handleAddTransaction}
				cardType="saldo"
			/>
		</div>
	);
}
