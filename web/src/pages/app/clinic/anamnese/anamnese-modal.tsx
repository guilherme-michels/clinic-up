import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/App";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlignJustify, MoreHorizontal } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { QuestionTypeType } from "../../../../../../server/src/schemas";

interface AnamneseModalProps {
	isOpened: boolean;
	onClose: () => void;
	anamneseId: string;
}

function questionType(tipo: QuestionTypeType): string {
	const traducoes = {
		TEXT: "Texto",
		BOOLEAN: "Sim/Não",
		MULTIPLE_CHOICE: "Múltipla Escolha",
		SINGLE_CHOICE: "Escolha Única",
		NUMBER: "Número",
		DATE: "Data",
	};
	return traducoes[tipo] || tipo;
}

export function AnamneseModal({
	isOpened,
	onClose,
	anamneseId,
}: AnamneseModalProps) {
	const { data: anamnese, isLoading } = trpc.anamnesisTemplate.getById.useQuery(
		anamneseId,
		{ enabled: !!anamneseId },
	);

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogContent className="max-w-6xl">
				<DialogHeader>
					<DialogTitle>Perguntas da Anamnese</DialogTitle>
				</DialogHeader>
				<div className="mt-4 max-h-[500px] overflow-y-auto">
					{isLoading ? (
						<div />
					) : anamnese?.questions?.length ? (
						<>
							{anamnese.questions.map((question) => (
								<Card key={question.id} className="mb-2">
									<CardHeader className="flex items-center gap-1 space-y-0 border-b py-2 sm:flex-row">
										<AlignJustify className="mr-4" size={18} />
										<div className="grid flex-1 gap-1 text-center sm:text-left">
											<CardTitle>{question.question}</CardTitle>
											<CardDescription>
												Resposta: {questionType(question.type)}
											</CardDescription>
										</div>

										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Abrir menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>Editar</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</CardHeader>
								</Card>
							))}
						</>
					) : (
						<p>Nenhuma pergunta encontrada para esta anamnese.</p>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
