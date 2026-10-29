/**
 * Configuración central del sitio: TODA la plantilla de SEO lee de aquí.
 *
 * En cada web de cliente solo hay que cambiar este archivo (nombre, dominio,
 * descripción, imagen OG, redes) y el `<head>`, las metas y el JSON-LD se
 * regeneran solos — sin tocar el layout ni los componentes.
 */
export const SITE_CONFIG = {
	name: "Berth Ortiz",
	title: "Desarrollo de Páginas Web para Negocios y Empresas | Berth Ortiz",
	description:
		"Creamos sitios optimizados, rápidos y diseñados para convertir visitas en ventas. Desarrollo de páginas web para negocios y empresas.",
	siteUrl: "https://berth-ortiz.pages.dev",

	/** Imagen Open Graph por defecto (1200×630, en `public/`). */
	ogImage: "/berth-portada.png",
	ogImageWidth: 1200,
	ogImageHeight: 630,
	ogImageAlt: "Berth Ortiz — Desarrollo de páginas web para negocios y empresas",

	ogLocale: "es_ES",
	ogLocaleAlternates: ["es_MX", "es_AR", "es_CO"],

	/** Cuenta X/Twitter del sitio. Vacío ⇒ se omite `twitter:site`. */
	twitterHandle: "",

	themeColor: "#080e1c",
	author: "Berth Ortiz",
} as const;

/**
 * Entidad persona/marca del schema.org (JSON-LD). Los `sameAs` son las
 * perfiles reales que refuerzan la entidad en Google.
 */
export const PERSON_SCHEMA = {
	name: "Berth Ortiz",
	jobTitle: "Desarrollador web",
	description:
		"Desarrollador web que crea sitios para emprendedores y negocios, cuidando el diseño, el rendimiento y la facilidad de uso.",
	sameAs: [
		"https://youtube.com/@berthortiz?si=BBZQJ3pbdA6iKWga",
		"https://www.instagram.com/berth_ortiz/",
	],
} as const;
