import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { trpc } from "@/App";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlignJustify, MoreHorizontal, Search } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { QuestionTypeType } from "../../../../../../server/src/schemas";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { AnamneseQuestionFormModal } from "./anamnese-question-form-modal";

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
	const [searchTerm, setSearchTerm] = useState("");
	const [isQuestionFormOpen, setIsQuestionFormOpen] = useState(false);

	const filteredQuestions = anamnese?.questions?.filter((question) =>
		question.question.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const handleAddQuestion = () => {
		setIsQuestionFormOpen(true);
	};

	const handleQuestionFormClose = () => {
		setIsQuestionFormOpen(false);
	};

	const handleQuestionSave = () => {
		setIsQuestionFormOpen(false);
		// Aqui você pode adicionar lógica adicional após salvar a pergunta, se necessário
	};

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogContent className="max-w-4xl xl:max-w-6xl">
				<DialogHeader>
					<DialogTitle>Perguntas da Anamnese</DialogTitle>
					<DialogDescription>
						Visualize e gerencie as perguntas desta anamnese.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="relative flex-grow">
						<Search
							className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
							size={20}
						/>
						<Input
							type="text"
							placeholder="Buscar pergunta..."
							className="pr-4 py-2 max-w-sm"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<Button onClick={handleAddQuestion}>Cadastrar pergunta</Button>
				</div>
				<div className="mt-4 max-h-[500px] min-h-[100px] overflow-y-auto">
					{isLoading ? (
						<div className="size-full flex flex-col gap-4">
							<Skeleton className="w-full h-10" />
							<Skeleton className="w-full h-10" />
							<Skeleton className="w-full h-10" />
						</div>
					) : filteredQuestions?.length ? (
						<>
							{filteredQuestions.map((question) => (
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
												<MoreHorizontal className="h-4 w-4 cursor-pointer hover:opacity-50 transition-all" />
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
						<Card>
							<CardHeader className="flex items-center gap-1 space-y-0 border-b py-4 sm:flex-row">
								<div className="grid flex-1 gap-1 text-center sm:text-left">
									<CardTitle>
										Nenhuma pergunta encontrada para esta anamnese.
									</CardTitle>
								</div>
							</CardHeader>
						</Card>
					)}
				</div>
			</DialogContent>
			<AnamneseQuestionFormModal
				isOpened={isQuestionFormOpen}
				onClose={handleQuestionFormClose}
				onSave={handleQuestionSave}
				anamneseId={anamneseId}
			/>
		</Dialog>
	);
}
