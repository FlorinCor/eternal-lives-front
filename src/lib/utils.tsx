import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatYears(birthYear: number, deathYear: number): string {
  const formatYear = (y: number) => (y < 0 ? `${Math.abs(y)} BCE` : `${y}`);
  return `${formatYear(birthYear)} — ${formatYear(deathYear)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

export function highlightText(text: string, query?: string): React.ReactNode {
  if (!query || !query.trim()) return text;
  const terms = query.trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return text;

  const escapedTerms = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${escapedTerms})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-gold-500/30 text-gold-200 px-0.5 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}
