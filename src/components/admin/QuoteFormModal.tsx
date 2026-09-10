import React, { useState, useEffect } from 'react';
import { Quote } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { usePeople } from '../../hooks/usePeople';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Quote>) => Promise<void>;
  initialData?: Quote | null;
}

export const QuoteFormModal: React.FC<QuoteFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const { data: peopleResponse } = usePeople({ limit: 100 });
  const people = peopleResponse?.items || [];

  const [personId, setPersonId] = useState('');
  const [personName, setPersonName] = useState('');
  const [quote, setQuote] = useState('');
  const [source, setSource] = useState('');
  const [context, setContext] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [isVerified, setIsVerified] = useState(true);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setPersonId(initialData.personId || '');
      setPersonName(initialData.personName || '');
      setQuote(initialData.quote || '');
      setSource(initialData.source || '');
      setContext(initialData.context || '');
      setYear(initialData.year || '');
      setIsVerified(initialData.isVerified ?? true);
      setVerificationNotes(initialData.verificationNotes || '');
    } else {
      setPersonId(people[0]?.id || '');
      setPersonName(people[0]?.name || '');
      setQuote('');
      setSource('');
      setContext('');
      setYear('');
      setIsVerified(true);
      setVerificationNotes('');
    }
  }, [initialData, isOpen, people]);

  const handlePersonChange = (id: string) => {
    setPersonId(id);
    const found = people.find(p => p.id === id);
    if (found) setPersonName(found.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quote.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        personId: personId || people[0]?.id || '1',
        personName: personName || people[0]?.name || 'Historical Figure',
        quote,
        source: source || undefined,
        context: context || undefined,
        year: year ? Number(year) : undefined,
        isVerified,
        verificationNotes: verificationNotes || undefined,
      });
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Historical Quote' : 'Register New Quotation'}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Author / Speaker *
          </label>
          <select
            value={personId}
            onChange={e => handlePersonChange(e.target.value)}
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          >
            {people.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.categoryName})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Quote Text *
          </label>
          <textarea
            value={quote}
            onChange={e => setQuote(e.target.value)}
            rows={3}
            required
            placeholder="e.g. Imagination is more important than knowledge."
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg p-2.5 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80 font-serif leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Source / Work Title
            </label>
            <input
              type="text"
              value={source}
              onChange={e => setSource(e.target.value)}
              placeholder="e.g. Cosmic Religion"
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Year Recorded
            </label>
            <input
              type="number"
              value={year}
              onChange={e => setYear(e.target.value ? Number(e.target.value) : '')}
              placeholder="e.g. 1931"
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Historical Context / Circumstance
          </label>
          <input
            type="text"
            value={context}
            onChange={e => setContext(e.target.value)}
            placeholder="e.g. Interview regarding creative intuition"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Archival Verification Notes
          </label>
          <textarea
            value={verificationNotes}
            onChange={e => setVerificationNotes(e.target.value)}
            rows={2}
            placeholder="e.g. Verified in original manuscript letters."
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg p-2.5 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isVerifiedQuote"
            checked={isVerified}
            onChange={e => setIsVerified(e.target.checked)}
            className="w-4 h-4 rounded border-forest-700 bg-forest-950 text-gold-500 focus:ring-gold-500"
          />
          <label
            htmlFor="isVerifiedQuote"
            className="text-xs text-ivory-200 font-sans cursor-pointer"
          >
            Mark as Archival Verified Citation
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest-800/80">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" isLoading={isSubmitting}>
            Save Quote
          </Button>
        </div>
      </form>
    </Modal>
  );
};
