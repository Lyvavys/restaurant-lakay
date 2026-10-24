import type { Metadata } from "next";
import Image from "next/image";

// ============================================================
//  À MODIFIER : toutes les informations du restaurant
// ============================================================
type Plat = {
  nom: string;
  description: string;
  prix: string;
  image?: string; // laissez vide pour un plat sans photo
};

type Categorie = {
  id: string;
  nom: string;
  plats: Plat[];
};

const restaurant = {
  nom: "Restaurant Lakay",
  slogan: "La vraie cuisine haïtienne, comme à la maison",
  logo: "/images/log.jpeg", // laissez "" pour ne pas afficher de logo
  presentation:
    "Bienvenue ! Nous préparons chaque jour des plats traditionnels avec des ingrédients frais, dans une ambiance chaleureuse. Venez partager un bon repas en famille ou entre amis.",
  atouts: ["Cuisine maison", "Ingrédients frais", "Accueil chaleureux"],
  adresse: "Adresse du restaurant, Ville, Haïti",
  telephone: "+509 38106967",
  whatsapp: "50938106967", // indicatif pays + numéro, sans + ni espaces
  horaires: [
    { jours: "Lundi – Samedi", heures: "11h00 – 21h00" },
    { jours: "Dimanche", heures: "12h00 – 18h00" },
  ],
  // Réseaux sociaux : collez le lien complet. Laissez "" pour cacher.
  reseaux: [
    { nom: "Facebook", lien: "" },
    { nom: "Instagram", lien: "" },
    { nom: "TikTok", lien: "" },
  ],
};

const livraison = {
  actif: true, // mettre false pour cacher la section livraison
  zones: "Votre quartier et les zones proches (à préciser)",
  frais: "Frais selon la distance (à préciser)",
  delai: "30 à 60 minutes selon la zone (à préciser)",
};

const categories: Categorie[] = [
  {
    id: "plats",
    nom: "Plats principaux",
    plats: [
      {
        nom: "Griyo",
        description: "Porc mariné et frit, servi avec du pikliz et des bananes pesées.",
        prix: "500 HTG",
        image: "/images/griyo.jpeg",
      },
      {
        nom: "Poul nan sòs",
        description: "Poulet mijoté dans une sauce créole bien relevée.",
        prix: "450 HTG",
        image: "/images/poul.jpeg",
      },
      {
        nom: "Tasso kabrit",
        description: "Morceaux de chèvre séchés et frits, croustillants et savoureux.",
        prix: "600 HTG",
        image: "/images/taso.jpeg",
      },
      {
        nom: "Pwason fri",
        description: "Poisson frit, servi avec du riz et de la salade.",
        prix: "550 HTG",
        image: "/images/pwason.jpeg",
      },
    ],
  },
  {
    id: "riz-legumes",
    nom: "Riz et légumes",
    plats: [
      {
        nom: "Diri ak djondjon",
        description: "Riz parfumé aux champignons noirs, accompagné de sauce.",
        prix: "450 HTG",
        image: "/images/djondjon.jpeg",
      },
      {
        nom: "Legim",
        description: "Légumes mijotés avec des épices, un plat complet et généreux.",
        prix: "400 HTG",
        image: "/images/legume.jpeg",
      },
    ],
  },
  // Exemples sans photo : à remplacer par les vraies boissons et desserts
  {
    id: "boissons",
    nom: "Boissons",
    plats: [
      { nom: "Jus de fruits frais", description: "Jus du jour, préparé sur place.", prix: "150 HTG" },
      { nom: "Boisson gazeuse", description: "Au choix, bien fraîche.", prix: "100 HTG" },
      { nom: "Eau", description: "Bouteille d'eau.", prix: "75 HTG" },
    ],
  },
  {
    id: "desserts",
    nom: "Desserts",
    plats: [
      { nom: "Dessert du jour", description: "Demandez-nous le dessert du jour.", prix: "200 HTG" },
    ],
  },
];

// Galerie : ajoutez des photos dans public/images puis des lignes ici.
// Exemple : { src: "/images/salle.jpeg", alt: "La salle du restaurant" },
const galerie: { src: string; alt: string }[] = [];

// Avis clients : ajoutez uniquement de VRAIS avis, avec l'accord du client.
// Exemple : { nom: "Marie", texte: "Excellent repas, service rapide !" },
const avis: { nom: string; texte: string }[] = [];
// ============================================================
//  FIN DE LA PARTIE À MODIFIER
// ============================================================

const description = `${restaurant.slogan}. Découvrez notre menu, nos horaires et réservez par WhatsApp.`;

export const metadata: Metadata = {
  title: `${restaurant.nom} | Cuisine haïtienne`,
  description,
  openGraph: {
    title: restaurant.nom,
    description,
    type: "website",
    locale: "fr_FR",
    images: [{ url: "/images/her.jpeg", width: 1200, height: 630 }],
  },
};

