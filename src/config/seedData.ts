import { Category, Person, Contribution } from '../types';

export const SEED_CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'scientists',
    name: 'Scientists',
    description: 'Pioneers who decoded the laws of nature, expanded cosmic horizons, and unlocked the mysteries of matter and life.',
    graveCount: 124,
    imageUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '2',
    slug: 'writers',
    name: 'Writers',
    description: 'Wordsmiths, poets, and playwrights whose prose illuminated the human soul and shaped centuries of world literature.',
    graveCount: 98,
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '3',
    slug: 'artists',
    name: 'Artists',
    description: 'Visionaries and masters of brush and stone whose immortal creations transformed how we perceive beauty and sorrow.',
    graveCount: 76,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '4',
    slug: 'leaders',
    name: 'Leaders',
    description: 'Statesmen, revolutionaries, and visionaries whose decisions forged nations and altered the course of civilization.',
    graveCount: 113,
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '5',
    slug: 'musicians',
    name: 'Musicians',
    description: 'Composers and virtuosos whose timeless harmonies transcend language, time, and earthly boundaries.',
    graveCount: 64,
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '6',
    slug: 'actors',
    name: 'Actors',
    description: 'Dramatic masters who breathed life into cinema and theatre, etching unforgettable personas into the collective memory.',
    graveCount: 57,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: '7',
    slug: 'philosophers',
    name: 'Philosophers',
    description: 'Deep thinkers who questioned existence, ethics, reality, and the fundamental architecture of human reason.',
    graveCount: 49,
    imageUrl: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1000&q=80',
  },
];

