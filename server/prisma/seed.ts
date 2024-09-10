import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	const hashedPassword = await bcrypt.hash("teste123", 10);
	const user = await prisma.user.create({
		data: {
			name: "João Silva",
			email: "guilherme@gmail.com",
			passwordHash: hashedPassword,
			avatarUrl: "https://exemplo.com/avatar.jpg",
		},
	});

	const organization = await prisma.organization.create({
		data: {
			name: "Clínica Saúde Total",
			slug: "clinica-saude-total",
			domain: "clinicasaudetotal.com.br",
			shouldAttachUsersByDomain: true,
			avatarUrl: "https://exemplo.com/logo-clinica.jpg",
			cnpj: "12.345.678/0001-90",
			email: "contato@clinicasaudetotal.com.br",
			phone: "(11) 3456-7890",
			website: "https://www.clinicasaudetotal.com.br",
			description: "Clínica multidisciplinar com foco em saúde integral",
			address: "Avenida Paulista",
			addressNumber: "1000",
			addressComplement: "Sala 1010",
			neighborhood: "Bela Vista",
			city: "São Paulo",
			state: "SP",
			zipCode: "01310-100",
			businessHours: JSON.stringify({
				segunda: "08:00 - 18:00",
				terca: "08:00 - 18:00",
				quarta: "08:00 - 18:00",
				quinta: "08:00 - 18:00",
				sexta: "08:00 - 18:00",
				sabado: "08:00 - 12:00",
			}),
			specialties: ["Clínica Geral", "Pediatria", "Ortopedia", "Nutrição"],
			acceptedInsurances: ["Unimed", "Bradesco Saúde", "SulAmérica"],
			facebookUrl: "https://www.facebook.com/clinicasaudetotal",
			instagramUrl: "https://www.instagram.com/clinicasaudetotal",
			linkedinUrl: "https://www.linkedin.com/company/clinicasaudetotal",
			twitterUrl: "https://twitter.com/clinicasaudetotal",
			ownerId: user.id,
		},
	});

	await prisma.member.create({
		data: {
			userId: user.id,
			organizationId: organization.id,
			role: "ADMIN",
		},
	});

	console.log("Seed concluído com sucesso!");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
