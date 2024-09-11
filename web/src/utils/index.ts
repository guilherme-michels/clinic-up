export const truncateText = (text: string, maxLength: number): string => {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength)}...`;
};

export function formatDateMask(date: Date): string {
	return date
		.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		})
		.replace(/\//g, "/");
}

export function formatTime(date: Date): string {
	return date.toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	});
}

export function formatDateTimeLocal(date: Date): string {
	return date
		.toLocaleString("pt-BR", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		})
		.replace(/\//g, "-")
		.replace(",", "");
}

export function parseDate(dateString: string): Date {
	const [day, month, year] = dateString.split("/").map(Number);
	return new Date(year, month - 1, day);
}

export function parseDateTimeLocal(dateTimeString: string): Date {
	const [datePart, timePart] = dateTimeString.split(" ");
	const [day, month, year] = datePart.split("/").map(Number);
	const [hours, minutes] = timePart.split(":").map(Number);
	return new Date(year, month - 1, day, hours, minutes);
}