const liens = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À propos" },
  { href: "#menu", label: "Menu" },
  ...(livraison.actif ? [{ href: "#livraison", label: "Livraison" }] : []),
  ...(galerie.length > 0 ? [{ href: "#galerie", label: "Galerie" }] : []),
  { href: "#infos", label: "Infos" },
];

const reseauxActifs = restaurant.reseaux.filter((r) => r.lien !== "");

const creerLienWhatsapp = (message: string) =>
  `https://wa.me/${restaurant.whatsapp}?text=` + encodeURIComponent(message);

const lienReservation = creerLienWhatsapp(
  `Bonjour, je souhaite réserver une table chez ${restaurant.nom}.`
);
const lienContact = creerLienWhatsapp(
  `Bonjour ${restaurant.nom}, j'aimerais avoir des informations.`
);
const lienLivraison = creerLienWhatsapp(
  `Bonjour, je souhaite une livraison. Voici mon adresse : `
);
const lienAppel = `tel:+${restaurant.whatsapp}`;

const lienCarte =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(restaurant.adresse);
const lienCarteIntegree =
  "https://www.google.com/maps?output=embed&q=" +
  encodeURIComponent(restaurant.adresse);

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* En-tête */}
      <header className="sticky top-0 z-20 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#accueil" className="flex items-center gap-3">
            {restaurant.logo && (
              <Image
                src={restaurant.logo}
                alt={`Logo ${restaurant.nom}`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <span className="text-lg font-bold text-red-900">
              {restaurant.nom}
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-stone-700 md:flex">
            {liens.map((lien) => (
              <a key={lien.href} href={lien.href} className="hover:text-red-800">
                {lien.label}
              </a>
            ))}
          </nav>
          <a
            href={lienReservation}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-red-800 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Réserver
          </a>
        </div>

        {/* Menu pour téléphone */}
        <nav className="flex gap-5 overflow-x-auto whitespace-nowrap border-t border-stone-100 px-4 py-2 text-sm font-semibold text-stone-700 md:hidden">
          {liens.map((lien) => (
            <a key={lien.href} href={lien.href} className="hover:text-red-800">
              {lien.label}
            </a>
          ))}
        </nav>
      </header>

      {/* Accueil avec grande photo */}
      <section id="accueil" className="relative">
        <div className="relative h-[70vh] min-h-[460px] w-full">
          <Image
            src="/images/her.jpeg"
            alt={`Plats du ${restaurant.nom}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-amber-300">
              Cuisine haïtienne
            </p>
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {restaurant.nom}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-stone-100">
              {restaurant.slogan}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#menu"
                className="rounded-full bg-amber-400 px-6 py-3 font-semibold text-red-950 hover:bg-amber-300"
              >
                Voir le menu
              </a>
              <a
                href={lienReservation}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Réserver une table
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-stone-200">
              <a href={lienAppel} className="hover:text-amber-300">
                📞 {restaurant.telephone}
              </a>
              {livraison.actif && (
                <a href="#livraison" className="hover:text-amber-300">
                  🛵 Livraison disponible
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section
        id="apropos"
        className="mx-auto max-w-3xl scroll-mt-32 px-4 py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-red-900">Notre histoire</h2>
        <p className="mt-4 text-stone-600">{restaurant.presentation}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {restaurant.atouts.map((atout) => (
            <span
              key={atout}
              className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-900"
            >
              {atout}
            </span>
          ))}
        </div>
      </section>

      {/* Menu avec catégories */}
      <section id="menu" className="scroll-mt-32 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-center text-3xl font-bold text-red-900">
            Notre menu
          </h2>
          <p className="mt-2 text-center text-stone-500">
            Cuisine préparée chaque jour avec des produits frais
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.id}`}
                className="rounded-full border border-red-800 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-800 hover:text-white"
              >
                {cat.nom}
              </a>
            ))}
          </div>

          {categories.map((cat) => (
            <div key={cat.id} id={`cat-${cat.id}`} className="mt-14 scroll-mt-40">
              <h3 className="border-b-2 border-amber-400 pb-2 text-2xl font-bold text-red-900">
                {cat.nom}
              </h3>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.plats.map((plat) => (
                  <article
                    key={plat.nom}
                    className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm hover:shadow-md"
                  >
                    {plat.image && (
                      <div className="relative aspect-[4/3] w-full bg-stone-200">
                        <Image
                          src={plat.image}
                          alt={plat.nom}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className="text-lg font-semibold text-red-900">
                          {plat.nom}
                        </h4>
                        <span className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-900">
                          {plat.prix}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-stone-600">
                        {plat.description}
                      </p>
                      <a
                        href={creerLienWhatsapp(
                          `Bonjour, je voudrais commander : ${plat.nom}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm font-semibold text-red-800 hover:underline"
                      >
                        Commander sur WhatsApp
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Livraison */}
      {livraison.actif && (
        <section id="livraison" className="scroll-mt-32 bg-amber-50">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-center text-3xl font-bold text-red-900">
              Livraison
            </h2>
            <p className="mt-2 text-center text-stone-600">
              Vos plats préférés, directement chez vous
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl">📍</div>
                <h3 className="mt-3 text-lg font-semibold text-red-900">
                  Zones
                </h3>
                <p className="mt-2 text-sm text-stone-600">{livraison.zones}</p>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl">💵</div>
                <h3 className="mt-3 text-lg font-semibold text-red-900">
                  Frais
                </h3>
                <p className="mt-2 text-sm text-stone-600">{livraison.frais}</p>
              </div>
              <div className="rounded-3xl border border-amber-200 bg-white p-6 text-center shadow-sm">
                <div className="text-3xl">⏱️</div>
                <h3 className="mt-3 text-lg font-semibold text-red-900">
                  Délai
                </h3>
                <p className="mt-2 text-sm text-stone-600">{livraison.delai}</p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <a
                href={lienLivraison}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-500"
              >
                Commander une livraison
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Galerie (cachée si vide) */}
      {galerie.length > 0 && (
        <section id="galerie" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16">
          <h2 className="text-center text-3xl font-bold text-red-900">
            Galerie
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
            {galerie.map((photo) => (
              <div
                key={photo.src}
                className="relative aspect-square overflow-hidden rounded-2xl bg-stone-200"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Avis clients (cachés si vides) */}
      {avis.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-center text-3xl font-bold text-red-900">
              Ce que disent nos clients
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {avis.map((a) => (
                <blockquote
                  key={a.nom + a.texte}
                  className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm"
                >
                  <p className="text-stone-700">&ldquo;{a.texte}&rdquo;</p>
                  <footer className="mt-4 text-sm font-semibold text-red-900">
                    {a.nom}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Infos pratiques */}
      <section id="infos" className="mx-auto max-w-6xl scroll-mt-32 px-4 py-16">
        <h2 className="text-center text-3xl font-bold text-red-900">
          Infos pratiques
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-red-900">Horaires</h3>
            <ul className="mt-4 space-y-3">
              {restaurant.horaires.map((h) => (
                <li
                  key={h.jours}
                  className="flex justify-between gap-4 border-b border-stone-100 pb-3 text-stone-700"
                >
                  <span>{h.jours}</span>
                  <span className="font-semibold">{h.heures}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-red-900">
              Adresse et contact
            </h3>
            <p className="mt-4 text-stone-700">{restaurant.adresse}</p>
            <p className="mt-2 text-stone-700">{restaurant.telephone}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={lienCarte}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-800 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Itinéraire
              </a>
              <a
                href={lienAppel}
                className="rounded-full border border-red-800 px-5 py-2 text-sm font-semibold text-red-800 hover:bg-red-800 hover:text-white"
              >
                Appeler
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm md:col-span-2">
            <iframe
              title={`Carte : ${restaurant.nom}`}
              src={lienCarteIntegree}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-72 w-full border-0"
            />
          </div>
        </div>
      </section>

      {/* Réservation */}
      <section className="bg-red-900 text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center">
          <h2 className="text-3xl font-bold">Envie de passer à table ?</h2>
          <p className="mt-3 text-red-100">
            Réservez votre table en un clic sur WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={lienReservation}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-500"
            >
              Réserver sur WhatsApp
            </a>
            <a
              href={lienAppel}
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10"
            >
              Appeler
            </a>
          </div>
        </div>
      </section>

      {/* Pied de page */}
      <footer className="bg-stone-950 text-stone-300">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">{restaurant.nom}</p>
            <p className="mt-2 text-sm">{restaurant.slogan}</p>
          </div>
          <div>
            <p className="font-semibold text-white">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm">
              {liens.map((lien) => (
                <li key={lien.href}>
                  <a href={lien.href} className="hover:text-amber-300">
                    {lien.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Contact</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>{restaurant.adresse}</li>
              <li>
                <a href={lienAppel} className="hover:text-amber-300">
                  {restaurant.telephone}
                </a>
              </li>
            </ul>
            {reseauxActifs.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {reseauxActifs.map((r) => (
                  <a
                    key={r.nom}
                    href={r.lien}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-stone-600 px-4 py-1 text-sm hover:border-amber-300 hover:text-amber-300"
                  >
                    {r.nom}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-stone-800 py-5 text-center text-sm text-stone-400">
          ©️ 2026 {restaurant.nom}. Tous droits réservés.
        </div>
      </footer>

      {/* Bouton WhatsApp flottant */}
      <a
        href={lienContact}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Écrire sur WhatsApp"
        className="fixed bottom-5 right-5 z-30 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:bg-green-500"
      >
        💬 WhatsApp
      </a>
    </div>
  );
}