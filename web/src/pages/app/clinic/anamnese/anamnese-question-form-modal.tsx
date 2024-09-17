import { trpc } from "@/App";
import { FormInput } from "@/components/form-input";
import { FormSelect } from "@/components/form-select";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
	type AnamneseQuestionFormSchema,
	anamneseQuestionSchema,
} from "../../../../../../server/src/zod-types/schemas";

interface AnamneseQuestionFormModalProps {
	isOpened: boolean;
	onClose: () => void;
	onSave: (data: AnamneseQuestionFormSchema) => void;
	anamneseId: string;
}

const questionTypeOptions = [
	{ value: "TEXT", name: "Texto" },
	{ value: "BOOLEAN", name: "Sim/Não" },
	{ value: "MULTIPLE_CHOICE", name: "Múltipla Escolha" },
	{ value: "SINGLE_CHOICE", name: "Escolha Única" },
	{ value: "NUMBER", name: "Número" },
	{ value: "DATE", name: "Data" },
];

export function AnamneseQuestionFormModal({
	isOpened,
	onClose,
	onSave,
	anamneseId,
}: AnamneseQuestionFormModalProps) {
	const utils = trpc.useContext();

	const createQuestion = trpc.anamnesisQuestion.create.useMutation({
		onSuccess: () => {
			toast.success("Pergunta adicionada com sucesso!");
			utils.anamnesisTemplate.invalidate();
			onClose();
		},
		onError: (error) => {
			toast.error(`Erro ao adicionar pergunta: ${error.message}`);
		},
	});

	const { control, handleSubmit, reset } = useForm<AnamneseQuestionFormSchema>({
		resolver: zodResolver(anamneseQuestionSchema),
		defaultValues: {
			question: "",
			questionType: "TEXT",
		},
	});

	const onSubmit = (data: AnamneseQuestionFormSchema) => {
		createQuestion.mutate({ ...data, templateId: anamneseId });
		onSave(data);
	};

	return (
		<Dialog open={isOpened} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nova pergunta</DialogTitle>
					<DialogDescription>
						Cadastre uma nova pergunta no template.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="grid grid-cols-1 gap-4">
						<FormInput
							control={control}
							name="question"
							label="Pergunta"
							placeholder="Digite a pergunta"
							required
						/>

						<FormSelect
							control={control}
							name="questionType"
							label="Tipo de Resposta"
							options={questionTypeOptions}
							required
						/>
					</div>

					<div className="flex justify-end space-x-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => {
								reset();
								onClose();
							}}
						>
							Cancelar
						</Button>
						<Button type="submit">Adicionar</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
