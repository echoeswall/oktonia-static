const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#main-nav');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('open', !open);
  });
}

const pages = {
  'uebernachten': { index:'01', title:'Übernachten', intro:'[Einführung zu Unterkünften in Oktonia und der näheren Umgebung.]', categories:['Apartment','Ferienhaus','Pension'], meta:'Kontakt · Lage · Buchungslink' },
  'essen-einkaufen': { index:'02', title:'Essen & Einkaufen', intro:'[Einführung zu Tavernen, Cafés und lokalen Geschäften.]', categories:['Taverne','Café','Geschäft'], meta:'Telefon · Öffnungszeiten · Karte' },
  'entdecken': { index:'03', title:'Entdecken', intro:'[Einführung zu Stränden, Wanderwegen und Ausflugszielen rund um Oktonia.]', categories:['Strand','Wanderweg','Ausflugsziel'], meta:'Entfernung · Dauer · Hinweise' },
  'kirchen-kloester': { index:'04', title:'Kirchen & Klöster', intro:'[Einführung zu sakralen Orten, ihrer Geschichte und lokalen Festen.]', categories:['Kirche','Kapelle','Kloster'], meta:'Ort · Geschichte · Besuchshinweise' },
  'geschichte': { index:'05', title:'Geschichte', intro:'[Einführung in die Geschichte, Erinnerungen und historischen Quellen des Dorfes.]', categories:['Chronik','Zeitzeugen','Bildarchiv'], meta:'Zeitraum · Quelle · Beitrag' },
  'dorfleben': { index:'06', title:'Dorfleben', intro:'[Einführung zu Vereinen, Veranstaltungen und der Dorfzeitung.]', categories:['Verein','Veranstaltung','Dorfzeitung'], meta:'Datum · Kontakt · PDF / Link' }
};

if (document.body.hasAttribute('data-section-page')) {
  const key = new URLSearchParams(location.search).get('seite') || 'entdecken';
  const page = pages[key] || pages.entdecken;
  document.title = `${page.title} · Oktonia.info`;
  document.querySelector('[data-index]').textContent = page.index;
  document.querySelector('[data-title]').textContent = page.title;
  document.querySelector('[data-intro]').textContent = page.intro;
  document.querySelector('[data-listings]').innerHTML = page.categories.map((category, index) => `
    <article class="listing-card">
      <div class="image-placeholder ${index === 0 ? 'landscape' : 'portrait'}" role="img" aria-label="Bildplatzhalter ${category}"><span class="placeholder-cross"></span><span>Bildplatzhalter · ${category}</span></div>
      <div class="listing-topline"><span>${category}</span><span>0${index + 1}</span></div>
      <h2>[Name / Titel des Eintrags]</h2>
      <p>[Kurze Beschreibung mit den wichtigsten Informationen in zwei bis drei Zeilen.]</p>
      <div class="listing-meta">${page.meta}</div>
      <a class="text-link" href="#">Details ansehen <span>→</span></a>
    </article>`).join('');
}
