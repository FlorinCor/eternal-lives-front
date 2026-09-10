export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  graveCount: number;
  imageUrl: string;
}

export interface Grave {
  id: string;
  personId?: string;
  personName?: string;
  cemeteryName: string;
  city: string;
  state?: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
  additionalImages?: string[];
  plotDescription?: string;
  accessInformation?: string;
  monumentType?: string;
}

export interface Quote {
  id: string;
  personId: string;
  personName: string;
  personSlug?: string;
  quote: string;
  source?: string;
  context?: string;
  year?: number;
  isVerified: boolean;
  verificationNotes?: string;
}

export interface PhotoItem {
  id?: string;
  url: string;
  caption: string;
  credit?: string;
  category?: 'grave' | 'portrait' | 'monument' | 'historical';
}

export interface Person {
  id: string;
  slug: string;
  name: string;
  nativeName?: string;
  birthYear: number;
  deathYear: number;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: string;
  deathPlace?: string;
  categorySlug: string;
  categoryName: string;
  occupations: string[];
  country: string;
  portraitUrl: string;
  heroImageUrl: string;
  graveImageUrl: string;
  shortBiography: string;
  fullBiography: string[];
  featuredQuote: Quote;
  grave: Grave;
  quotes: Quote[];
  gallery: PhotoItem[];
  isFeatured: boolean;
  historicalSignificance?: string;
  createdAt?: string;
}

export type ContributionType = 'PERSON' | 'CORRECTION' | 'GRAVE' | 'QUOTE' | 'PHOTO';
export type ContributionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Contribution {
  id: string;
  type: ContributionType;
  subject: string;
  details: string;
  personName?: string;
  sourceReference?: string;
  submittedBy: string;
  userEmail: string;
  status: ContributionStatus;
  createdAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  token?: string;
  avatarUrl?: string;
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  country?: string;
  birthYearMin?: number;
  birthYearMax?: number;
  deathYearMin?: number;
  deathYearMax?: number;
  cemetery?: string;
  sortBy?: 'importance' | 'alphabetical' | 'recent' | 'birth_asc' | 'death_desc';
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
