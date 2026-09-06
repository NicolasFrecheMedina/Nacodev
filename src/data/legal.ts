import type { Locale } from '@/i18n/messages'

export type LegalTab = 'legalNotice' | 'privacy' | 'terms'

interface LegalConfig {
  businessName: string
  ownerName: string
  legalStatus: Record<Locale, string>
  activity: Record<Locale, string>
  address: string
  phone: string
  email: string
  publicationDirector: string
  siren: string
  siret: string
  registrationNumber: string
  vatNumber: string
  host: string
  hostUrl: string
  contactRetentionPeriod: string
  consumerMediatorName: string
  consumerMediatorAddress: string
  consumerMediatorUrl: string
}

export const legalConfig: LegalConfig = {
  businessName: 'NacoDev',
  ownerName: 'Nicolas Freche',
  legalStatus: {
    fr: 'Entrepreneur individuel — micro-entreprise',
    en: 'Sole trader — French micro-enterprise',
    es: 'Empresario individual — microempresa francesa',
  },
  activity: {
    fr: 'Création et développement de solutions numériques, conception web, accompagnement informatique, infrastructure et services numériques.',
    en: 'Creation and development of digital solutions, web design, IT assistance, infrastructure and digital services.',
    es: 'Creación y desarrollo de soluciones digitales, diseño web, acompañamiento informático, infraestructura y servicios digitales.',
  },
  address: '5, rue du Tuquéou, 40990 Saint-Paul-lès-Dax, France',
  phone: '06 80 28 70 11',
  email: 'nicolas.freche@gmail.com',
  publicationDirector: 'Nicolas Freche',
  // TODO(production): renseigner le SIREN officiel.
  siren: '',
  // TODO(production): renseigner le SIRET s'il doit figurer sur le site.
  siret: '',
  // TODO(production): renseigner le numéro d'immatriculation / RNE s'il est applicable.
  registrationNumber: '',
  // TODO(production): renseigner le numéro de TVA intracommunautaire s'il est applicable.
  vatNumber: '',
  host: 'Netlify',
  hostUrl: 'https://www.netlify.com/',
  // TODO(production): définir et valider la durée de conservation des demandes de contact.
  contactRetentionPeriod: '',
  // TODO(production): choisir un médiateur référencé et renseigner ses coordonnées.
  consumerMediatorName: '',
  consumerMediatorAddress: '',
  consumerMediatorUrl: '',
}

export const incompleteLegalFields = [
  'SIREN',
  'SIRET (si nécessaire)',
  'immatriculation / RNE (si applicable)',
  'TVA intracommunautaire (si applicable)',
  'durée de conservation des contacts',
  'coordonnées du médiateur de la consommation',
] as const

interface LegalSection {
  title: string
  paragraphs: readonly string[]
}

interface LegalLocaleContent {
  archiveTitle: string
  tabs: Record<LegalTab, string>
  navigationLabel: string
  referenceNotice?: string
  updatedLabel: string
  legalNotice: {
    identityTitle: string
    labels: {
      businessName: string
      ownerName: string
      legalStatus: string
      activity: string
      address: string
      phone: string
      email: string
      publicationDirector: string
      host: string
      siren: string
      siret: string
      registrationNumber: string
      vatNumber: string
    }
    intellectualPropertyTitle: string
    intellectualProperty: string
  }
  privacy: readonly LegalSection[]
  terms: readonly LegalSection[]
  developmentTodoTitle: string
  retentionTodo: string
  mediatorTodo: string
  rightsReserved: string
}

