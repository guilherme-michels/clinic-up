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
import { CalendarHeaderCard } from "./cards/calendar-header-card";
import { trpc } from "@/App";

const localizer = dayjsLocalizer(dayjs);

const mensagens = {
	today: "Hoje",
	previous: "Anterior",
	next: "Próximo",
	month: "Mês",
	week: "Semana",
	day: "Dia",
	agenda: "Agenda",
};

type SlotInfo = {
	start: Date;
	end: Date;
	slots: Date[];
	action: "select" | "click" | "doubleClick";
};

export function Calendar() {
	const [isEventFormModalVisible, setIsEventFormModalVisible] = useState(false);
	const { theme } = useTheme();
	const [selectedSlotInfo, setSelectedSlotInfo] = useState<SlotInfo | null>(
		null,
	);
	const [view, setView] = useState<View>("day");
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const [selectedAppointment, setSelectedAppointment] = useState<any | null>(
		null,
	);

	const { data: appointments, isLoading } = trpc.appointment.getAll.useQuery();

	const events =
		appointments?.map((appointment) => ({
			id: appointment.id,
			title: appointment.description,
			start: new Date(appointment.consultationStartTime ?? Date.now()),
			end: new Date(appointment.consultationEndTime ?? Date.now()),
			resource: appointment,
		})) || [];

	if (isLoading) {
		return <div>Carregando...</div>;
	}

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const handleSelectSlot = (slotInfo: any) => {
		setSelectedAppointment(null);
		setSelectedSlotInfo(slotInfo);
		setIsEventFormModalVisible(true);
	};

	const handleViewChange = (newView: string) => {
		setView(newView as View);
	};

	const handleCloseModal = () => {
		setIsEventFormModalVisible(false);
		setSelectedSlotInfo(null);
		setSelectedAppointment(null);
	};

	return (
		<>
			<Helmet title="Agenda" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-2xl  font-bold tracking-tight">
					Agenda
				</h1>

				<div className="flex lg:grid-cols-2 gap-4 items-center justify-between">
					<CalendarHeaderCard />

					<div className="flex justify-between">
						<Button
							onClick={() => {
								setSelectedSlotInfo(null);
								setIsEventFormModalVisible(true);
							}}
							className="h-fit"
						>
							Adicionar agendamento
						</Button>
					</div>
				</div>

				<BigCalendar
					className={theme === "dark" ? "dark-theme" : ""}
					localizer={localizer}
					events={events}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 800 }}
					step={10}
					defaultDate={new Date()}
					min={
						new Date(
							new Date().getFullYear(),
							new Date().getMonth(),
							new Date().getDate(),
							7,
							0,
							0,
						)
					}
					max={
						new Date(
							new Date().getFullYear(),
							new Date().getMonth(),
							new Date().getDate(),
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
								<strong className="text-sm font-semibold">
									{dayjs(props.date).format("DD/MM")}
								</strong>
							</div>
						),
					}}
					onSelectEvent={(event) => {
						if (!isEventFormModalVisible) {
							setSelectedSlotInfo(null);
							setSelectedAppointment(event.resource);
							setIsEventFormModalVisible(true);
						}
					}}
					selectable={!isEventFormModalVisible}
					onSelectSlot={handleSelectSlot}
					culture="pt-BR"
					view={view}
					onView={setView}
				/>
			</div>

			{isEventFormModalVisible && (
				<AppointmentFormModal
					isOpened={isEventFormModalVisible}
					appointment={selectedAppointment}
					slotInfo={selectedSlotInfo || undefined}
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
}
