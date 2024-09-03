import { Helmet } from "react-helmet-async";
import {
	Calendar as BigCalendar,
	dayjsLocalizer,
	type View,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AppointmentFormModal } from "./appointment/appointment-form-modal";
import dayjs from "dayjs";
import "./calendar.css";
import { useTheme } from "@/components/theme/theme-provider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, CalendarCheck2 } from "lucide-react";

const localizer = dayjsLocalizer(dayjs);

const eventos = [
	{
		title: "Consulta com Dr. Silva",
		start: new Date(2023, 3, 15, 10, 0),
		end: new Date(2023, 3, 15, 11, 0),
	},
];

const mensagens = {
	allDay: "Dia inteiro",
	previous: "Anterior",
	next: "Próximo",
	today: "Hoje",
	month: "Mês",
	week: "Semana",
	day: "Dia",
	agenda: "Agenda",
	date: "Data",
	time: "Hora",
	event: "Evento",
	noEventsInRange: "Não há eventos no período.",
};

const defaultDate = new Date();

export function Calendar() {
	const [isEventFormModalVisible, setIsEventFormModalVisible] = useState(false);
	const { theme } = useTheme();
	const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);
	const [view, setView] = useState<View>("month");
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
		null,
	);

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleSelectSlot = (slotInfo: any) => {
		setSelectedAppointment(null);
		setSelectedSlotInfo(slotInfo);
		setIsEventFormModalVisible(true);
		console.log("Slot selecionado:", slotInfo);
	};

	const handleViewChange = (newView: string) => {
		setView(newView as View);
	};

	return (
		<>
			<Helmet title="Agenda" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-3xl font-bold tracking-tight">Agenda</h1>

				<div className="flex justify-between">
					<div />
					<Button
						onClick={() => {
							setSelectedSlotInfo(null);
							setIsEventFormModalVisible(true);
						}}
					>
						Adicionar agendamento
					</Button>
				</div>
				<BigCalendar
					className={theme === "dark" ? "dark-theme" : ""}
					localizer={localizer}
					events={eventos}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 800 }}
					step={15}
					defaultDate={defaultDate}
					min={
						new Date(
							defaultDate.getFullYear(),
							defaultDate.getMonth(),
							defaultDate.getDate(),
							7,
							0,
							0,
						)
					}
					max={
						new Date(
							defaultDate.getFullYear(),
							defaultDate.getMonth(),
							defaultDate.getDate(),
							22,
							0,
							0,
						)
					}
					messages={mensagens}
					formats={{
						timeGutterFormat: "HH[h]mm",
						eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
							`${localizer?.format(
								start,
								"HH[h]mm",
								culture,
							)} - ${localizer?.format(end, "HH[h]mm", culture)}`,
					}}
					components={{
						toolbar: (props) => (
							<div className="flex justify-between items-center mb-4">
								<div className="gap-2 flex items-center">
									<Button
										onClick={() => props.onNavigate("TODAY")}
										className="w-full flex gap-2"
									>
										<CalendarCheck2 size={14} />
										{mensagens.today}
									</Button>
									<Button
										onClick={() => props.onNavigate("PREV")}
										className="w-full flex gap-2"
									>
										<ArrowLeft size={14} />
										{mensagens.previous}
									</Button>
									<Button
										onClick={() => props.onNavigate("NEXT")}
										className="w-full flex gap-2"
									>
										{mensagens.next}
										<ArrowRight size={14} />
									</Button>
								</div>
								<Tabs value={view} onValueChange={handleViewChange}>
									<TabsList>
										<TabsTrigger value="month">{mensagens.month}</TabsTrigger>
										<TabsTrigger value="week">{mensagens.week}</TabsTrigger>
										<TabsTrigger value="day">{mensagens.day}</TabsTrigger>
										<TabsTrigger value="agenda">{mensagens.agenda}</TabsTrigger>
									</TabsList>
								</Tabs>
							</div>
						),
						event: (props) => (
							<div className="p-1 font-semibold">{props.title}</div>
						),
						header: (props) => (
							<div className="w-full flex flex-col cursor-default">
								<span className="text-sm font-normal text-zinc-600">
									{props.label.slice(-3).charAt(0).toUpperCase() +
										props.label.slice(-2)}
									.
								</span>
								<strong className="text-xl font-semibold">
									{dayjs(props.date).format("DD/MM")}
								</strong>
							</div>
						),
					}}
					onSelectEvent={(event) => {
						setSelectedSlotInfo(null);
						setSelectedAppointment(event);
						setIsEventFormModalVisible(true);
						console.log("Evento selecionado:", event);
					}}
					selectable={true}
					onSelectSlot={handleSelectSlot}
					culture="pt-BR"
					view={view}
					onView={setView}
				/>
			</div>

			<AppointmentFormModal
				isOpened={isEventFormModalVisible}
				slotInfo={selectedSlotInfo || undefined}
				appointment={selectedAppointment}
				onClose={() => setIsEventFormModalVisible(false)}
			/>
		</>
	);
}
