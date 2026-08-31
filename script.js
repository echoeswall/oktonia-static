const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('open', !open);
  });
}

const LANG_STORAGE_KEY = 'oktonia-lang';
const SUPPORTED_LANGS = ['de', 'el', 'en'];
const DEFAULT_LANG = 'de';

const translations = {
  de: {
    'meta.description': 'Informationen, Orte und Geschichten aus Oktonia.',
    'header.homeAria': 'Oktonia Startseite',
    'menu.button': 'Menü',
    'languagesAria': 'Sprache wählen',
    'nav.uebernachten': 'Übernachten',
    'nav.essen': 'Essen & Einkaufen',
    'nav.entdecken': 'Entdecken',
    'nav.kirchen': 'Kirchen & Klöster',
    'nav.geschichte': 'Geschichte',
    'nav.dorfleben': 'Dorfleben',
    'hero.eyebrow': 'Εύβοια · Ελλάδα',
    'hero.intro': '[Kurze Einführung in das Dorf, seine Landschaft und das Leben vor Ort.]',
    'hero.cta': 'Ort entdecken',
    'hero.imageAlt': 'Blick über Oktonia: Dorf zwischen Bergen, umgeben von Wald',
    'orientation.eyebrow': 'Orientierung',
    'orientation.heading': 'Das Dorf<br>auf einen Blick',
    'cat.uebernachten.title': 'Übernachten',
    'cat.uebernachten.desc': 'Apartments & Ferienhäuser',
    'cat.essen.title': 'Essen & Einkaufen',
    'cat.essen.desc': 'Tavernen, Cafés & Geschäfte',
    'cat.entdecken.title': 'Entdecken',
    'cat.entdecken.desc': 'Strände, Wege & Ausflüge',
    'cat.kirchen.title': 'Kirchen & Klöster',
    'cat.kirchen.desc': 'Orte, Feste & Geschichten',
    'feature.eyebrow': 'Aktuell im Dorf',
    'feature.title': '[Titel einer aktuellen Meldung oder Veranstaltung]',
    'feature.teaser': '[Kurzer Teaser für Dorfnachrichten, Feste oder die neueste Ausgabe der Dorfzeitung.]',
    'feature.cta': 'Zum Dorfleben',
    'feature.imageAria': 'Aktuell im Dorf Platzhalter',
    'feature.imageCaption': 'Bildplatzhalter · Aktuell im Dorf',
    'editorial.eyebrow': 'Geschichte & Erinnerung',
    'editorial.heading': 'Ein Ort,<br>viele Geschichten.',
    'editorial.text': '[Ein kurzer Einstieg in die Geschichte Oktonias. Dieser Bereich kann später auf einen ausführlichen Beitrag oder eine Zeitleiste verweisen.]',
    'editorial.cta': 'Geschichte lesen',
    'editorial.imageAria': 'Historisches Bild Platzhalter',
    'editorial.imageCaption': 'Historisches Bild / Dokument',
    'footer.tagline': '[Kurze Ortsbeschreibung oder Kontaktstelle]',
    'footer.dorfzeitung': 'Dorfzeitung',
    'footer.kontakt': 'Kontakt',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    'footer.meta': '© 2026 · Prototyp mit Platzhalterinhalten',
    'page.eyebrow': 'Oktonia entdecken',
    'hint.eyebrow': 'Hinweis',
    'hint.heading': '[Weitere Einträge und Inhalte folgen.]',
    'hint.text': 'Der Prototyp zeigt die spätere Struktur. Inhalte, Kontaktdaten, Kartenlinks und Bilder werden nach Prüfung ergänzt.',
    'hint.cta': 'Zurück zur Übersicht',
    'card.imagePlaceholder': 'Bildplatzhalter',
    'card.title': '[Name / Titel des Eintrags]',
    'card.desc': '[Kurze Beschreibung mit den wichtigsten Informationen in zwei bis drei Zeilen.]',
    'card.cta': 'Details ansehen'
  },
  en: {
    'meta.description': 'Information, places and stories from Oktonia.',
    'header.homeAria': 'Oktonia home',
    'menu.button': 'Menu',
    'languagesAria': 'Choose language',
    'nav.uebernachten': 'Stay',
    'nav.essen': 'Eat & Shop',
    'nav.entdecken': 'Explore',
    'nav.kirchen': 'Churches & Monasteries',
    'nav.geschichte': 'History',
    'nav.dorfleben': 'Village Life',
    'hero.eyebrow': 'Evia · Greece',
    'hero.intro': '[Short introduction to the village, its landscape and everyday life.]',
    'hero.cta': 'Discover the place',
    'hero.imageAlt': 'View of Oktonia: village nestled between mountains, surrounded by forest',
    'orientation.eyebrow': 'Orientation',
    'orientation.heading': 'The village<br>at a glance',
    'cat.uebernachten.title': 'Stay',
    'cat.uebernachten.desc': 'Apartments & holiday homes',
    'cat.essen.title': 'Eat & Shop',
    'cat.essen.desc': 'Taverns, cafés & shops',
    'cat.entdecken.title': 'Explore',
    'cat.entdecken.desc': 'Beaches, trails & trips',
    'cat.kirchen.title': 'Churches & Monasteries',
    'cat.kirchen.desc': 'Places, feasts & stories',
    'feature.eyebrow': 'Currently in the village',
    'feature.title': '[Title of a current announcement or event]',
    'feature.teaser': '[Short teaser for village news, festivals or the latest village newspaper issue.]',
    'feature.cta': 'To village life',
    'feature.imageAria': 'Currently in the village placeholder',
    'feature.imageCaption': 'Image placeholder · Currently in the village',
    'editorial.eyebrow': 'History & Memory',
    'editorial.heading': 'One place,<br>many stories.',
    'editorial.text': "[A short introduction to Oktonia's history. This section can later link to a detailed article or a timeline.]",
    'editorial.cta': 'Read the history',
    'editorial.imageAria': 'Historical image placeholder',
    'editorial.imageCaption': 'Historical image / document',
    'footer.tagline': '[Short description of the place or contact point]',
    'footer.dorfzeitung': 'Village newspaper',
    'footer.kontakt': 'Contact',
    'footer.impressum': 'Legal notice',
    'footer.datenschutz': 'Privacy',
    'footer.meta': '© 2026 · Prototype with placeholder content',
    'page.eyebrow': 'Discover Oktonia',
    'hint.eyebrow': 'Note',
    'hint.heading': '[More entries and content coming soon.]',
    'hint.text': 'The prototype shows the future structure. Content, contact details, map links and images will be added after review.',
    'hint.cta': 'Back to overview',
    'card.imagePlaceholder': 'Image placeholder',
    'card.title': '[Entry name / title]',
    'card.desc': '[Short description with the most important information in two to three lines.]',
    'card.cta': 'View details'
  },
  el: {
    'meta.description': 'Πληροφορίες, τόποι και ιστορίες από την Οκτωνιά.',
    'header.homeAria': 'Αρχική Οκτωνιάς',
    'menu.button': 'Μενού',
    'languagesAria': 'Επιλογή γλώσσας',
    'nav.uebernachten': 'Διαμονή',
    'nav.essen': 'Φαγητό & Ψώνια',
    'nav.entdecken': 'Εξερεύνηση',
    'nav.kirchen': 'Εκκλησίες & Μοναστήρια',
    'nav.geschichte': 'Ιστορία',
    'nav.dorfleben': 'Ζωή στο χωριό',
    'hero.eyebrow': 'Εύβοια · Ελλάδα',
    'hero.intro': '[Σύντομη εισαγωγή στο χωριό, το τοπίο και την καθημερινή ζωή.]',
    'hero.cta': 'Γνωρίστε τον τόπο',
    'hero.imageAlt': 'Θέα προς την Οκτωνιά: χωριό ανάμεσα σε βουνά, περιτριγυρισμένο από δάσος',
    'orientation.eyebrow': 'Προσανατολισμός',
    'orientation.heading': 'Το χωριό<br>με μια ματιά',
    'cat.uebernachten.title': 'Διαμονή',
    'cat.uebernachten.desc': 'Διαμερίσματα & εξοχικά',
    'cat.essen.title': 'Φαγητό & Ψώνια',
    'cat.essen.desc': 'Ταβέρνες, καφέ & καταστήματα',
    'cat.entdecken.title': 'Εξερεύνηση',
    'cat.entdecken.desc': 'Παραλίες, μονοπάτια & εκδρομές',
    'cat.kirchen.title': 'Εκκλησίες & Μοναστήρια',
    'cat.kirchen.desc': 'Τόποι, γιορτές & ιστορίες',
    'feature.eyebrow': 'Τώρα στο χωριό',
    'feature.title': '[Τίτλος τρέχουσας ανακοίνωσης ή εκδήλωσης]',
    'feature.teaser': '[Σύντομο απόσπασμα για νέα του χωριού, γιορτές ή το νεότερο τεύχος της εφημερίδας του χωριού.]',
    'feature.cta': 'Στη ζωή του χωριού',
    'feature.imageAria': 'Θέση εικόνας · Τώρα στο χωριό',
    'feature.imageCaption': 'Θέση εικόνας · Τώρα στο χωριό',
    'editorial.eyebrow': 'Ιστορία & Μνήμη',
    'editorial.heading': 'Ένας τόπος,<br>πολλές ιστορίες.',
    'editorial.text': '[Μια σύντομη εισαγωγή στην ιστορία της Οκτωνιάς. Η ενότητα αυτή μπορεί αργότερα να παραπέμπει σε αναλυτικό άρθρο ή χρονολόγιο.]',
    'editorial.cta': 'Διαβάστε την ιστορία',
    'editorial.imageAria': 'Θέση ιστορικής εικόνας',
    'editorial.imageCaption': 'Ιστορική εικόνα / έγγραφο',
    'footer.tagline': '[Σύντομη περιγραφή του τόπου ή στοιχείο επικοινωνίας]',
    'footer.dorfzeitung': 'Εφημερίδα του χωριού',
    'footer.kontakt': 'Επικοινωνία',
    'footer.impressum': 'Νομικές πληροφορίες',
    'footer.datenschutz': 'Απόρρητο',
    'footer.meta': '© 2026 · Πρωτότυπο με ενδεικτικό περιεχόμενο',
    'page.eyebrow': 'Γνωρίστε την Οκτωνιά',
    'hint.eyebrow': 'Σημείωση',
    'hint.heading': '[Περισσότερες καταχωρίσεις και περιεχόμενο σύντομα.]',
    'hint.text': 'Το πρωτότυπο δείχνει τη μελλοντική δομή. Περιεχόμενο, στοιχεία επικοινωνίας, σύνδεσμοι χαρτών και εικόνες θα προστεθούν μετά τον έλεγχο.',
    'hint.cta': 'Πίσω στην επισκόπηση',
    'card.imagePlaceholder': 'Θέση εικόνας',
    'card.title': '[Όνομα / τίτλος καταχώρισης]',
    'card.desc': '[Σύντομη περιγραφή με τις σημαντικότερες πληροφορίες σε δύο έως τρεις γραμμές.]',
    'card.cta': 'Δείτε λεπτομέρειες'
  }
};