export const legalContent: Record<Locale, LegalLocaleContent> = {
  fr: {
    archiveTitle: 'Archives / Informations légales',
    tabs: { legalNotice: 'Mentions légales', privacy: 'Confidentialité', terms: 'CGV' },
    navigationLabel: 'Navigation des informations légales',
    updatedLabel: 'Dernière mise à jour',
    legalNotice: {
      identityTitle: 'Éditeur du site',
      labels: {
        businessName: 'Nom commercial', ownerName: 'Entrepreneur', legalStatus: 'Statut', activity: 'Activité',
        address: 'Adresse', phone: 'Téléphone', email: 'Email', publicationDirector: 'Directeur de la publication', host: 'Hébergeur',
        siren: 'SIREN', siret: 'SIRET', registrationNumber: 'Immatriculation / RNE', vatNumber: 'TVA intracommunautaire',
      },
      intellectualPropertyTitle: 'Propriété intellectuelle',
      intellectualProperty: 'Le site, sa conception, ses éléments graphiques, ses textes, ses contenus et ses créations sont protégés, sauf mention contraire. Toute reproduction, représentation, adaptation ou exploitation non autorisée est interdite dans les limites prévues par la loi.',
    },
    privacy: [
      { title: 'Responsable du traitement', paragraphs: ['Nicolas Freche — NacoDev est responsable du traitement des données transmis via ce site. Toute question peut être adressée à l’adresse indiquée ci-dessous.'] },
      { title: 'Données collectées', paragraphs: ['Le formulaire de contact collecte uniquement le nom, l’adresse email, le sujet et le message saisis par l’utilisateur.'] },
      { title: 'Finalité et base légale', paragraphs: ['Ces données sont utilisées pour répondre aux demandes envoyées via le formulaire de contact et assurer le suivi des échanges.', 'Le traitement repose sur l’intérêt légitime à répondre aux demandes reçues et, lorsque la demande concerne une prestation, sur les mesures précontractuelles prises à la demande de la personne.'] },
      { title: 'Destinataires et infrastructure', paragraphs: ['Les destinataires sont NacoDev et les prestataires techniques strictement nécessaires au fonctionnement du site et du formulaire. Le formulaire est techniquement traité via l’infrastructure utilisée par le site, notamment celle de l’hébergeur indiqué dans les mentions légales.'] },
      { title: 'Durée de conservation', paragraphs: ['Les données sont conservées pendant la durée nécessaire au traitement de la demande et au suivi des échanges, selon la durée définie par NacoDev dans sa politique interne. La valeur précise doit être validée avant la mise en production.'] },
      { title: 'Vos droits', paragraphs: ['Vous pouvez demander l’accès, la rectification, l’effacement ou la limitation du traitement de vos données, ainsi que vous opposer au traitement lorsque ce droit est applicable. Le contact pour exercer ces droits est indiqué ci-dessous.', 'Si vous estimez, après avoir contacté NacoDev, que vos droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL.'] },
      { title: 'Cookies et stockage local', paragraphs: ['Le site utilise le stockage local fonctionnel du navigateur pour mémoriser la langue choisie, sous la clé « nacodev.locale ». Aucun cookie publicitaire ni outil de suivi marketing n’est utilisé.'] },
    ],
    terms: [
      { title: 'Article 1 — Objet et champ d’application', paragraphs: ['Les présentes conditions générales encadrent les prestations de NacoDev : conception et développement web, création et évolution de solutions numériques, conseil et accompagnement technique, interventions ponctuelles, infrastructure informatique, réseau, sécurité, équipements et prestations numériques associées.', 'La nature, le périmètre et les livrables exacts sont exclusivement ceux définis dans le devis accepté. Le devis prévaut en cas de contradiction avec les présentes CGV.'] },
      { title: 'Article 2 — Devis et commande', paragraphs: ['La commande devient ferme après acceptation du devis par le client et, lorsqu’il est prévu, paiement de l’acompte indiqué. Toute demande hors du périmètre accepté peut faire l’objet d’un devis complémentaire ou d’une tarification supplémentaire soumise à l’accord du client.'] },
      { title: 'Article 3 — Réalisation des prestations', paragraphs: ['NacoDev exécute les prestations avec soin, conformément au devis et aux règles de l’art, dans le cadre d’une obligation de moyens. Les choix techniques peuvent évoluer lorsque cela est nécessaire à la sécurité, à la fiabilité ou à la bonne réalisation du projet, après information du client si l’évolution modifie substantiellement le devis.'] },
      { title: 'Article 4 — Obligations du client', paragraphs: ['Le client fournit dans les délais convenus les informations, accès, validations et contenus nécessaires. Il garantit disposer des droits requis sur les textes, images, marques, logiciels, données et autres éléments transmis à NacoDev.', 'Tout retard ou défaut de coopération susceptible d’affecter la prestation peut entraîner un décalage du calendrier et, si nécessaire, un ajustement chiffré.'] },
      { title: 'Article 5 — Délais et livraison', paragraphs: ['Les délais et modalités de livraison sont ceux du devis. Sauf engagement express qualifié d’essentiel, les dates sont estimatives et dépendent notamment de la remise des éléments et validations par le client.', 'La livraison peut prendre la forme d’une mise en ligne, d’un accès, d’un transfert de fichiers, d’une intervention ou de tout autre mode prévu au devis. Le client signale les réserves vérifiables dans le délai éventuellement fixé au devis.'] },
      { title: 'Article 6 — Hébergement et services tiers', paragraphs: ['L’hébergement, les noms de domaine, licences, matériels ou services tiers peuvent être souscrits directement par le client ou gérés par NacoDev si le devis le prévoit. Leurs conditions, tarifs, disponibilités et évolutions relèvent de leurs fournisseurs respectifs.', 'NacoDev ne peut garantir la continuité d’un service tiers, mais informe et accompagne le client dans les limites de la prestation convenue.'] },
      { title: 'Article 7 — Prix et modalités de paiement', paragraphs: ['Les prix, modalités, échéances et éventuels acomptes sont précisés dans le devis accepté. Les prestations ou frais non inclus ne sont engagés qu’après information et accord du client.', 'Les factures sont payables selon les conditions qui y figurent. Aucun schéma d’acompte fixe ne s’applique en dehors de ce qui est prévu au devis.'] },
      { title: 'Article 8 — Retard de paiement', paragraphs: ['Tout retard ouvre droit aux pénalités prévues par la réglementation et précisées sur le devis ou la facture. Pour un client professionnel, les pénalités sont exigibles sans rappel et l’indemnité forfaitaire légale pour frais de recouvrement est due, sans préjudice des frais supplémentaires justifiés lorsque la loi le permet.', 'NacoDev peut suspendre l’exécution après mise en demeure restée sans effet, sous réserve des règles impératives applicables.'] },
      { title: 'Article 9 — Propriété intellectuelle', paragraphs: ['Le client conserve ses droits sur les contenus qu’il fournit et autorise leur utilisation pour les besoins de la prestation. Les droits portant sur les créations spécifiques sont transférés ou concédés uniquement selon le périmètre, les supports, la durée et les conditions de paiement prévus au devis.', 'Les outils, méthodes, bibliothèques, composants génériques et savoir-faire antérieurs ou réutilisables restent la propriété de leurs titulaires. Sauf opposition prévue contractuellement, NacoDev peut présenter publiquement la réalisation dans son portfolio sans divulguer d’informations confidentielles.'] },
      { title: 'Article 10 — Responsabilité', paragraphs: ['Chaque partie répond des dommages directs et prévisibles résultant de ses manquements, dans les limites permises par la loi. NacoDev ne répond pas des contenus du client, des usages non conformes, des modifications réalisées par un tiers, ni des défaillances de services ou équipements hors de son contrôle.', 'Aucune garantie de résultat n’est donnée concernant le référencement, l’audience, les performances commerciales ou le positionnement dans les moteurs de recherche. Les garanties légales impératives demeurent applicables.'] },
      { title: 'Article 11 — Maintenance et interventions', paragraphs: ['La maintenance, le support, les sauvegardes et les interventions après livraison ne sont inclus que s’ils figurent au devis ou dans un contrat distinct. Toute intervention hors périmètre peut être facturée après accord.', 'Le client reste responsable de l’exploitation courante, des renouvellements et des sauvegardes lorsqu’ils ne sont pas confiés à NacoDev.'] },
      { title: 'Article 12 — Résiliation', paragraphs: ['En cas de manquement grave non corrigé après mise en demeure dans un délai raisonnable, l’autre partie peut résilier la prestation, sans préjudice des droits déjà acquis. Les travaux réalisés, frais engagés et services fournis jusqu’à la date d’effet restent dus.', 'Les modalités particulières de résiliation, de réversibilité ou de remise des éléments sont précisées au devis lorsque le projet le nécessite.'] },
      { title: 'Article 13 — Confidentialité et données', paragraphs: ['Chaque partie protège les informations confidentielles reçues et ne les utilise que pour l’exécution de la prestation. Cette obligation ne couvre pas les informations publiques, déjà connues légitimement ou dont la divulgation est imposée par la loi.', 'Lorsque la prestation implique des données personnelles, les rôles et obligations des parties sont définis selon la réglementation applicable et, si nécessaire, dans un accord spécifique.'] },
      { title: 'Article 14 — Droit de rétractation des consommateurs', paragraphs: ['Lorsqu’un contrat est conclu à distance ou hors établissement avec un consommateur et que la réglementation l’impose, celui-ci dispose en principe de quatorze jours à compter de la conclusion du contrat de prestation pour se rétracter.', 'Si le consommateur demande expressément que l’exécution commence avant la fin de ce délai, il reste redevable du montant proportionnel au service fourni jusqu’à sa rétractation. Le droit peut être perdu lorsque la prestation est entièrement exécutée avant la fin du délai après accord exprès et reconnaissance de cette perte, ou dans les autres cas d’exception prévus par la loi.'] },
      { title: 'Article 15 — Médiation de la consommation', paragraphs: ['Après une réclamation écrite préalable restée sans solution, le consommateur peut saisir gratuitement le médiateur de la consommation dont relève NacoDev. Ses coordonnées doivent être renseignées dans la configuration juridique et communiquées avant toute mise en production destinée aux consommateurs.'] },
      { title: 'Article 16 — Droit applicable et règlement des litiges', paragraphs: ['Les présentes CGV sont soumises au droit français. Les parties recherchent d’abord une solution amiable. Le consommateur conserve le bénéfice des règles impératives et des juridictions auxquelles la loi lui permet de recourir.', 'Pour les litiges entre professionnels, la juridiction compétente est déterminée par les règles de droit commun, sauf clause valable plus précise figurant au devis.'] },
      { title: 'Article 17 — Acceptation des CGV', paragraphs: ['L’acceptation du devis emporte acceptation des CGV communiquées au client avant la commande. Toute condition particulière n’est opposable que si elle a été expressément acceptée par écrit par NacoDev.'] },
    ],
    developmentTodoTitle: 'Données à compléter avant production',
    retentionTodo: 'TODO : définir et valider la durée de conservation des demandes de contact.',
    mediatorTodo: 'TODO : renseigner le médiateur de la consommation avant de contracter avec des consommateurs.',
    rightsReserved: 'Tous droits réservés.',
  },
  en: {
    archiveTitle: 'Archives / Legal information',
    tabs: { legalNotice: 'Legal notice', privacy: 'Privacy', terms: 'Terms' },
    navigationLabel: 'Legal information navigation',
    referenceNotice: 'The French version is the authoritative version in the event of any difference in interpretation.',
    updatedLabel: 'Last updated',
    legalNotice: {
      identityTitle: 'Website publisher',
      labels: {
        businessName: 'Trading name', ownerName: 'Owner', legalStatus: 'Legal status', activity: 'Business activity',
        address: 'Address', phone: 'Phone', email: 'Email', publicationDirector: 'Publication director', host: 'Hosting provider',
        siren: 'SIREN', siret: 'SIRET', registrationNumber: 'Registration / RNE', vatNumber: 'EU VAT number',
      },
      intellectualPropertyTitle: 'Intellectual property',
      intellectualProperty: 'The website, its design, graphic elements, texts, content and creations are protected unless otherwise stated. Any unauthorised reproduction, representation, adaptation or use is prohibited to the extent provided by law.',
    },
    privacy: [
      { title: 'Data controller', paragraphs: ['Nicolas Freche — NacoDev is the controller of personal data submitted through this website. Questions may be sent to the address below.'] },
      { title: 'Data collected', paragraphs: ['The contact form collects only the name, email address, subject and message entered by the user.'] },
      { title: 'Purpose and legal basis', paragraphs: ['The data is used to answer enquiries sent through the contact form and to follow up the resulting correspondence.', 'Processing is based on the legitimate interest in answering enquiries and, where an enquiry concerns a service, on steps taken at the data subject’s request before entering into a contract.'] },
      { title: 'Recipients and infrastructure', paragraphs: ['Recipients are NacoDev and the technical service providers strictly necessary to operate the website and form. The form is technically processed through the infrastructure used by the website, including the hosting provider named in the legal notice.'] },
      { title: 'Retention', paragraphs: ['Data is retained for the time necessary to handle the enquiry and follow-up correspondence, according to the period defined in NacoDev’s internal policy. The precise period must be validated before production.'] },
      { title: 'Your rights', paragraphs: ['You may request access, rectification, erasure or restriction of your data, and object to processing where that right applies. The contact address for exercising these rights is shown below.', 'If, after contacting NacoDev, you believe your rights have not been respected, you may lodge a complaint with the French data protection authority, the CNIL.'] },
      { title: 'Cookies and local storage', paragraphs: ['The website uses functional browser local storage to remember the selected language under the key “nacodev.locale”. No advertising cookies or marketing tracking tools are used.'] },
    ],
    terms: [
      { title: 'Article 1 — Purpose and scope', paragraphs: ['These terms govern NacoDev services: web design and development, creation and evolution of digital solutions, technical advice and assistance, one-off work, IT infrastructure, networks, security, equipment and related digital services.', 'The exact scope and deliverables are exclusively those in the accepted quotation, which prevails if it conflicts with these terms.'] },
      { title: 'Article 2 — Quotation and order', paragraphs: ['An order becomes binding when the client accepts the quotation and, where applicable, pays the stated deposit. Any request outside the agreed scope may require an additional quotation or charge, subject to the client’s approval.'] },
      { title: 'Article 3 — Performance of services', paragraphs: ['NacoDev performs the services with reasonable care, in accordance with the quotation and professional standards, under a best-efforts obligation. Technical choices may evolve for security, reliability or delivery needs; the client will be informed if this materially changes the quotation.'] },
      { title: 'Article 4 — Client obligations', paragraphs: ['The client supplies the information, access, approvals and content required within the agreed time and warrants that it holds the necessary rights to all texts, images, trade marks, software, data and other supplied materials.', 'A delay or lack of cooperation affecting delivery may shift the timetable and, where necessary, lead to an agreed price adjustment.'] },
      { title: 'Article 5 — Timing and delivery', paragraphs: ['Timing and delivery arrangements are set out in the quotation. Unless expressly stated to be essential, dates are estimates and depend on the client providing materials and approvals.', 'Delivery may be a launch, access, file transfer, intervention or any method stated in the quotation. The client must report verifiable reservations within any period specified there.'] },
      { title: 'Article 6 — Hosting and third-party services', paragraphs: ['Hosting, domain names, licences, hardware and third-party services may be purchased by the client or managed by NacoDev if stated in the quotation. Their terms, pricing, availability and changes are controlled by their respective providers.', 'NacoDev cannot guarantee continuity of a third-party service, but will inform and assist the client within the agreed scope.'] },
      { title: 'Article 7 — Prices and payment', paragraphs: ['Prices, payment terms, due dates and any deposits are specified in the accepted quotation. Services and costs not included are incurred only after informing and obtaining approval from the client.', 'Invoices are payable under the terms shown on them. No fixed deposit schedule applies unless stated in the quotation.'] },
      { title: 'Article 8 — Late payment', paragraphs: ['Late payment gives rise to the penalties required by law and specified on the quotation or invoice. For business clients, penalties are due without reminder and the statutory fixed recovery charge applies, without prejudice to further documented recovery costs where permitted.', 'NacoDev may suspend performance after a formal notice remains ineffective, subject to mandatory law.'] },
      { title: 'Article 9 — Intellectual property', paragraphs: ['The client retains rights to supplied content and permits its use for the service. Rights in bespoke creations are assigned or licensed only for the scope, media, duration and payment conditions stated in the quotation.', 'Pre-existing or reusable tools, methods, libraries, generic components and know-how remain with their owners. Unless contractually opposed, NacoDev may show the work in its portfolio without disclosing confidential information.'] },
      { title: 'Article 10 — Liability', paragraphs: ['Each party is liable for direct and foreseeable loss caused by its breach, within limits permitted by law. NacoDev is not liable for client content, misuse, third-party alterations, or services and equipment outside its control.', 'No result is guaranteed for SEO, audience, commercial performance or search-engine ranking. Mandatory statutory warranties remain unaffected.'] },
      { title: 'Article 11 — Maintenance and interventions', paragraphs: ['Maintenance, support, backups and post-delivery work are included only when stated in the quotation or a separate agreement. Work outside scope may be invoiced after approval.', 'The client remains responsible for routine operation, renewals and backups unless they are entrusted to NacoDev.'] },
      { title: 'Article 12 — Termination', paragraphs: ['If a serious breach is not remedied within a reasonable period after formal notice, the other party may terminate, without affecting accrued rights. Completed work, committed costs and services delivered up to the effective date remain payable.', 'Specific termination, reversibility or handover arrangements are set out in the quotation when required.'] },
      { title: 'Article 13 — Confidentiality and data', paragraphs: ['Each party protects confidential information received and uses it only to perform the service. This does not cover public information, information lawfully known already or disclosure required by law.', 'Where personal data is involved, the parties’ roles and duties are defined under applicable rules and, where needed, a specific agreement.'] },
      { title: 'Article 14 — Consumer withdrawal right', paragraphs: ['Where a contract is made at a distance or off-premises with a consumer and the law applies, the consumer generally has fourteen days from conclusion of the service contract to withdraw.', 'If the consumer expressly requests early performance, they remain liable for the proportionate service supplied before withdrawal. The right may be lost once the service is fully performed before expiry following express agreement and acknowledgement, or in other statutory exceptions.'] },
      { title: 'Article 15 — Consumer mediation', paragraphs: ['After a prior written complaint remains unresolved, a consumer may refer the matter free of charge to NacoDev’s consumer mediator. The mediator’s details must be entered in the legal configuration and communicated before any consumer-facing production launch.'] },
      { title: 'Article 16 — Governing law and disputes', paragraphs: ['These terms are governed by French law. The parties first seek an amicable solution. Consumers retain mandatory protections and access to any courts available to them by law.', 'For business disputes, jurisdiction is determined by ordinary rules unless the quotation contains a more specific valid clause.'] },
      { title: 'Article 17 — Acceptance', paragraphs: ['Acceptance of the quotation constitutes acceptance of the terms supplied before the order. Additional terms bind NacoDev only if expressly accepted in writing.'] },
    ],
    developmentTodoTitle: 'Information required before production',
    retentionTodo: 'TODO: define and validate the contact enquiry retention period.',
    mediatorTodo: 'TODO: enter consumer mediator details before contracting with consumers.',
    rightsReserved: 'All rights reserved.',
  },
  es: {
    archiveTitle: 'Archivos / Información legal',
    tabs: { legalNotice: 'Aviso legal', privacy: 'Privacidad', terms: 'CGV' },
    navigationLabel: 'Navegación de la información legal',
    referenceNotice: 'La versión francesa constituye la versión de referencia en caso de divergencia de interpretación.',
    updatedLabel: 'Última actualización',
    legalNotice: {
      identityTitle: 'Editor del sitio',
      labels: {
        businessName: 'Nombre comercial', ownerName: 'Empresario', legalStatus: 'Estatuto jurídico', activity: 'Actividad',
        address: 'Dirección', phone: 'Teléfono', email: 'Email', publicationDirector: 'Director de publicación', host: 'Alojamiento',
        siren: 'SIREN', siret: 'SIRET', registrationNumber: 'Registro / RNE', vatNumber: 'IVA intracomunitario',
      },
      intellectualPropertyTitle: 'Propiedad intelectual',
      intellectualProperty: 'El sitio, su diseño, sus elementos gráficos, textos, contenidos y creaciones están protegidos salvo indicación contraria. Queda prohibida toda reproducción, representación, adaptación o explotación no autorizada dentro de los límites previstos por la ley.',
    },
    privacy: [
      { title: 'Responsable del tratamiento', paragraphs: ['Nicolas Freche — NacoDev es responsable del tratamiento de los datos enviados a través de este sitio. Las consultas pueden dirigirse a la dirección indicada a continuación.'] },
      { title: 'Datos recogidos', paragraphs: ['El formulario de contacto solo recoge el nombre, la dirección de email, el asunto y el mensaje introducidos por el usuario.'] },
      { title: 'Finalidad y base jurídica', paragraphs: ['Los datos se utilizan para responder a las solicitudes enviadas mediante el formulario y asegurar el seguimiento de los intercambios.', 'El tratamiento se basa en el interés legítimo de responder a las solicitudes recibidas y, cuando estas se refieren a un servicio, en medidas precontractuales tomadas a petición de la persona.'] },
      { title: 'Destinatarios e infraestructura', paragraphs: ['Los destinatarios son NacoDev y los proveedores técnicos estrictamente necesarios para el funcionamiento del sitio y del formulario. El formulario se procesa técnicamente mediante la infraestructura utilizada por el sitio, incluido el proveedor de alojamiento indicado en el aviso legal.'] },
      { title: 'Conservación', paragraphs: ['Los datos se conservan durante el tiempo necesario para tramitar la solicitud y dar seguimiento a los intercambios, según el plazo definido en la política interna de NacoDev. El plazo exacto debe validarse antes de producción.'] },
      { title: 'Sus derechos', paragraphs: ['Puede solicitar el acceso, la rectificación, la supresión o la limitación del tratamiento de sus datos, así como oponerse cuando este derecho sea aplicable. La dirección de contacto para ejercerlos figura a continuación.', 'Si, tras contactar con NacoDev, considera que no se han respetado sus derechos, puede presentar una reclamación ante la autoridad francesa de protección de datos, la CNIL.'] },
      { title: 'Cookies y almacenamiento local', paragraphs: ['El sitio utiliza el almacenamiento local funcional del navegador para recordar el idioma elegido, con la clave « nacodev.locale ». No se utilizan cookies publicitarias ni herramientas de seguimiento de marketing.'] },
    ],
    terms: [
      { title: 'Artículo 1 — Objeto y ámbito de aplicación', paragraphs: ['Estas condiciones regulan los servicios de NacoDev: diseño y desarrollo web, creación y evolución de soluciones digitales, asesoramiento y acompañamiento técnico, intervenciones puntuales, infraestructura informática, redes, seguridad, equipos y servicios digitales asociados.', 'La naturaleza, el alcance y los entregables exactos son exclusivamente los definidos en el presupuesto aceptado, que prevalece en caso de contradicción.'] },
      { title: 'Artículo 2 — Presupuesto y pedido', paragraphs: ['El pedido es firme cuando el cliente acepta el presupuesto y, cuando proceda, abona el anticipo indicado. Toda solicitud fuera del alcance acordado puede requerir un presupuesto complementario o coste adicional, sujeto a la aprobación del cliente.'] },
      { title: 'Artículo 3 — Ejecución de los servicios', paragraphs: ['NacoDev presta los servicios con diligencia, conforme al presupuesto y a las buenas prácticas, bajo una obligación de medios. Las decisiones técnicas podrán evolucionar por razones de seguridad, fiabilidad o ejecución; se informará al cliente si ello modifica sustancialmente el presupuesto.'] },
      { title: 'Artículo 4 — Obligaciones del cliente', paragraphs: ['El cliente proporciona a tiempo la información, los accesos, las validaciones y los contenidos necesarios, y garantiza tener los derechos sobre textos, imágenes, marcas, software, datos y demás elementos entregados.', 'Todo retraso o falta de colaboración que afecte al servicio podrá desplazar el calendario y, si fuera necesario, dar lugar a un ajuste económico acordado.'] },
      { title: 'Artículo 5 — Plazos y entrega', paragraphs: ['Los plazos y métodos de entrega son los del presupuesto. Salvo compromiso expreso calificado como esencial, las fechas son estimativas y dependen de la entrega de materiales y validaciones por el cliente.', 'La entrega puede consistir en una puesta en línea, acceso, transferencia de archivos, intervención u otro método previsto. El cliente comunicará las reservas verificables dentro del plazo indicado, si lo hubiera.'] },
      { title: 'Artículo 6 — Alojamiento y servicios de terceros', paragraphs: ['El alojamiento, los dominios, las licencias, los equipos o los servicios de terceros pueden ser contratados por el cliente o gestionados por NacoDev si así se prevé. Sus condiciones, precios, disponibilidad y cambios dependen de sus proveedores.', 'NacoDev no garantiza la continuidad de un servicio tercero, pero informará y asistirá al cliente dentro del alcance acordado.'] },
      { title: 'Artículo 7 — Precios y pago', paragraphs: ['Los precios, condiciones, vencimientos y posibles anticipos figuran en el presupuesto aceptado. Los servicios o gastos no incluidos solo se contratan tras informar al cliente y obtener su acuerdo.', 'Las facturas se pagan según sus condiciones. No se aplica un esquema fijo de anticipo fuera de lo previsto en el presupuesto.'] },
      { title: 'Artículo 8 — Retraso en el pago', paragraphs: ['El retraso genera las penalizaciones legales indicadas en el presupuesto o la factura. Para clientes profesionales, se devengan sin requerimiento y se aplica la indemnización fija legal por costes de cobro, además de los costes adicionales justificados cuando la ley lo permita.', 'NacoDev podrá suspender la ejecución tras un requerimiento sin efecto, respetando las normas imperativas aplicables.'] },
      { title: 'Artículo 9 — Propiedad intelectual', paragraphs: ['El cliente conserva sus derechos sobre los contenidos entregados y autoriza su uso para el servicio. Los derechos sobre creaciones específicas solo se ceden o licencian con el alcance, soportes, duración y condiciones de pago definidos en el presupuesto.', 'Las herramientas, métodos, bibliotecas, componentes genéricos y conocimientos previos o reutilizables siguen perteneciendo a sus titulares. Salvo oposición contractual, NacoDev puede mostrar el trabajo en su portfolio sin divulgar información confidencial.'] },
      { title: 'Artículo 10 — Responsabilidad', paragraphs: ['Cada parte responde de los daños directos y previsibles derivados de sus incumplimientos dentro de los límites legales. NacoDev no responde del contenido del cliente, usos indebidos, cambios de terceros ni fallos de servicios o equipos fuera de su control.', 'No se garantiza ningún resultado sobre posicionamiento, audiencia, rendimiento comercial o clasificación en buscadores. Las garantías legales imperativas permanecen vigentes.'] },
      { title: 'Artículo 11 — Mantenimiento e intervenciones', paragraphs: ['El mantenimiento, soporte, copias de seguridad y trabajos posteriores solo se incluyen si constan en el presupuesto o en otro contrato. Las intervenciones fuera del alcance podrán facturarse tras su aprobación.', 'El cliente es responsable de la operación ordinaria, las renovaciones y las copias cuando no estén confiadas a NacoDev.'] },
      { title: 'Artículo 12 — Resolución', paragraphs: ['Ante un incumplimiento grave no subsanado en un plazo razonable tras requerimiento, la otra parte podrá resolver el servicio sin afectar a los derechos adquiridos. Los trabajos realizados, gastos comprometidos y servicios prestados seguirán siendo pagaderos.', 'El presupuesto precisará, cuando sea necesario, las condiciones de resolución, reversibilidad o entrega de elementos.'] },
      { title: 'Artículo 13 — Confidencialidad y datos', paragraphs: ['Cada parte protege la información confidencial recibida y solo la utiliza para ejecutar el servicio. Se excluye la información pública, ya conocida legítimamente o cuya divulgación exija la ley.', 'Cuando haya datos personales, las funciones y obligaciones de las partes se definen conforme a la normativa aplicable y, si procede, en un acuerdo específico.'] },
      { title: 'Artículo 14 — Derecho de desistimiento de consumidores', paragraphs: ['Cuando el contrato se celebra a distancia o fuera del establecimiento con un consumidor y la normativa lo exige, este dispone en principio de catorce días desde la celebración del contrato de servicios para desistir.', 'Si solicita expresamente el inicio anticipado, deberá pagar la parte proporcional ya prestada. El derecho puede perderse si el servicio se ejecuta totalmente antes de vencer el plazo tras acuerdo expreso y reconocimiento de dicha pérdida, o en otras excepciones legales.'] },
      { title: 'Artículo 15 — Mediación de consumo', paragraphs: ['Tras una reclamación escrita previa sin solución, el consumidor podrá acudir gratuitamente al mediador de consumo competente para NacoDev. Sus datos deben incorporarse a la configuración jurídica y comunicarse antes de cualquier puesta en producción dirigida a consumidores.'] },
      { title: 'Artículo 16 — Ley aplicable y litigios', paragraphs: ['Estas CGV se rigen por el derecho francés. Las partes buscarán primero una solución amistosa. El consumidor conserva las protecciones imperativas y el acceso a los tribunales que la ley le reconoce.', 'En litigios entre profesionales, la competencia se determina por las normas comunes salvo cláusula válida más concreta en el presupuesto.'] },
      { title: 'Artículo 17 — Aceptación', paragraphs: ['La aceptación del presupuesto implica la aceptación de las CGV comunicadas antes del pedido. Cualquier condición adicional solo vincula a NacoDev si ha sido aceptada expresamente por escrito.'] },
    ],
    developmentTodoTitle: 'Información pendiente antes de producción',
    retentionTodo: 'TODO: definir y validar el plazo de conservación de las solicitudes de contacto.',
    mediatorTodo: 'TODO: indicar el mediador de consumo antes de contratar con consumidores.',
    rightsReserved: 'Todos los derechos reservados.',
  },
}
