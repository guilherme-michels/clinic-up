import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { NotFound } from "./pages/404";
import { AppLayout } from "./pages/_layouts/app";
import { AuthLayout } from "./pages/_layouts/auth";
import { MyAccount } from "./pages/app/account/my-account";
import { Calendar } from "./pages/app/calendar/calendar";
import { AnamneseList } from "./pages/app/clinic/anamnese/anamnese-list";
import { Clinic } from "./pages/app/clinic/clinic";
import { ClinicPlans } from "./pages/app/clinic/clinic-plans/clinic-plans";
import { Specialties } from "./pages/app/clinic/specialties/specialties";
import { Dashboard } from "./pages/app/dashboard/dashboard";
import { FinancialDashboard } from "./pages/app/dashboard/financial/financial-dashboard";
import { PatientDashboard } from "./pages/app/dashboard/patient/patient-dashboard";
import { Financial } from "./pages/app/financial/financial";
import { Home } from "./pages/app/home/home";
import { Marketing } from "./pages/app/marketing/marketing";
import { PatientForm } from "./pages/app/patients/patient-form";
import { Patient } from "./pages/app/patients/patient/patient";
import { PatientAnamnese } from "./pages/app/patients/patient/patient-anamnese";
import { PatientBudget } from "./pages/app/patients/patient/patient-budget";
import { PatientHistory } from "./pages/app/patients/patient/patient-history";
import { PatientImages } from "./pages/app/patients/patient/patient-images";
import { Patients } from "./pages/app/patients/patients";
import { Settings } from "./pages/app/settings/settings";
import { Team } from "./pages/app/team/team";
import { TeamForm } from "./pages/app/team/team-form";
import { SignIn } from "./pages/auth/SignIn";
import { SignUp } from "./pages/auth/SignUp";
import { ClinicUp } from "./pages/clinic-up";
import { ErrorPage } from "./pages/error";

const ProtectedRoute = () => {
	const { isAuthenticated, checkAuth } = useAuth();
	const [isLoading, setIsLoading] = useState(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const verifyAuth = async () => {
			await checkAuth();
			setIsLoading(false);
		};
		verifyAuth();
	}, []);

	if (isLoading) {
		return (
			<div className="size-full items-center justify-center flex">
				<LoaderCircle className="text-foreground animate-spin" size={28} />
			</div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/sign-in" replace />;
	}

	return <Outlet />;
};

export const router = createBrowserRouter([
	{
		element: <ProtectedRoute />,
		children: [
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
						children: [
							{
								path: "financeiro",
								element: <FinancialDashboard />,
							},
							{
								path: "pacientes",
								element: <PatientDashboard />,
							},
						],
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
						path: "/financeiro",
						element: <Financial />,
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
								path: "anamnese",
								element: <PatientAnamnese />,
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
						children: [
							{
								path: "planos",
								element: <ClinicPlans />,
							},
							{
								path: "anamnese",
								element: <AnamneseList />,
							},
							{
								path: "especialidades",
								element: <Specialties />,
							},
						],
					},
					{
						path: "/minha-conta",
						element: <MyAccount />,
					},
					{
						path: "*",
						element: <NotFound />,
					},
				],
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
	{
		path: "/clinic-up",
		element: <ClinicUp />,
	},
]);