const pagesData = {
  de: {
    'uebernachten': { index:'01', title:'Übernachten', intro:'[Einführung zu Unterkünften in Oktonia und der näheren Umgebung.]', categories:['Apartment','Ferienhaus','Pension'], meta:'Kontakt · Lage · Buchungslink' },
    'essen-einkaufen': { index:'02', title:'Essen & Einkaufen', intro:'[Einführung zu Tavernen, Cafés und lokalen Geschäften.]', categories:['Taverne','Café','Geschäft'], meta:'Telefon · Öffnungszeiten · Karte' },
    'entdecken': { index:'03', title:'Entdecken', intro:'[Einführung zu Stränden, Wanderwegen und Ausflugszielen rund um Oktonia.]', categories:['Strand','Wanderweg','Ausflugsziel'], meta:'Entfernung · Dauer · Hinweise' },
    'kirchen-kloester': { index:'04', title:'Kirchen & Klöster', intro:'[Einführung zu sakralen Orten, ihrer Geschichte und lokalen Festen.]', categories:['Kirche','Kapelle','Kloster'], meta:'Ort · Geschichte · Besuchshinweise' },
    'geschichte': { index:'05', title:'Geschichte', intro:'[Einführung in die Geschichte, Erinnerungen und historischen Quellen des Dorfes.]', categories:['Chronik','Zeitzeugen','Bildarchiv'], meta:'Zeitraum · Quelle · Beitrag' },
    'dorfleben': { index:'06', title:'Dorfleben', intro:'[Einführung zu Vereinen, Veranstaltungen und der Dorfzeitung.]', categories:['Verein','Veranstaltung','Dorfzeitung'], meta:'Datum · Kontakt · PDF / Link' }
  },
  en: {
    'uebernachten': { index:'01', title:'Stay', intro:'[Introduction to accommodation in Oktonia and the surrounding area.]', categories:['Apartment','Holiday home','Guesthouse'], meta:'Contact · Location · Booking link' },
    'essen-einkaufen': { index:'02', title:'Eat & Shop', intro:'[Introduction to taverns, cafés and local shops.]', categories:['Tavern','Café','Shop'], meta:'Phone · Opening hours · Map' },
    'entdecken': { index:'03', title:'Explore', intro:'[Introduction to beaches, hiking trails and excursion destinations around Oktonia.]', categories:['Beach','Hiking trail','Excursion destination'], meta:'Distance · Duration · Notes' },
    'kirchen-kloester': { index:'04', title:'Churches & Monasteries', intro:'[Introduction to sacred places, their history and local feasts.]', categories:['Church','Chapel','Monastery'], meta:'Place · History · Visitor information' },
    'geschichte': { index:'05', title:'History', intro:'[Introduction to the history, memories and historical sources of the village.]', categories:['Chronicle','Witnesses','Photo archive'], meta:'Period · Source · Contribution' },
    'dorfleben': { index:'06', title:'Village Life', intro:'[Introduction to clubs, events and the village newspaper.]', categories:['Club','Event','Village newspaper'], meta:'Date · Contact · PDF / link' }
  },
  el: {
    'uebernachten': { index:'01', title:'Διαμονή', intro:'[Εισαγωγή στη διαμονή στην Οκτωνιά και τη γύρω περιοχή.]', categories:['Διαμέρισμα','Εξοχικό','Ξενώνας'], meta:'Επικοινωνία · Τοποθεσία · Σύνδεσμος κράτησης' },
    'essen-einkaufen': { index:'02', title:'Φαγητό & Ψώνια', intro:'[Εισαγωγή σε ταβέρνες, καφέ και τοπικά καταστήματα.]', categories:['Ταβέρνα','Καφέ','Κατάστημα'], meta:'Τηλέφωνο · Ωράριο · Χάρτης' },
    'entdecken': { index:'03', title:'Εξερεύνηση', intro:'[Εισαγωγή σε παραλίες, μονοπάτια και προορισμούς εκδρομών γύρω από την Οκτωνιά.]', categories:['Παραλία','Μονοπάτι','Προορισμός εκδρομής'], meta:'Απόσταση · Διάρκεια · Υποδείξεις' },
    'kirchen-kloester': { index:'04', title:'Εκκλησίες & Μοναστήρια', intro:'[Εισαγωγή σε ιερούς τόπους, την ιστορία τους και τοπικές γιορτές.]', categories:['Εκκλησία','Παρεκκλήσι','Μοναστήρι'], meta:'Τοποθεσία · Ιστορία · Πληροφορίες επίσκεψης' },
    'geschichte': { index:'05', title:'Ιστορία', intro:'[Εισαγωγή στην ιστορία, τις μνήμες και τις ιστορικές πηγές του χωριού.]', categories:['Χρονικό','Μάρτυρες','Φωτογραφικό αρχείο'], meta:'Περίοδος · Πηγή · Συνεισφορά' },
    'dorfleben': { index:'06', title:'Ζωή στο χωριό', intro:'[Εισαγωγή σε συλλόγους, εκδηλώσεις και την εφημερίδα του χωριού.]', categories:['Σύλλογος','Εκδήλωση','Εφημερίδα χωριού'], meta:'Ημερομηνία · Επικοινωνία · PDF / σύνδεσμος' }
  }
};

