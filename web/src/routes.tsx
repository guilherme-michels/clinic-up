import { createBrowserRouter } from "react-router-dom";

import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { ErrorPage } from "./pages/error";
import { NotFound } from "./pages/404";
import { SignUp } from "./pages/auth/SignUp";
import { SignIn } from "./pages/auth/SignIn";
import { Home } from "./pages/app/home/home";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { Patients } from "./pages/app/patients/patients";
import { Calendar } from "./pages/app/calendar/calendar";
import { Marketing } from "./pages/app/marketing/marketing";
import { Team } from "./pages/app/team/team";
import { Clinic } from "./pages/app/clinic/clinic";
import { PatientForm } from "./pages/app/patients/patient-form";
import { TeamForm } from "./pages/app/team/team-form";
import { Settings } from "./pages/app/settings/settings";
import { Patient } from "./pages/app/patients/patient/patient";
import { PatientHistory } from "./pages/app/patients/patient/patient-history";
import { PatientImages } from "./pages/app/patients/patient/patient-images";
import { PatientBudget } from "./pages/app/patients/patient/patient-budget";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/pagina-inicial",
				element: <Home />,
			},
			{
				path: "/analise-dados",
				element: <Dashboard />,
			},
			{
				path: "/pacientes",
				element: <Patients />,
				children: [
					{
						path: "cadastro",
						element: <PatientForm />,
					},
					{
						path: "cadastro/:id",
						element: <PatientForm />,
					},
				],
			},
			{
				path: "/pacientes/:id",
				element: <Patient />,
				children: [
					{
						path: "historico",
						element: <PatientHistory />,
					},
					{
						path: "imagens",
						element: <PatientImages />,
					},
					{
						path: "orcamentos",
						element: <PatientBudget />,
					},
				],
			},
			{
				path: "/agenda",
				element: <Calendar />,
			},
			{
				path: "/marketing",
				element: <Marketing />,
			},
			{
				path: "/equipe",
				element: <Team />,
				children: [
					{
						path: "cadastro",
						element: <TeamForm />,
					},
					{
						path: "cadastro/:id",
						element: <TeamForm />,
					},
				],
			},
			{
				path: "/configuracoes",
				element: <Settings />,
			},
			{
				path: "/minha-clinica",
				element: <Clinic />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "/sign-in",
				element: <SignIn />,
			},
			{
				path: "/sign-up",
				element: <SignUp />,
			},
		],
	},
]);
