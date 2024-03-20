import type { Translations } from '../../types.mjs'

export const edMetaOptions: Record<string, Translations> = {
  content_type: {
    'assessment': 'Bewertung',
    'concept-map': 'Konzeptlandkarte',
    'course': 'Kurs',
    'curriculum': 'Curriculum',
    'data-set': 'Datensatz',
    'experiment': 'Experiment',
    'game': 'Spiel',
    'glossary': 'Glossar',
    'graph': 'Graph',
    'guides-and-tutorials': 'Anleitungen und Tutorials',
    'interactive-learning-object': 'Interaktives Lernobjekt',
    'map': 'Karte',
    'online-courses-site': 'Onlinekurs Seite',
    'project': 'Projekt',
    'questionnaire': 'Fragebogen',
    'reading': 'Lesung',
    'references': 'Referenzen',
    'report': 'Bericht',
    'repository': 'Repositorium',
    'simulation': 'Simulation',
    'unit-of-study': 'Lerneinheit',
  },
  education_level: {
    ED0: 'frühkindliche Erziehung',
    ED1: 'Primarstufe',
    ED2: 'Sekundarstufe I',
    ED3: 'Sekundarstufe II',
    ED4: 'Höhere Schul-oder Berufsbildung',
    ED5: 'Tertiärstufe',
    ED6: 'Bachelor oder gleichwertig',
    ED7: 'Master oder gleichwertig',
    ED8: 'Doktor oder gleichwertig',
    ADT: 'Erwachsenenbidlung',
  },
  month: {
    '1': 'Januar',
    '2': 'Februar',
    '3': 'März',
    '4': 'April',
    '5': 'Mai',
    '6': 'Juni',
    '7': 'Juli',
    '8': 'August',
    '9': 'September',
    '10': 'Oktober',
    '11': 'November',
    '12': 'Dezember',
  },
  subject: {
    F00: 'Generische Programme und Qualifikationen',
    F001: 'Grundlegende Programme und Qualifikationen',
    F002: 'Lesen und Rechnen',
    F003: 'Persönliche Fähigkeiten und Entwicklung',
    F01: 'Bildung',
    F0111: 'Bildungswissenschaft',
    F0112: 'Ausbildung für Kindergärtnerinnen',
    F0113: 'Lehrerausbildung ohne Fachspezialisierung',
    F0114: 'Lehrerausbildung mit Fachspezialisierung',
    F018: 'Interdisziplinäre Programme und Qualifikationen im Bereich Bildung',
    F02: 'Kunst und Geisteswissenschaften',
    F021: 'Kunst',
    F0211: 'Audiovisuelle Techniken und Medienproduktion',
    F0212: 'Mode-, Innen- und Industriedesign',
    F0213: 'Bildende Kunst',
    F0214: 'Handwerk',
    F0215: 'Musik und darstellende Künste',
    F022: 'Geisteswissenschaften (außer Sprachen)',
    F0221: 'Religion und Theologie',
    F0222: 'Geschichte und Archäologie',
    F0223: 'Philosophie und Ethik',
    F023: 'Sprachen',
    F0231: 'Spracherwerb',
    F0232: 'Literatur und Linguistik',
    F028: 'Interdisziplinäre Programme und Qualifikationen im Bereich Kunst und Geisteswissenschaften',
    F03: 'Sozialwissenschaften, Journalismus und Information',
    F031: 'Sozial- und Verhaltenswissenschaften',
    F0311: 'Wirtschaftswissenschaften',
    F0312: 'Politikwissenschaften und Staatskunde',
    F0313: 'Psychologie',
    F0314: 'Soziologie und Kulturwissenschaften',
    F032: 'Journalismus und Information',
    F0321: 'Journalismus und Berichterstattung',
    F0322: 'Bibliotheks-, Informations- und Archivwissenschaften',
    F038: 'Interdisziplinäre Programme und Qualifikationen im Bereich Sozialwissenschaften, Journalismus und Information',
    F04: 'Wirtschaft, Verwaltung und Recht',
    F041: 'Wirtschaft und Verwaltung',
    F0411: 'Buchhaltung und Steuern',
    F0412: 'Finanzen, Bankwesen und Versicherung',
    F0413: 'Management und Verwaltung',
    F0414: 'Marketing und Werbung',
    F0415: 'Sekretariats- und Büroarbeit',
    F0416: 'Groß- und Einzelhandelsverkauf',
    F0417: 'Arbeitsfähigkeiten',
    F042: 'Recht',
    F048: 'Interdisziplinäre Programme und Qualifikationen im Bereich Wirtschaft, Verwaltung und Recht',
    F05: 'Naturwissenschaften, Mathematik und Statistik',
    F051: 'Biologische und verwandte Wissenschaften',
    F0511: 'Biologie',
    F0512: 'Biochemie',
    F052: 'Umwelt',
    F0521: 'Umweltwissenschaften',
    F0522: 'Natürliche Umgebungen und Tierwelt',
    F053: 'Naturwissenschaften',
    F0531: 'Chemie',
    F0532: 'Geowissenschaften',
    F0533: 'Physik',
    F054: 'Mathematik und Statistik',
    F0541: 'Mathematik',
    F0542: 'Statistik',
    F058: 'Interdisziplinäre Programme und Qualifikationen im Bereich Naturwissenschaften, Mathematik und Statistik',
    F06: 'Informations- und Kommunikationstechnologien',
    F0611: 'Computeranwendung',
    F0612: 'Datenbank- und Netzwerkdesign und -verwaltung',
    F0613: 'Software- und Anwendungsentwicklung und -analyse',
    F068: 'Interdisziplinäre Programme und Qualifikationen im Bereich Informations- und Kommunikationstechnologien',
    F07: 'Ingenieurwesen, Fertigung und Bauwesen',
    F071: 'Ingenieurwesen und ingenieurwissenschaftliche Berufe',
    F0711: 'Chemietechnik und Prozesse',
    F0712: 'Umweltschutztechnik',
    F0713: 'Elektrizität und Energie',
    F0714: 'Elektronik und Automation',
    F0715: 'Mechanik und Metallberufe',
    F0716: 'Kraftfahrzeuge, Schiffe und Flugzeuge',
    F072: 'Herstellung und Verarbeitung',
    F0721: 'Lebensmittelverarbeitung',
    F0722: 'Materialien (Glas, Papier, Kunststoff und Holz)',
    F0723: 'Textilien (Kleidung, Schuhe und Leder)',
    F0724: 'Bergbau und Gewinnung',
    F073: 'Architektur und Bauwesen',
    F0732: 'Bauwesen und Tiefbau',
    F078: 'Interdisziplinäre Programme und Qualifikationen im Bereich Ingenieurwesen, Fertigung und Bauwesen',
    F08: 'Landwirtschaft, Forstwirtschaft, Fischerei und Veterinärmedizin',
    F081: 'Landwirtschaft',
    F0811: 'Pflanzen- und Tierproduktion',
    F0812: 'Gartenbau',
    F082: 'Forstwirtschaft',
    F083: 'Fischerei',
    F084: 'Veterinärmedizin',
    F088: 'Interdisziplinäre Programme und Qualifikationen im Bereich Landwirtschaft, Forstwirtschaft, Fischerei und Veterinärmedizin',
    F09: 'Gesundheit und Sozialwesen',
    F091: 'Gesundheit',
    F0911: 'Zahnmedizin',
    F0912: 'Medizin',
    F0913: 'Krankenpflege und Hebammenwesen',
    F0914: 'Medizinische Diagnostik und Behandlungstechnologie',
    F0915: 'Therapie und Rehabilitation',
    F0916: 'Apothekendienst',
    F0917: 'Traditionelle und komplementäre Medizin und Therapie',
    F092: 'Sozialwesen',
    F0920: 'Sozialwesen nicht weiter definiert',
    F0921: 'Betreuung älterer Menschen und behinderter Erwachsener',
    F0922: 'Kinder- und Jugendbetreuung',
    F0923: 'Sozialarbeit und Beratung',
    F098: 'Interdisziplinäre Programme und Qualifikationen im Bereich Gesundheit und Sozialwesen',
    F10: 'Dienstleistungen',
    F101: 'Personaldienstleistungen',
    F1011: 'Domestic services',
    F1012: 'Haar- und Schönheitsdienstleistungen',
    F1013: 'Hotel, Restaurant und Catering',
    F1014: 'Sport',
    F1015: 'Reisen, Tourismus und Freizeit',
    F102: 'Hygiene and occupational health services',
    F1020: 'Hygiene and occupational health services not further defined',
    F1021: 'Community sanitation',
    F1022: 'Occupational health and safety',
    F103: 'Security services',
    F1031: 'Military and defence',
    F1032: 'Protection of persons and property',
    F104: 'Transport services',
    F108: 'Inter-disciplinary programmes and qualifications involving services',
  },
}