const sectionImages = {
  'kirchen-kloester': [
    {
      src: 'assets/images/kirchen-kloester-kapelle.jpg',
      alt: {
        de: 'Kleine weiße Kapelle mit Kreuzen vor einem Berghang bei Oktonia',
        en: 'Small white chapel with crosses in front of a mountainside near Oktonia',
        el: 'Μικρό λευκό εξωκλήσι με σταυρούς μπροστά σε πλαγιά κοντά στην Οκτωνιά'
      }
    }
  ],
  'entdecken': [
    {
      src: 'assets/images/entdecken-strand-bucht.jpg',
      alt: {
        de: 'Türkisfarbene Bucht mit Sandstrand und Felsen bei Oktonia',
        en: 'Turquoise bay with a sandy beach and rocks near Oktonia',
        el: 'Τιρκουάζ κόλπος με αμμουδιά και βράχια κοντά στην Οκτωνιά'
      }
    },
    {
      src: 'assets/images/entdecken-strand-felsen.jpg',
      alt: {
        de: 'Felsige Küste mit türkisfarbenem Wasser bei Oktonia',
        en: 'Rocky coastline with turquoise water near Oktonia',
        el: 'Βραχώδης ακτή με τιρκουάζ νερά κοντά στην Οκτωνιά'
      }
    }
  ]
};

