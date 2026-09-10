import React, { useState } from 'react';
import { useQuotes, useCreateQuote, useDeleteQuote } from '../../hooks/useQuotes';
import { Quote } from '../../types';
import { AdminTable } from '../../components/admin/AdminTable';
import { QuoteFormModal } from '../../components/admin/QuoteFormModal';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { Plus, Trash2, CheckCircle, HelpCircle, Search } from 'lucide-react';
import { truncateText } from '../../lib/utils';

export const AdminQuotesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const { data: quotes = [], isLoading } = useQuotes();
  const createMutation = useCreateQuote();
  const deleteMutation = useDeleteQuote();

  const filteredQuotes = quotes.filter(q =>
    q.quote.toLowerCase().includes(search.toLowerCase()) ||
    q.personName.toLowerCase().includes(search.toLowerCase()) ||
    (q.source && q.source.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSubmit = async (data: Partial<Quote>) => {
    await createMutation.mutateAsync(data);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this historical quote?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const columns = [
    {
      header: 'Author / Speaker',
      render: (q: Quote) => (
        <div className="font-serif font-medium text-gold-300 text-sm">
          {q.personName}
        </div>
      ),
    },
    {
      header: 'Historical Quote',
      render: (q: Quote) => (
        <div className="font-serif italic text-ivory-100 text-xs sm:text-sm max-w-md line-clamp-2">
          "{truncateText(q.quote.replace(/^["']|["']$/g, ''), 120)}"
        </div>
      ),
    },
    {
      header: 'Source / Citation',
      render: (q: Quote) => (
        <div className="text-xs font-sans text-stone-300">
          <div>{q.source || 'Historical record'}</div>
          {q.year && <div className="text-stone-500">Year: {q.year}</div>}
        </div>
      ),
    },
    {
      header: 'Verification',
      render: (q: Quote) => (
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-sans px-2 py-0.5 rounded-full ${
            q.isVerified
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              : 'bg-amber-950 text-amber-300 border border-amber-800'
          }`}
        >
          {q.isVerified ? (
            <>
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              Verified
            </>
          ) : (
            <>
              <HelpCircle className="w-3 h-3 text-amber-400" />
              Attributed
            </>
          )}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (q: Quote) => (
        <button
          onClick={() => handleDelete(q.id)}
          title="Delete Quote"
          className="p-1.5 rounded hover:bg-red-950 text-stone-400 hover:text-red-400 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <>
      <SEO title="Manage Quotations & Words — Archivist Admin" />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-850">
          <div>
            <h1 className="font-serif text-3xl text-ivory-100 font-normal">Manage Quotes & Wisdom</h1>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
              Add verified citations, bibliographic sources, and memorable reflections.
            </p>
          </div>
          <Button variant="gold" size="sm" onClick={() => setModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Register Quotation
          </Button>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 bg-charcoal-900 p-3 rounded-xl border border-forest-800">
          <div className="relative flex-1 max-w-md flex items-center">
            <Search className="w-4 h-4 text-stone-500 absolute left-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by quote words, speaker, or source..."
              className="w-full bg-forest-950 border border-forest-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80"
            />
          </div>
          <div className="text-xs text-stone-400 font-sans">
            Total quotes: <span className="text-gold-300 font-semibold">{filteredQuotes.length}</span>
          </div>
        </div>

        {/* Table */}
        <AdminTable
          columns={columns}
          data={filteredQuotes}
          keyExtractor={q => q.id}
          isLoading={isLoading}
        />

        {/* Create Modal */}
        <QuoteFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
