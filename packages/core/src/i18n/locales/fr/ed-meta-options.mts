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
    ED0: 'Early childhood education',
    ED1: 'Primary education',
    ED2: 'Lower secondary education',
    ED3: 'Upper secondary education',
    ED4: 'Post-secondary non-tertiary education',
    ED5: 'Tertiary education',
    ED6: 'Bachelor’s or equivalent',
    ED7: 'Master’s or equivalent',
    ED8: 'Doctoral or equivalent',
    ADT: 'Adult Education',
  },
  month: {
    '1': 'Janvier',
    '2': 'Février',
    '3': 'Mars',
    '4': 'Avril',
    '5': 'Mai',
    '6': 'Juin',
    '7': 'Juillet',
    '8': 'Août',
    '9': 'Septembre',
    '10': 'Octobre',
    '11': 'Novembre',
    '12': 'Décembre',
  },
  subject: {
    F00: 'Generic programmes and qualifications',
    F001: 'Basic programmes and qualifications',
    F002: 'Literacy and numeracy',
    F003: 'Personal skills and development',
    F01: 'Education',
    F0111: 'Education science',
    F0112: 'Training for pre-school teachers',
    F0113: 'Teacher training without subject specialisation',
    F0114: 'Teacher training with subject specialisation',
    F018: 'Inter-disciplinary programmes and qualifications involving education',
    F02: 'Arts and humanities',
    F021: 'Arts',
    F0211: 'Audio-visual techniques and media production',
    F0212: 'Fashion, interior and industrial design',
    F0213: 'Fine arts',
    F0214: 'Handicrafts',
    F0215: 'Music and performing arts',
    F022: 'Humanities (except languages)',
    F0221: 'Religion and theology',
    F0222: 'History and archaeology',
    F0223: 'Philosophy and ethics',
    F023: 'Languages',
    F0231: 'Language acquisition',
    F0232: 'Literature and linguistics',
    F028: 'Inter-disciplinary programmes and qualifications involving arts and humanities',
    F03: 'Social sciences, journalism and information',
    F031: 'Social and behavioural sciences',
    F0311: 'Economics',
    F0312: 'Political sciences and civics',
    F0313: 'Psychology',
    F0314: 'Sociology and cultural studies',
    F032: 'Journalism and information',
    F0321: 'Journalism and reporting',
    F0322: 'Library, information and archival studies',
    F038: 'Inter-disciplinary programmes and qualifications involving social sciences, journalism and information',
    F04: 'Business, administration and law',
    F041: 'Business and administration',
    F0411: 'Accounting and taxation',
    F0412: 'Finance, banking and insurance',
    F0413: 'Management and administration',
    F0414: 'Marketing and advertising',
    F0415: 'Secretarial and office work',
    F0416: 'Wholesale and retail sales',
    F0417: 'Work skills',
    F042: 'Law',
    F048: 'Inter-disciplinary programmes and qualifications involving business, administration and law',
    F05: 'Natural sciences, mathematics and statistics',
    F051: 'Biological and related sciences',
    F0511: 'Biology',
    F0512: 'Biochemistry',
    F052: 'Environment',
    F0521: 'Environmental sciences',
    F0522: 'Natural environments and wildlife',
    F053: 'Physical sciences',
    F0531: 'Chemistry',
    F0532: 'Earth sciences',
    F0533: 'Physics',
    F054: 'Mathematics and statistics',
    F0541: 'Mathematics',
    F0542: 'Statistics',
    F058: 'Inter-disciplinary programmes and qualifications involving natural sciences, mathematics and statistics',
    F06: 'Information and Communication Technologies',
    F0611: 'Computer use',
    F0612: 'Database and network design and administration',
    F0613: 'Software and applications development and analysis',
    F068: 'Inter-disciplinary programmes and qualifications involving information and Communication Technologies',
    F07: 'Engineering, manufacturing and construction',
    F071: 'Engineering and engineering trades',
    F0711: 'Chemical engineering and processes',
    F0712: 'Environmental protection technology',
    F0713: 'Electricity and energy',
    F0714: 'Electronics and automation',
    F0715: 'Mechanics and metal trades',
    F0716: 'Motor vehicles, ships and aircraft',
    F072: 'Manufacturing and processing',
    F0721: 'Food processing',
    F0722: 'Materials (glass, paper, plastic and wood)',
    F0723: 'Textiles (clothes, footwear and leather)',
    F0724: 'Mining and extraction',
    F073: 'Architecture and construction',
    F0732: 'Building and civil engineering',
    F078: 'Inter-disciplinary programmes and qualifications involving engineering, manufacturing and construction',
    F08: 'Agriculture, forestry, fisheries and veterinary',
    F081: 'Agriculture',
    F0811: 'Crop and livestock production',
    F0812: 'Horticulture',
    F082: 'Forestry',
    F083: 'Fisheries',
    F084: 'Veterinary',
    F088: 'Inter-disciplinary programmes and qualifications involving agriculture, forestry, fisheries and veterinary',
    F09: 'Health and welfare',
    F091: 'Health',
    F0911: 'Dental studies',
    F0912: 'Medicine',
    F0913: 'Nursing and midwifery',
    F0914: 'Medical diagnostic and treatment technology',
    F0915: 'Therapy and rehabilitation',
    F0916: 'Pharmacy',
    F0917: 'Traditional and complementary medicine and therapy',
    F092: 'Welfare',
    F0920: 'Welfare not further defined',
    F0921: 'Care of the elderly and of disabled adults',
    F0922: 'Child care and youth services',
    F0923: 'Social work and counselling',
    F098: 'Inter-disciplinary programmes and qualifications involving health and welfare',
    F10: 'Services',
    F101: 'Personal services',
    F1011: 'Domestic services',
    F1012: 'Hair and beauty services',
    F1013: 'Hotel, restaurants and catering',
    F1014: 'Sports',
    F1015: 'Travel, tourism and leisure',
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