export const SEED_PEOPLE: Person[] = [
  {
    id: '1',
    slug: 'albert-einstein',
    name: 'Albert Einstein',
    nativeName: 'Albert Einstein',
    birthYear: 1879,
    deathYear: 1955,
    birthDate: 'March 14, 1879',
    deathDate: 'April 18, 1955',
    birthPlace: 'Ulm, Kingdom of Württemberg, German Empire',
    deathPlace: 'Princeton, New Jersey, United States',
    categorySlug: 'scientists',
    categoryName: 'Scientists',
    occupations: ['Theoretical Physicist', 'Philosopher of Science', 'Nobel Laureate in Physics (1921)'],
    country: 'United States',
    portraitUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'Theoretical physicist who developed the theory of relativity, one of the two pillars of modern physics alongside quantum mechanics. His mass–energy equivalence formula E = mc² has been dubbed the world\'s most famous equation.',
    fullBiography: [
      'Albert Einstein was born in Ulm, in the Kingdom of Württemberg in the German Empire, on 14 March 1879. From early childhood, he showed an extraordinary curiosity regarding natural phenomena and mathematical harmony, famously being captivated by a pocket compass shown to him by his father.',
      'In 1905, often referred to as his annus mirabilis (miracle year), Einstein published four groundbreaking papers in the Annalen der Physik journal. These papers formulated the photoelectric effect (which earned him the 1921 Nobel Prize in Physics), explained Brownian motion, introduced special relativity, and derived the fundamental equivalence of mass and energy (E = mc²).',
      'During the 1930s, fleeing political turmoil and persecution in Germany, Einstein immigrated to the United States, where he took up a permanent position at the Institute for Advanced Study in Princeton, New Jersey. There he spent the remainder of his life pursuing a unified field theory.',
      'Following his death in Princeton Hospital in 1955 at the age of 76, per his specific final wishes for quiet simplicity, his body was cremated and his ashes were scattered at an undisclosed location along the Delaware River near Princeton, while a quiet memorial stone honors his memory.'
    ],
    featuredQuote: {
      id: 'q1',
      personId: '1',
      personName: 'Albert Einstein',
      quote: 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution.',
      source: 'Cosmic Religion: With Other Opinions and Aphorisms (1931)',
      context: 'On scientific intuition and creative thought',
      year: 1931,
      isVerified: true,
      verificationNotes: 'Recorded in interview with George Sylvester Viereck (1929) and published in Cosmic Religion.'
    },
    grave: {
      id: 'g1',
      personId: '1',
      personName: 'Albert Einstein',
      cemeteryName: 'Princeton Memorial Grounds & Delaware Basin',
      city: 'Princeton',
      state: 'New Jersey',
      country: 'United States',
      address: 'Institute for Advanced Study, 1 Einstein Dr, Princeton, NJ 08540',
      latitude: 40.3344,
      longitude: -74.6672,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Ashes scattered privately in accordance with his last testament; memorial plaque preserved at Princeton.',
      accessInformation: 'The grounds of the Institute for Advanced Study and Princeton Cemetery are open to respectful visitors during daylight hours.',
      monumentType: 'Memorial Plaque & Natural Scattering Ground'
    },
    quotes: [
      {
        id: 'q1-1',
        personId: '1',
        personName: 'Albert Einstein',
        quote: 'Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world.',
        source: 'What Life Means to Einstein (1929)',
        year: 1929,
        isVerified: true
      },
      {
        id: 'q1-2',
        personId: '1',
        personName: 'Albert Einstein',
        quote: 'The most beautiful experience we can have is the mysterious. It is the fundamental emotion that stands at the cradle of true art and true science.',
        source: 'The World As I See It (1931)',
        year: 1931,
        isVerified: true
      },
      {
        id: 'q1-3',
        personId: '1',
        personName: 'Albert Einstein',
        quote: 'Try not to become a man of success, but rather try to become a man of value.',
        source: 'Life Magazine interview (1955)',
        year: 1955,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
        caption: 'Misty grounds surrounding the Princeton woods and memorial grounds',
        category: 'grave'
      },
      {
        url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historical portrait of Albert Einstein in his Princeton study',
        category: 'portrait'
      },
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Stone sanctuary and quiet walkway commemorating the scientist',
        category: 'monument'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Revolutionized human understanding of space, time, gravity, and the universe.'
  },
  {
    id: '2',
    slug: 'marie-curie',
    name: 'Marie Curie',
    nativeName: 'Maria Salomea Skłodowska-Curie',
    birthYear: 1867,
    deathYear: 1934,
    birthDate: 'November 7, 1867',
    deathDate: 'July 4, 1934',
    birthPlace: 'Warsaw, Kingdom of Poland (Russian Empire)',
    deathPlace: 'Passy, Haute-Savoie, France',
    categorySlug: 'scientists',
    categoryName: 'Scientists',
    occupations: ['Physicist', 'Chemist', 'Double Nobel Laureate (Physics 1903, Chemistry 1911)'],
    country: 'France',
    portraitUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'Pioneering physicist and chemist who conducted pioneering research on radioactivity. She was the first woman to win a Nobel Prize, the first person to win Nobel Prizes in two scientific fields, and the first female professor at the University of Paris.',
    fullBiography: [
      'Maria Skłodowska was born in Warsaw in 1867. Despite severe educational restrictions on women in partitioned Poland, she pursued covert studies in the Flying University before moving to Paris in 1891 to study at the Sorbonne.',
      'Working tirelessly under austere laboratory conditions alongside her husband Pierre Curie, she discovered two new radioactive elements: polonium (named in honor of Poland) and radium. Her research coined the term radioactivity.',
      'During World War I, she developed mobile radiography units ("petites Curies") to assist battlefield surgeons, personally driving and operating them near the front lines.',
      'Marie Curie died in 1934 from aplastic anemia caused by long-term radiation exposure. In 1995, her remains—along with Pierre\'s—were entombed in the crypt of the Panthéon in Paris, honoring her as the first woman buried there on her own merits.'
    ],
    featuredQuote: {
      id: 'q2',
      personId: '2',
      personName: 'Marie Curie',
      quote: 'Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.',
      source: 'Madame Curie: A Biography by Ève Curie',
      context: 'Reflecting on fear, discovery, and the duty of science',
      year: 1923,
      isVerified: true,
      verificationNotes: 'Quoted in family biographies and commemorative lectures at the Radium Institute.'
    },
    grave: {
      id: 'g2',
      personId: '2',
      personName: 'Marie Curie',
      cemeteryName: 'Panthéon Crypt',
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      address: 'Pl. du Panthéon, 75005 Paris, France',
      latitude: 48.8462,
      longitude: 2.3449,
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Vault VIII, Crypt of the Panthéon, resting inside a lead-lined tomb due to residual radioactivity.',
      accessInformation: 'Open daily to visitors. The crypt is accessible with standard Panthéon entrance.',
      monumentType: 'Neoclassical Crypt & Lead Sarcophagus'
    },
    quotes: [
      {
        id: 'q2-1',
        personId: '2',
        personName: 'Marie Curie',
        quote: 'Nothing in life is to be feared, it is only to be understood.',
        source: 'Madame Curie: A Biography',
        year: 1923,
        isVerified: true
      },
      {
        id: 'q2-2',
        personId: '2',
        personName: 'Marie Curie',
        quote: 'I was taught that the way of progress was neither swift nor easy.',
        source: 'Autobiographical Notes (1923)',
        year: 1923,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
        caption: 'The majestic Panthéon in Paris where Marie Curie rests',
        category: 'monument'
      },
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        caption: 'Interior crypt corridors leading to Vault VIII',
        category: 'grave'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'First woman to win a Nobel Prize, founding mother of modern nuclear and radiation science.'
  },
  {
    id: '3',
    slug: 'william-shakespeare',
    name: 'William Shakespeare',
    nativeName: 'William Shakespeare',
    birthYear: 1564,
    deathYear: 1616,
    birthDate: 'April 26, 1564 (baptised)',
    deathDate: 'April 23, 1616',
    birthPlace: 'Stratford-upon-Avon, Warwickshire, England',
    deathPlace: 'Stratford-upon-Avon, Warwickshire, England',
    categorySlug: 'writers',
    categoryName: 'Writers',
    occupations: ['Playwright', 'Poet', 'Actor'],
    country: 'United Kingdom',
    portraitUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'Widely regarded as the greatest writer in the English language and the world\'s pre-eminent dramatist. His extant works include 39 plays, 154 sonnets, and three long narrative poems.',
    fullBiography: [
      'William Shakespeare was born in Stratford-upon-Avon in April 1564. By 1592, he had established himself in London as an actor and playwright, producing masterpieces across tragedy, comedy, and historical drama.',
      'As a key shareholder in the Lord Chamberlain\'s Men (later the King\'s Men), Shakespeare staged plays at the Globe Theatre that redefined narrative complexity, psychological depth, and linguistic richness.',
      'He retired to Stratford around 1613, where he died three years later at the age of 52. He was buried in the chancel of the Holy Trinity Church.',
      'His stone ledger famously bears an epitaph curse warning against disturbing his bones: "Good friend for Jesus sake forbeare, To dig the dust enclosed here. Blessed be the man that spares these stones, And cursed be he that moves my bones."'
    ],
    featuredQuote: {
      id: 'q3',
      personId: '3',
      personName: 'William Shakespeare',
      quote: 'All the world\'s a stage, and all the men and women merely players. They have their exits and their entrances, and one man in his time plays many parts.',
      source: 'As You Like It, Act II, Scene VII',
      context: 'Jaques\' famous monologue on the seven ages of man',
      year: 1599,
      isVerified: true,
      verificationNotes: 'First Folio publication, 1623.'
    },
    grave: {
      id: 'g3',
      personId: '3',
      personName: 'William Shakespeare',
      cemeteryName: 'Holy Trinity Church Chancel',
      city: 'Stratford-upon-Avon',
      state: 'Warwickshire',
      country: 'United Kingdom',
      address: 'Old Town, Stratford-upon-Avon CV37 6BG, UK',
      latitude: 52.1866,
      longitude: -1.7077,
      imageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Chancel floor inside Holy Trinity Church, adjacent to Anne Hathaway and family ledger stones.',
      accessInformation: 'Visitors can view the chancel during church opening hours; donations support church preservation.',
      monumentType: 'Chancel Floor Ledger Stone & Wall Bust Monument'
    },
    quotes: [
      {
        id: 'q3-1',
        personId: '3',
        personName: 'William Shakespeare',
        quote: 'All the world\'s a stage, and all the men and women merely players.',
        source: 'As You Like It',
        year: 1599,
        isVerified: true
      },
      {
        id: 'q3-2',
        personId: '3',
        personName: 'William Shakespeare',
        quote: 'We are such stuff as dreams are made on, and our little life is rounded with a sleep.',
        source: 'The Tempest',
        year: 1611,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Historic churchyard and stone sanctuary of Holy Trinity Church',
        category: 'monument'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'The greatest playwright and poet in the English literary canon.'
  },
  {
    id: '4',
    slug: 'leonardo-da-vinci',
    name: 'Leonardo da Vinci',
    nativeName: 'Leonardo di ser Piero da Vinci',
    birthYear: 1452,
    deathYear: 1519,
    birthDate: 'April 15, 1452',
    deathDate: 'May 2, 1519',
    birthPlace: 'Vinci, Republic of Florence (Italy)',
    deathPlace: 'Amboise, Kingdom of France',
    categorySlug: 'artists',
    categoryName: 'Artists',
    occupations: ['Polymath', 'Painter', 'Sculptor', 'Architect', 'Engineer', 'Anatomist'],
    country: 'France',
    portraitUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'Italian Renaissance polymath whose areas of interest included invention, painting, sculpting, architecture, science, music, mathematics, engineering, literature, anatomy, geology, and cartography. Revered for masterpieces such as Mona Lisa and The Last Supper.',
    fullBiography: [
      'Born out of wedlock to a notary in the Tuscan hill town of Vinci, Leonardo was educated in Florence by the renowned master Andrea del Verrocchio.',
      'His boundless curiosity and observational genius allowed him to conceptualize inventions centuries ahead of their time, including flying machines, armored vehicles, and concentrated solar power.',
      'In his final years, King Francis I of France invited Leonardo to settle at the Château du Clos Lucé in Amboise, where the two shared a profound intellectual bond.',
      'Leonardo died in Amboise on 2 May 1519. He was interred in the Chapel of Saint-Hubert at Château d\'Amboise, where his stone tomb continues to inspire travelers from around the globe.'
    ],
    featuredQuote: {
      id: 'q4',
      personId: '4',
      personName: 'Leonardo da Vinci',
      quote: 'As a well-spent day brings happy sleep, so a life well used brings a happy death.',
      source: 'Codex Atlanticus',
      context: 'Philosophical notebooks on human industry and mortality',
      year: 1510,
      isVerified: true,
      verificationNotes: 'Folio preserved in the Biblioteca Ambrosiana in Milan.'
    },
    grave: {
      id: 'g4',
      personId: '4',
      personName: 'Leonardo da Vinci',
      cemeteryName: 'Chapel of Saint-Hubert, Château d\'Amboise',
      city: 'Amboise',
      state: 'Indre-et-Loire',
      country: 'France',
      address: 'Mnt de l\'Emir Abd el Kader, 37400 Amboise, France',
      latitude: 47.4132,
      longitude: 0.9858,
      imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Inside the Gothic chapel perched on the ramparts of Château d\'Amboise.',
      accessInformation: 'Accessible with castle ticket; overlooks the Loire river valley.',
      monumentType: 'Gothic Chapel Tomb with Bronze Medallion'
    },
    quotes: [
      {
        id: 'q4-1',
        personId: '4',
        personName: 'Leonardo da Vinci',
        quote: 'As a well-spent day brings happy sleep, so a life well used brings a happy death.',
        source: 'Codex Atlanticus',
        year: 1510,
        isVerified: true
      },
      {
        id: 'q4-2',
        personId: '4',
        personName: 'Leonardo da Vinci',
        quote: 'Learning never exhausts the mind.',
        source: 'Codex Leicester',
        year: 1508,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        caption: 'The Loire Valley and Château d\'Amboise fortress where Leonardo rests',
        category: 'monument'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'The quintessential archetype of the High Renaissance genius.'
  },
  {
    id: '5',
    slug: 'nikola-tesla',
    name: 'Nikola Tesla',
    nativeName: 'Никола Тесла',
    birthYear: 1856,
    deathYear: 1943,
    birthDate: 'July 10, 1856',
    deathDate: 'January 7, 1943',
    birthPlace: 'Smiljan, Austrian Empire (modern-day Croatia)',
    deathPlace: 'New York City, New York, United States',
    categorySlug: 'scientists',
    categoryName: 'Scientists',
    occupations: ['Inventor', 'Electrical Engineer', 'Mechanical Engineer', 'Futurist'],
    country: 'Serbia',
    portraitUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'Serbian-American engineer and visionary inventor who revolutionized alternating current (AC) electricity supply systems, wireless transmission, and electrical engineering fundamentals.',
    fullBiography: [
      'Born during a lightning storm in the village of Smiljan, Tesla studied engineering in Graz and Prague before emigrating to the United States in 1884 to work for Thomas Edison.',
      'He soon partnered with George Westinghouse to commercialize alternating current, prevailing in the celebrated "War of the Currents" and illuminating the 1893 World\'s Columbian Exposition in Chicago.',
      'Tesla pioneered radio control, induction motors, Tesla coils, and wireless power transmission at his Wardenclyffe laboratory.',
      'He died in room 3327 of the Hotel New Yorker in 1943. Following cremation at Ferncliff Cemetery, his ashes were placed in a gilded spherical bronze urn that is preserved at the Nikola Tesla Museum in Belgrade.'
    ],
    featuredQuote: {
      id: 'q5',
      personId: '5',
      personName: 'Nikola Tesla',
      quote: 'If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.',
      source: 'Interviews & electrical treatises',
      context: 'On cosmic resonance and electromagnetic physics',
      year: 1942,
      isVerified: true,
      verificationNotes: 'Attributed across Tesla\'s later lectures and engineering correspondence.'
    },
    grave: {
      id: 'g5',
      personId: '5',
      personName: 'Nikola Tesla',
      cemeteryName: 'Nikola Tesla Museum Memorial Urn',
      city: 'Belgrade',
      state: 'Belgrade City',
      country: 'Serbia',
      address: 'Krunska 51, Belgrade 11000, Serbia',
      latitude: 44.8053,
      longitude: 20.4705,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Gilded spherical urn permanently exhibited in a dedicated memorial room.',
      accessInformation: 'Open for guided museum visits and international researchers.',
      monumentType: 'Spherical Bronze Urn & Memorial Sanctuary'
    },
    quotes: [
      {
        id: 'q5-1',
        personId: '5',
        personName: 'Nikola Tesla',
        quote: 'If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.',
        source: 'Engineering papers',
        year: 1942,
        isVerified: true
      },
      {
        id: 'q5-2',
        personId: '5',
        personName: 'Nikola Tesla',
        quote: 'The present is theirs; the future, for which I really worked, is mine.',
        source: 'A Visit to Nikola Tesla (1934)',
        year: 1934,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        caption: 'Atmospheric twilight reflecting the electric genius of Tesla',
        category: 'monument'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Mastermind of alternating current electrification and modern power grids.'
  },
  {
    id: '6',
    slug: 'isaac-newton',
    name: 'Sir Isaac Newton',
    nativeName: 'Isaac Newton',
    birthYear: 1643,
    deathYear: 1727,
    birthDate: 'January 4, 1643',
    deathDate: 'March 31, 1727',
    birthPlace: 'Woolsthorpe-by-Colsterworth, Lincolnshire, England',
    deathPlace: 'Kensington, Middlesex, England',
    categorySlug: 'scientists',
    categoryName: 'Scientists',
    occupations: ['Mathematician', 'Physicist', 'Astronomer', 'Alchemist', 'Author'],
    country: 'United Kingdom',
    portraitUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'English polymath active as a mathematician, physicist, astronomer, and author who formulated the laws of motion and universal gravitation, laying the mathematical foundation of classical mechanics.',
    fullBiography: [
      'Born at Woolsthorpe Manor, Newton showed early aptitude for mechanical models and mathematics. During the Great Plague of 1665, while sheltering at home from Cambridge, he formulated his theories of calculus, optics, and gravitation.',
      'His 1687 treatise Philosophiae Naturalis Principia Mathematica is widely recognized as the single most influential book in the history of science.',
      'Newton also served as Warden and Master of the Royal Mint and President of the Royal Society for over two decades.',
      'Upon his death in 1727, he was accorded a grand state burial inside Westminster Abbey, where a monumental marble tomb sculpted by Michael Rysbrack stands near the choir screen.'
    ],
    featuredQuote: {
      id: 'q6',
      personId: '6',
      personName: 'Sir Isaac Newton',
      quote: 'If I have seen further, it is by standing on the shoulders of giants.',
      source: 'Letter to Robert Hooke (1675)',
      context: 'Acknowledging the scientific work of his predecessors',
      year: 1675,
      isVerified: true,
      verificationNotes: 'Preserved in Royal Society archives.'
    },
    grave: {
      id: 'g6',
      personId: '6',
      personName: 'Sir Isaac Newton',
      cemeteryName: 'Westminster Abbey Nave & Choir Screen',
      city: 'London',
      state: 'Greater London',
      country: 'United Kingdom',
      address: 'Dean\'s Yard, Westminster, London SW1P 3PA, UK',
      latitude: 51.4993,
      longitude: -0.1273,
      imageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'North side of the entrance to the choir screen in the Abbey Nave.',
      accessInformation: 'Open to Abbey visitors and worshipers daily.',
      monumentType: 'Baroque Marble Sarcophagus & Urania Sculpture'
    },
    quotes: [
      {
        id: 'q6-1',
        personId: '6',
        personName: 'Sir Isaac Newton',
        quote: 'If I have seen further, it is by standing on the shoulders of giants.',
        source: 'Letter to Robert Hooke',
        year: 1675,
        isVerified: true
      },
      {
        id: 'q6-2',
        personId: '6',
        personName: 'Sir Isaac Newton',
        quote: 'I do not know what I may appear to the world, but to myself I seem to have been only like a boy playing on the seashore.',
        source: 'Memoirs of Newton',
        year: 1727,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
        caption: 'The majestic stone vault of Westminster Abbey',
        category: 'monument'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Established the laws of motion and universal gravitation; founded classical mechanics.'
  },
  {
    id: '7',
    slug: 'vincent-van-gogh',
    name: 'Vincent van Gogh',
    nativeName: 'Vincent Willem van Gogh',
    birthYear: 1853,
    deathYear: 1890,
    birthDate: 'March 30, 1853',
    deathDate: 'July 29, 1890',
    birthPlace: 'Zundert, Netherlands',
    deathPlace: 'Auvers-sur-Oise, France',
    categorySlug: 'artists',
    categoryName: 'Artists',
    occupations: ['Post-Impressionist Painter', 'Draftsman'],
    country: 'France',
    portraitUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'Dutch post-impressionist painter who is among the most famous and influential figures in the history of Western art. In just over a decade, he created about 2,100 artworks, including around 860 oil paintings.',
    fullBiography: [
      'Born into an upper-middle-class family in Zundert, Van Gogh drew as a child and worked as an art dealer before discovering his true painting calling in his late twenties.',
      'His luminous colors and expressive brushwork blossomed in Arles and Saint-Rémy-de-Provence, creating iconic masterpieces like The Starry Night, Sunflowers, and Wheatfield with Crows.',
      'Despite intense psychological anguish and financial precarity, his brother Theo provided unwavering emotional and financial support throughout his life.',
      'Vincent died in Auvers-sur-Oise in July 1890. Six months later, Theo died as well, and the brothers lie buried side-by-side in the quiet hilltop cemetery surrounded by sunflower fields and ivy.'
    ],
    featuredQuote: {
      id: 'q7',
      personId: '7',
      personName: 'Vincent van Gogh',
      quote: 'I know nothing with any certainty, but the sight of the stars makes me dream.',
      source: 'Letter to Theo van Gogh (1888)',
      context: 'Reflecting on the night sky in Arles',
      year: 1888,
      isVerified: true,
      verificationNotes: 'Van Gogh Museum Letter 638.'
    },
    grave: {
      id: 'g7',
      personId: '7',
      personName: 'Vincent van Gogh',
      cemeteryName: 'Cimetière d\'Auvers-sur-Oise',
      city: 'Auvers-sur-Oise',
      state: 'Val-d\'Oise',
      country: 'France',
      address: 'Rue Émile Boggio, 95430 Auvers-sur-Oise, France',
      latitude: 49.0769,
      longitude: 2.1744,
      imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Twin ivy-carpeted headstones of Vincent and his brother Theo against the cemetery wall.',
      accessInformation: 'Open daily to the public; a peaceful sanctuary overlooking wheatfields.',
      monumentType: 'Simple Twin Ivy-Covered Stone Markers'
    },
    quotes: [
      {
        id: 'q7-1',
        personId: '7',
        personName: 'Vincent van Gogh',
        quote: 'I know nothing with any certainty, but the sight of the stars makes me dream.',
        source: 'Letters to Theo',
        year: 1888,
        isVerified: true
      },
      {
        id: 'q7-2',
        personId: '7',
        personName: 'Vincent van Gogh',
        quote: 'Great things are done by a series of small things brought together.',
        source: 'Letters to Theo',
        year: 1882,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
        caption: 'The peaceful country cemetery of Auvers-sur-Oise',
        category: 'grave'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Transformative figure of modern Western painting and expressionism.'
  },
  {
    id: '8',
    slug: 'ludwig-van-beethoven',
    name: 'Ludwig van Beethoven',
    nativeName: 'Ludwig van Beethoven',
    birthYear: 1770,
    deathYear: 1827,
    birthDate: 'December 17, 1770 (baptised)',
    deathDate: 'March 26, 1827',
    birthPlace: 'Bonn, Electorate of Cologne',
    deathPlace: 'Vienna, Austrian Empire',
    categorySlug: 'musicians',
    categoryName: 'Musicians',
    occupations: ['Composer', 'Pianist', 'Musical Innovator'],
    country: 'Austria',
    portraitUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'German composer and pianist whose music ranks among the most performed of the classical repertoire; he spans the transition from the classical to the romantic era in Western music.',
    fullBiography: [
      'Born in Bonn, Beethoven gave his first public performance at the age of seven. Moving to Vienna in 1792, he studied under Joseph Haydn and quickly gained a reputation as a virtuoso pianist.',
      'Despite confronting progressive hearing loss from his late twenties that eventually left him completely deaf, he composed his most revolutionary works, including Symphony No. 9 (Choral), the late string quartets, and the Missa Solemnis.',
      'His funeral in Vienna in 1827 drew an estimated 20,000 citizens through the city streets.',
      'In 1888, his remains were transferred to Vienna\'s Zentralfriedhof (Central Cemetery), where his dramatic obelisk monument stands in the honorary graves section among Schubert, Brahms, and Strauss.'
    ],
    featuredQuote: {
      id: 'q8',
      personId: '8',
      personName: 'Ludwig van Beethoven',
      quote: 'Music is a higher revelation than all wisdom and philosophy. Music is the electrical soil in which the spirit lives, thinks and invents.',
      source: 'Conversation with Bettina von Arnim (1810)',
      context: 'On the divine nature and creative force of music',
      year: 1810,
      isVerified: true,
      verificationNotes: 'Recorded in correspondence published in Goethe\'s Circle.'
    },
    grave: {
      id: 'g8',
      personId: '8',
      personName: 'Ludwig van Beethoven',
      cemeteryName: 'Wiener Zentralfriedhof (Vienna Central Cemetery)',
      city: 'Vienna',
      state: 'Vienna State',
      country: 'Austria',
      address: 'Simmeringer Hauptstraße 234, 1110 Wien, Austria',
      latitude: 48.1508,
      longitude: 16.4389,
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Group 32A, Grave 29 (Ehrengräber - Honorary graves grove).',
      accessInformation: 'Central Cemetery is open daily; tram lines 11 and 71 stop directly at Gate 2.',
      monumentType: 'Neoclassical Grey Stone Obelisk with Golden Lyre'
    },
    quotes: [
      {
        id: 'q8-1',
        personId: '8',
        personName: 'Ludwig van Beethoven',
        quote: 'Music is a higher revelation than all wisdom and philosophy.',
        source: 'Letters & conversations',
        year: 1810,
        isVerified: true
      },
      {
        id: 'q8-2',
        personId: '8',
        personName: 'Ludwig van Beethoven',
        quote: 'To play a wrong note is insignificant; to play without passion is inexcusable.',
        source: 'Musical journals',
        year: 1820,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        caption: 'The serene avenue of honor at Vienna Central Cemetery',
        category: 'grave'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Titan of Western classical music who redefined symphonic and chamber form.'
  },
  {
    id: '9',
    slug: 'charles-darwin',
    name: 'Charles Darwin',
    nativeName: 'Charles Robert Darwin',
    birthYear: 1809,
    deathYear: 1882,
    birthDate: 'February 12, 1809',
    deathDate: 'April 19, 1882',
    birthPlace: 'Shrewsbury, Shropshire, England',
    deathPlace: 'Downe, Kent, England',
    categorySlug: 'scientists',
    categoryName: 'Scientists',
    occupations: ['Naturalist', 'Geologist', 'Biologist', 'Author'],
    country: 'United Kingdom',
    portraitUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'English naturalist, geologist, and biologist, best known for his contributions to the science of evolution. His proposition that all species of life have descended from common ancestors is now widely accepted and considered a foundational concept in science.',
    fullBiography: [
      'Born in Shrewsbury, Darwin joined the five-year voyage of HMS Beagle in 1831, exploring South America, the Galápagos Islands, and Australia as a ship naturalist.',
      'His observations of wildlife variations led him to formulate the theory of natural selection. In 1859, he published On the Origin of Species by Means of Natural Selection, fundamentally transforming biological sciences.',
      'Darwin spent the remainder of his life at Down House in Kent, continuing groundbreaking research into botanical fertilization, earthworms, and human origins.',
      'Following his death in 1882, parliament and the scientific community petitioned for a state funeral in Westminster Abbey, where he is buried close to Sir Isaac Newton and John Herschel.'
    ],
    featuredQuote: {
      id: 'q9',
      personId: '9',
      personName: 'Charles Darwin',
      quote: 'There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that... from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.',
      source: 'On the Origin of Species (1859)',
      context: 'Concluding passage of On the Origin of Species',
      year: 1859,
      isVerified: true,
      verificationNotes: 'First edition, final chapter XIV.'
    },
    grave: {
      id: 'g9',
      personId: '9',
      personName: 'Charles Darwin',
      cemeteryName: 'Westminster Abbey North Aisle',
      city: 'London',
      state: 'Greater London',
      country: 'United Kingdom',
      address: 'Dean\'s Yard, Westminster, London SW1P 3PA, UK',
      latitude: 51.4994,
      longitude: -0.1274,
      imageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'North Aisle of the Nave, steps from Sir Isaac Newton\'s tomb.',
      accessInformation: 'Viewable by all visitors to Westminster Abbey.',
      monumentType: 'White Marble Floor Ledger Stone'
    },
    quotes: [
      {
        id: 'q9-1',
        personId: '9',
        personName: 'Charles Darwin',
        quote: 'There is grandeur in this view of life, with its several powers... from so simple a beginning endless forms most beautiful have been evolved.',
        source: 'On the Origin of Species',
        year: 1859,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
        caption: 'The historical nave of Westminster Abbey',
        category: 'monument'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Father of evolutionary biology and the theory of natural selection.'
  },
  {
    id: '10',
    slug: 'stephen-hawking',
    name: 'Stephen Hawking',
    nativeName: 'Stephen William Hawking',
    birthYear: 1942,
    deathYear: 2018,
    birthDate: 'January 8, 1942',
    deathDate: 'March 14, 2018',
    birthPlace: 'Oxford, England',
    deathPlace: 'Cambridge, England',
    categorySlug: 'scientists',
    categoryName: 'Scientists',
    occupations: ['Theoretical Physicist', 'Cosmologist', 'Author'],
    country: 'United Kingdom',
    portraitUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'English theoretical physicist, cosmologist, and author who was director of research at the Centre for Theoretical Cosmology at Cambridge. He made foundational discoveries on black hole radiation and gravitational singularity theorems.',
    fullBiography: [
      'Born in Oxford on the 300th anniversary of Galileo\'s death, Hawking studied physics at Oxford and Cambridge. Diagnosed with early-onset motor neuron disease (ALS) at age 21, he defied medical expectations for over half a century.',
      'In 1974, he mathematically proved that black holes emit thermal radiation—now known as Hawking radiation—uniting general relativity and quantum mechanics for the first time.',
      'His 1988 book A Brief History of Time became an international bestseller, selling over 25 million copies and inspiring millions to look up at the cosmos.',
      'Hawking died on 14 March 2018 (Einstein\'s birthday and Pi Day). His ashes were interred in the Scientists\' Corner at Westminster Abbey, between Isaac Newton and Charles Darwin, inscribed with his signature equation for black hole entropy.'
    ],
    featuredQuote: {
      id: 'q10',
      personId: '10',
      personName: 'Stephen Hawking',
      quote: 'Remember to look up at the stars and not down at your feet. Try to make sense of what you see and wonder about what makes the universe exist. Be curious.',
      source: 'Advice to his children / ABC News Interview (2010)',
      context: 'Message on curiosity, resilience, and cosmic wonder',
      year: 2010,
      isVerified: true,
      verificationNotes: 'Recorded in televised interviews and final essays in Brief Answers to the Big Questions.'
    },
    grave: {
      id: 'g10',
      personId: '10',
      personName: 'Stephen Hawking',
      cemeteryName: 'Westminster Abbey Scientists\' Corner',
      city: 'London',
      state: 'Greater London',
      country: 'United Kingdom',
      address: 'Dean\'s Yard, Westminster, London SW1P 3PA, UK',
      latitude: 51.4995,
      longitude: -0.1275,
      imageUrl: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Scientists\' Corner in the Abbey Nave, placed directly between Sir Isaac Newton and Charles Darwin.',
      accessInformation: 'Open during Westminster Abbey public visiting hours.',
      monumentType: 'Engraved Slate Ledger Stone with Black Hole Spiral & Hawking Equation'
    },
    quotes: [
      {
        id: 'q10-1',
        personId: '10',
        personName: 'Stephen Hawking',
        quote: 'Remember to look up at the stars and not down at your feet. Be curious.',
        source: 'Brief Answers to the Big Questions',
        year: 2010,
        isVerified: true
      },
      {
        id: 'q10-2',
        personId: '10',
        personName: 'Stephen Hawking',
        quote: 'However difficult life may seem, there is always something you can do and succeed at.',
        source: 'Paralympic Games Opening Ceremony Address (2012)',
        year: 2012,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?auto=format&fit=crop&w=1200&q=80',
        caption: 'Scientists\' Corner at Westminster Abbey',
        category: 'grave'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Pioneer of black hole thermodynamics and cosmology; emblem of human willpower.'
  },
  {
    id: '11',
    slug: 'oscar-wilde',
    name: 'Oscar Wilde',
    nativeName: 'Oscar Fingal O\'Flahertie Wills Wilde',
    birthYear: 1854,
    deathYear: 1900,
    birthDate: 'October 16, 1854',
    deathDate: 'November 30, 1900',
    birthPlace: 'Dublin, Ireland',
    deathPlace: 'Paris, France',
    categorySlug: 'writers',
    categoryName: 'Writers',
    occupations: ['Author', 'Playwright', 'Poet', 'Aesthete'],
    country: 'France',
    portraitUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'Irish poet and playwright who became one of London\'s most popular dramatists in the early 1890s. Celebrated for his biting wit, flamboyant style, The Picture of Dorian Gray, and The Importance of Being Earnest.',
    fullBiography: [
      'Born in Dublin, Wilde excelled in classical studies at Trinity College Dublin and Magdalen College, Oxford, becoming a leading spokesman for the Aesthetic Movement.',
      'He wrote brilliant comedies of manners, poetry, and essays that satirized Victorian social hypocrisies with sparkling humor and deep sensitivity.',
      'Following his tragic imprisonment at Reading Gaol, his health deteriorated rapidly. He spent his final days in exile in Paris at the Hôtel d\'Alsace.',
      'Wilde died in November 1900. He is buried in Père Lachaise Cemetery beneath a famous modernist winged sphinx tomb sculpted by Sir Jacob Epstein, which has drawn devoted admirers from every corner of the world.'
    ],
    featuredQuote: {
      id: 'q11',
      personId: '11',
      personName: 'Oscar Wilde',
      quote: 'We are all in the gutter, but some of us are looking at the stars.',
      source: 'Lady Windermere\'s Fan, Act III',
      context: 'Lord Darlington speaking on hope and human nature',
      year: 1892,
      isVerified: true,
      verificationNotes: 'First staged at St James\'s Theatre, London, 1892.'
    },
    grave: {
      id: 'g11',
      personId: '11',
      personName: 'Oscar Wilde',
      cemeteryName: 'Cimetière du Père-Lachaise',
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      address: '16 Rue du Repos, 75020 Paris, France',
      latitude: 48.8614,
      longitude: 2.3934,
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Division 89, famous winged angel-sphinx tomb designed by Jacob Epstein.',
      accessInformation: 'Père Lachaise is open daily; accessible via Père Lachaise or Philippe Auguste metro stations.',
      monumentType: 'Art Deco Winged Sphinx Tomb by Sir Jacob Epstein'
    },
    quotes: [
      {
        id: 'q11-1',
        personId: '11',
        personName: 'Oscar Wilde',
        quote: 'We are all in the gutter, but some of us are looking at the stars.',
        source: 'Lady Windermere\'s Fan',
        year: 1892,
        isVerified: true
      },
      {
        id: 'q11-2',
        personId: '11',
        personName: 'Oscar Wilde',
        quote: 'To live is the rarest thing in the world. Most people exist, that is all.',
        source: 'The Soul of Man under Socialism',
        year: 1891,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        caption: 'The atmospheric walkways of Père Lachaise in Paris',
        category: 'grave'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Master of wit, aesthetic literature, and dramatic perfection.'
  },
  {
    id: '12',
    slug: 'victor-hugo',
    name: 'Victor Hugo',
    nativeName: 'Victor-Marie Hugo',
    birthYear: 1802,
    deathYear: 1885,
    birthDate: 'February 26, 1802',
    deathDate: 'May 22, 1885',
    birthPlace: 'Besançon, France',
    deathPlace: 'Paris, France',
    categorySlug: 'writers',
    categoryName: 'Writers',
    occupations: ['Poet', 'Novelist', 'Dramatist', 'Statesman'],
    country: 'France',
    portraitUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    heroImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=2000&q=85',
    graveImageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    shortBiography: 'French Romantic poet, novelist, and dramatist whose works, including Les Misérables and The Hunchback of Notre-Dame, made him a colossal figure in world literature and a passionate advocate for human rights and democracy.',
    fullBiography: [
      'Born during the Napoleonic era, Victor Hugo emerged as the champion of French Romanticism with his play Hernani and epic novel Notre-Dame de Paris.',
      'A staunch defender of republicanism and opponent of Napoleon III, Hugo spent 19 years in political exile in Jersey and Guernsey, where he penned his crowning magnum opus Les Misérables.',
      'His return to Paris in 1870 was met with triumphant acclaim, and he was hailed as a national hero and moral compass of the French Republic.',
      'When he died in 1885, more than two million mourners joined his funeral procession from the Arc de Triomphe to the Panthéon, where he rests in Crypt Vault XXIV alongside Émile Zola and Alexandre Dumas.'
    ],
    featuredQuote: {
      id: 'q12',
      personId: '12',
      personName: 'Victor Hugo',
      quote: 'Even the darkest night will end and the sun will rise.',
      source: 'Les Misérables (1862)',
      context: 'On endurance, justice, and transcendent hope for humanity',
      year: 1862,
      isVerified: true,
      verificationNotes: 'Les Misérables, Part V (Jean Valjean).'
    },
    grave: {
      id: 'g12',
      personId: '12',
      personName: 'Victor Hugo',
      cemeteryName: 'Panthéon Crypt',
      city: 'Paris',
      state: 'Île-de-France',
      country: 'France',
      address: 'Pl. du Panthéon, 75005 Paris, France',
      latitude: 48.8462,
      longitude: 2.3449,
      imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
      additionalImages: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80'
      ],
      plotDescription: 'Vault XXIV, Panthéon Crypt, resting directly facing Alexandre Dumas and Émile Zola.',
      accessInformation: 'Open daily to Panthéon visitors.',
      monumentType: 'Neoclassical Crypt Sarcophagus'
    },
    quotes: [
      {
        id: 'q12-1',
        personId: '12',
        personName: 'Victor Hugo',
        quote: 'Even the darkest night will end and the sun will rise.',
        source: 'Les Misérables',
        year: 1862,
        isVerified: true
      },
      {
        id: 'q12-2',
        personId: '12',
        personName: 'Victor Hugo',
        quote: 'To love or have loved, that is enough. Ask nothing further. There is no other pearl to be found in the dark folds of life.',
        source: 'Les Misérables',
        year: 1862,
        isVerified: true
      }
    ],
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
        caption: 'The grand Panthéon in Paris',
        category: 'monument'
      }
    ],
    isFeatured: true,
    historicalSignificance: 'Titan of French Romantic literature and lifelong defender of the oppressed.'
  }
];

export const SEED_CONTRIBUTIONS: Contribution[] = [
  {
    id: 'c1',
    type: 'PERSON',
    subject: 'Suggest memorial for Ada Lovelace',
    details: 'Ada Lovelace, recognized as the world\'s first computer programmer for her work on Babbage\'s Analytical Engine. Buried at Church of St. Mary Magdalene in Hucknall, Nottinghamshire.',
    personName: 'Ada Lovelace',
    sourceReference: 'Oxford Dictionary of National Biography & St. Mary Magdalene church records',
    submittedBy: 'Dr. Evelyn Reed',
    userEmail: 'evelyn.reed@history.org',
    status: 'PENDING',
    createdAt: '2026-03-01T10:30:00Z'
  },
  {
    id: 'c2',
    type: 'CORRECTION',
    subject: 'Exact coordinates update for Père Lachaise Division 89',
    details: 'Adjusted latitude and longitude for Oscar Wilde\'s tomb to higher satellite precision.',
    personName: 'Oscar Wilde',
    sourceReference: 'Père Lachaise Official Cartography Archive',
    submittedBy: 'Marc Dubois',
    userEmail: 'marc.dubois@paris-archives.fr',
    status: 'APPROVED',
    createdAt: '2026-02-18T14:20:00Z',
    reviewedAt: '2026-02-20T09:15:00Z',
    reviewNotes: 'Coordinates verified with surveyor data.'
  },
  {
    id: 'c3',
    type: 'QUOTE',
    subject: 'Add verified quote from Marie Curie 1911 Nobel lecture',
    details: 'In scientific work, one must be interested in things, not in persons.',
    personName: 'Marie Curie',
    sourceReference: 'Nobel Lecture in Chemistry, December 11, 1911',
    submittedBy: 'Sophie Laurent',
    userEmail: 'sophie.laurent@sorbonne.fr',
    status: 'PENDING',
    createdAt: '2026-03-05T16:45:00Z'
  }
];
