import developingImg from "../assets/developing.png";

export function Developing() {
	return (
		<div className="w-full flex items-center gap-4 justify-center py-20">
			<img src={developingImg} alt="" className="size-20" />

			<div className="flex flex-col">
				<strong className="text-xl text-foreground">
					Essa funcionalidade ainda está em desenvolvimento!
				</strong>
				<span className="text-sm text-muted-foreground">
					Fique por dentro das atualizações de Clinic Up clicando{" "}
					<a
						href="/teste"
						className="text-blue-500 underline hover:text-blue-400 transition-all"
					>
						aqui
					</a>
				</span>
			</div>
		</div>
	);
}
