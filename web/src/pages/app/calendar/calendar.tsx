import { Helmet } from "react-helmet-async";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "react-big-calendar/lib/css/react-big-calendar.css";

// Configurar o momento para português do Brasil
moment.locale("pt-br");

const localizer = momentLocalizer(moment);

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

export function Calendar() {
	return (
		<>
			<Helmet title="Agenda" />
			<div className="flex flex-col gap-4">
				<h1 className="text-xl sm:text-3xl font-bold tracking-tight">Agenda</h1>
				<BigCalendar
					localizer={localizer}
					events={eventos}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }}
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
					culture="pt-BR"
				/>
			</div>
		</>
	);
}