function detectLanguage() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  } catch (error) {
    /* localStorage unavailable (private mode etc.) — fall through to browser detection */
  }
  const candidates = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || DEFAULT_LANG];
  for (const candidate of candidates) {
    const code = candidate.slice(0, 2).toLowerCase();
    if (SUPPORTED_LANGS.includes(code)) return code;
  }
  return DEFAULT_LANG;
}

function t(lang, key) {
  return translations[lang][key] ?? translations[DEFAULT_LANG][key] ?? key;
}

function renderSection(lang) {
  const key = new URLSearchParams(location.search).get('seite') || 'entdecken';
  const sectionPages = pagesData[lang];
  const page = sectionPages[key] || sectionPages.entdecken;
  document.title = `${page.title} · Oktonia.info`;
  document.querySelector('[data-index]').textContent = page.index;
  document.querySelector('[data-title]').textContent = page.title;
  document.querySelector('[data-intro]').textContent = page.intro;
  document.querySelector('[data-listings]').innerHTML = page.categories.map((category, index) => {
    const photo = (sectionImages[key] || [])[index];
    const aspect = index === 0 ? 'landscape' : 'portrait';
    const media = photo
      ? `<img src="${photo.src}" alt="${photo.alt[lang]}" loading="lazy">`
      : `<span class="placeholder-cross"></span><span>${t(lang, 'card.imagePlaceholder')} · ${category}</span>`;
    const mediaAttrs = photo ? '' : ` role="img" aria-label="${t(lang, 'card.imagePlaceholder')} ${category}"`;
    return `
    <article class="listing-card">
      <div class="image-placeholder ${aspect}${photo ? ' photo-filled' : ''}"${mediaAttrs}>${media}</div>
      <div class="listing-topline"><span>${category}</span><span>0${index + 1}</span></div>
      <h2>${t(lang, 'card.title')}</h2>
      <p>${t(lang, 'card.desc')}</p>
      <div class="listing-meta">${page.meta}</div>
      <a class="text-link" href="#">${t(lang, 'card.cta')} <span>→</span></a>
    </article>`;
  }).join('');
}

function applyTranslations(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(lang, el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    el.innerHTML = t(lang, el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    el.setAttribute('aria-label', t(lang, el.getAttribute('data-i18n-aria')));
  });
  document.querySelectorAll('[data-i18n-content]').forEach((el) => {
    el.setAttribute('content', t(lang, el.getAttribute('data-i18n-content')));
  });
  document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t(lang, el.getAttribute('data-i18n-alt')));
  });
  document.querySelectorAll('.languages a[data-lang]').forEach((a) => {
    a.classList.toggle('active', a.getAttribute('data-lang') === lang);
  });

  if (document.body.hasAttribute('data-section-page')) {
    renderSection(lang);
  }
}

function setLanguage(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch (error) {
    /* localStorage unavailable — language choice just won't persist across visits */
  }
  applyTranslations(lang);
}

document.querySelectorAll('.languages a[data-lang]').forEach((a) => {
  a.addEventListener('click', (event) => {
    event.preventDefault();
    setLanguage(a.getAttribute('data-lang'));
  });
});

applyTranslations(detectLanguage());
