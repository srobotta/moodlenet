import type { Translations } from '../../types.mjs'
export const edMetaOptions: Record<string, Translations> = {
  content_type: {
    'assessment': 'Évaluation',
    'concept-map': 'Carte conceptuelle',
    'course': 'Cours',
    'curriculum': 'Curriculum',
    'data-set': 'Jeu de données',
    'experiment': 'Expérience',
    'game': 'Jeu',
    'glossary': 'Glossaire',
    'graph': 'Graph',
    'guides-and-tutorials': 'Guides et tutoriels',
    'interactive-learning-object': 'Objet d’apprentissage interactif',
    'map': 'Carte',
    'online-courses-site': 'Site de cours en ligne',
    'project': 'Project',
    'questionnaire': 'Questionnaire',
    'reading': 'Lecture',
    'references': 'Références',
    'report': 'Rapport',
    'repository': 'Référentiel',
    'simulation': 'Simulation',
    'unit-of-study': 'Unité d’apprentissage',
  },
  education_level: {
    ED0: 'Éducation de la petite enfance',
    ED1: 'Enseignement primaire',
    ED2: 'Enseignement secondaire inférieur',
    ED3: 'Enseignement secondaire supérieur',
    ED4: 'Enseignement post-secondaire non supérieur',
    ED5: 'Enseignement supérieur',
    ED6: 'Licence ou équivalent',
    ED7: 'Master ou équivalent',
    ED8: 'Doctorat ou équivalent',
    ADT: 'Éducation pour adultes',
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
    F00: 'Programmes et qualifications génériques',
    F001: 'Programmes et qualifications de base',
    F002: 'Alphabétisation et numératie',
    F003: 'Compétences et développement personnel',
    F01: 'Éducation',
    F0111: 'Sciences de l’éducation',
    F0112: 'Formation des enseignants du préscolaire',
    F0113: 'Formation des enseignants sans spécialisation disciplinaire',
    F0114: 'Formation des enseignants avec spécialisation disciplinaire',
    F018: 'Programmes et qualifications interdisciplinaires impliquant l’éducation',
    F02: 'Arts et sciences humaines',
    F021: 'Arts',
    F0211: 'Techniques audiovisuelles et production de médias',
    F0212: 'Mode, décoration intérieure et industrielle',
    F0213: 'Beaux-arts',
    F0214: 'Artisanat',
    F0215: 'Musique et arts du spectacle',
    F022: 'Sciences humaines (sauf langues)',
    F0221: 'Religion et théologie',
    F0222: 'Histoire et archéologie',
    F0223: 'Philosophie et éthique',
    F023: 'Langues',
    F0231: 'Acquisition des langues',
    F0232: 'Littérature et linguistique',
    F028: 'Programmes et qualifications interdisciplinaires impliquant les arts et les sciences humaines',
    F03: 'Sciences sociales, journalisme et information',
    F031: 'Sciences sociales et comportementales',
    F0311: 'Économie',
    F0312: 'Sciences politiques et éducation civique',
    F0313: 'Psychologie',
    F0314: 'Sociologie et études culturelles',
    F032: 'Journalisme et information',
    F0321: 'Journalisme et reportage',
    F0322: 'Bibliothéconomie, information et archivistique',
    F038: 'Programmes et qualifications interdisciplinaires impliquant les sciences sociales, le journalisme et l’information',
    F04: 'Commerce, administration et droit',
    F041: 'Commerce et administration',
    F0411: 'Comptabilité et fiscalité',
    F0412: 'Finance, banque et assurance',
    F0413: 'Gestion et administration',
    F0414: 'Marketing et publicité',
    F0415: 'Secrétariat et travail de bureau',
    F0416: 'Vente en gros et au détail',
    F0417: 'Compétences professionnelles',
    F042: 'Droit',
    F048: 'Programmes et qualifications interdisciplinaires impliquant le commerce, l’administration et le droit',
    F05: 'Sciences naturelles, mathématiques et statistiques',
    F051: 'Sciences biologiques et apparentées',
    F0511: 'Biologie',
    F0512: 'Biochimie',
    F052: 'Environnement',
    F0521: 'Sciences de l’environnement',
    F0522: 'Environnements naturels et faune',
    F053: 'Sciences physiques',
    F0531: 'Chimie',
    F0532: 'Sciences de la terre',
    F0533: 'Physique',
    F054: 'Mathématiques et statistiques',
    F0541: 'Mathématiques',
    F0542: 'Statistiques',
    F058: 'Programmes et qualifications interdisciplinaires impliquant les sciences naturelles, les mathématiques et les statistiques',
    F06: 'Technologies de l’information et de la communication',
    F0611: 'Utilisation de l’ordinateur',
    F0612: 'Conception et administration de bases de données et de réseaux',
    F0613: 'Développement et analyse de logiciels et d’applications',
    F068: 'Programmes et qualifications interdisciplinaires impliquant les technologies de l’information et de la communication',
    F07: 'Ingénierie, fabrication et construction',
    F071: 'Ingénierie et métiers de l’ingénierie',
    F0711: 'Ingénierie et procédés chimiques',
    F0712: 'Technologie de la protection de l’environnement',
    F0713: 'Electricité et énergie',
    F0714: 'Électronique et automatisation',
    F0715: 'Mécanique et métiers des métaux',
    F0716: 'Véhicules à moteur, navires et avions',
    F072: 'Fabrication et transformation',
    F0721: 'Transformation des aliments',
    F0722: 'Matériaux (verre, papier, plastique et bois)',
    F0723: 'Textiles (vêtements, chaussures et cuir)',
    F0724: 'Extraction minière',
    F0773: 'Architecture et construction',
    F0732: 'Bâtiment et génie civil',
    F078: 'Programmes et qualifications interdisciplinaires impliquant l’ingénierie, la fabrication et la construction',
    F08: 'Agriculture, sylviculture, pêche et médecine vétérinaire',
    F081: 'Agriculture',
    F0811: 'Production végétale et animale',
    F0812: 'Horticulture',
    F082: 'Sylviculture',
    F083: 'Pêche',
    F084: 'Vétérinaire',
    F088: 'Programmes et qualifications interdisciplinaires impliquant l’agriculture, la sylviculture, la pêche et la médecine vétérinaire',
    F09: 'Santé et bien-être',
    F091: 'Santé',
    F0911: 'Études dentaires',
    F0912: 'Médecine',
    F0913: 'Soins infirmiers et sages-femmes',
    F0914: 'Technologie de diagnostic et de traitement médical',
    F0915: 'Thérapie et rééducation',
    F0916: 'Pharmacie',
    F0917: 'Médecine et thérapie traditionnelles et complémentaires',
    F092: 'Bien-être',
    F0920: 'Bien-être sans autre définition',
    F0921: 'Soins aux personnes âgées et aux adultes handicapés',
    F0922: 'Soins aux enfants et services à la jeunesse',
    F0923: 'Travail social et conseil',
    F098: 'Programmes et qualifications interdisciplinaires impliquant la santé et le bien-être',
    F10: 'Services',
    F101: 'Services personnels',
    F1011: 'Services domestiques',
    F1012: 'Services de coiffure et d’esthétique',
    F1013: 'Hôtels, restaurants et restauration',
    F1014: 'Sports',
    F1015: 'Voyages, tourisme et loisirs',
    F102: 'Services d’hygiène et de santé au travail',
    F1020: 'Services d’hygiène et de santé au travail sans autre définition',
    F1021: 'Assainissement communautaire',
    F1022: 'Santé et sécurité au travail',
    F103: 'Services de sécurité',
    F1031: 'Militaire et défense',
    F1032: 'Protection des personnes et des biens',
    F104: 'Services de transport',
    F108: 'Programmes interdisciplinaires et qualifications impliquant des services',
  },
}
