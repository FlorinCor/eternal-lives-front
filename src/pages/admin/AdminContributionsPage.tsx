import React, { useState } from 'react';
import { useContributions, useReviewContribution } from '../../hooks/useContributions';
import { Contribution, ContributionStatus } from '../../types';
import { AdminTable } from '../../components/admin/AdminTable';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { Check, X, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const AdminContributionsPage: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [reviewModalItem, setReviewModalItem] = useState<Contribution | null>(null);
  const [targetAction, setTargetAction] = useState<ContributionStatus>('APPROVED');
  const [reviewNotes, setReviewNotes] = useState('');

  const { data: contributions = [], isLoading } = useContributions();
  const reviewMutation = useReviewContribution();

  const filteredContributions = contributions.filter(c => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  const handleOpenReview = (item: Contribution, action: ContributionStatus) => {
    setReviewModalItem(item);
    setTargetAction(action);
    setReviewNotes(action === 'APPROVED' ? 'Verified against scholarly sources and approved.' : '');
  };

  const handleConfirmReview = async () => {
    if (!reviewModalItem) return;
    await reviewMutation.mutateAsync({
      id: reviewModalItem.id,
      status: targetAction,
      reviewNotes: reviewNotes.trim() || undefined,
    });
    setReviewModalItem(null);
  };

  const columns = [
    {
      header: 'Contribution Type & Subject',
      render: (c: Contribution) => (
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif font-medium text-ivory-100 text-sm">{c.subject}</span>
            <span
              className={`text-[10px] font-sans px-2 py-0.5 rounded font-semibold ${
                c.type === 'PERSON'
                  ? 'bg-blue-950 text-blue-300 border border-blue-800'
                  : c.type === 'GRAVE'
                  ? 'bg-purple-950 text-purple-300 border border-purple-800'
                  : c.type === 'QUOTE'
                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                  : 'bg-stone-800 text-stone-300'
              }`}
            >
              {c.type}
            </span>
          </div>
          {c.personName && (
            <div className="text-xs text-gold-400 font-serif">Regarding: {c.personName}</div>
          )}
          <p className="text-xs text-stone-300 font-sans mt-1 max-w-lg">{c.details}</p>
          {c.sourceReference && (
            <p className="text-[11px] text-stone-500 font-sans mt-1 italic">
              Source: {c.sourceReference}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Submitted By',
      render: (c: Contribution) => (
        <div className="text-xs font-sans">
          <div className="text-ivory-200 font-medium">{c.submittedBy}</div>
          <div className="text-stone-400">{c.userEmail}</div>
          <div className="text-stone-500 text-[10px] mt-1">
            {new Date(c.createdAt).toLocaleDateString()}
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (c: Contribution) => (
        <span
          className={`inline-flex items-center gap-1 text-xs font-sans px-2.5 py-1 rounded-full ${
            c.status === 'APPROVED'
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              : c.status === 'REJECTED'
              ? 'bg-red-950 text-red-300 border border-red-800'
              : 'bg-amber-950 text-amber-300 border border-amber-800'
          }`}
        >
          {c.status === 'APPROVED' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          {c.status === 'REJECTED' && <XCircle className="w-3.5 h-3.5 text-red-400" />}
          {c.status === 'PENDING' && <Clock className="w-3.5 h-3.5 text-amber-400" />}
          {c.status}
        </span>
      ),
    },
    {
      header: 'Moderation',
      render: (c: Contribution) => (
        <div className="flex items-center gap-2">
          {c.status === 'PENDING' ? (
            <>
              <button
                onClick={() => handleOpenReview(c, 'APPROVED')}
                title="Approve Contribution"
                className="p-1.5 rounded bg-forest-900/80 hover:bg-emerald-950 text-emerald-400 border border-emerald-800/60"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOpenReview(c, 'REJECTED')}
                title="Reject Contribution"
                className="p-1.5 rounded bg-charcoal-950 hover:bg-red-950 text-red-400 border border-red-800/60"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className="text-xs text-stone-500 italic">
              {c.reviewedAt ? `Reviewed ${new Date(c.reviewedAt).toLocaleDateString()}` : 'Completed'}
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <SEO title="Manage User Contributions — Archivist Admin" />

      <div className="space-y-6">
        <div className="pb-6 border-b border-forest-850">
          <h1 className="font-serif text-3xl text-ivory-100 font-normal">Community Contributions Queue</h1>
          <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
            Review, verify, and moderate visitor proposals, corrections, quotes, and cemetery geolocations.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans transition-colors ${
                filterStatus === status
                  ? 'bg-forest-900 text-gold-300 border border-gold-600/40 shadow-gold-glow'
                  : 'bg-charcoal-900 text-stone-400 border border-forest-800 hover:text-ivory-200'
              }`}
            >
              {status === 'ALL' ? 'All Submissions' : status} (
              {status === 'ALL'
                ? contributions.length
                : contributions.filter(c => c.status === status).length}
              )
            </button>
          ))}
        </div>

        {/* Table */}
        <AdminTable
          columns={columns}
          data={filteredContributions}
          keyExtractor={c => c.id}
          isLoading={isLoading}
        />

        {/* Review Modal */}
        {reviewModalItem && (
          <Modal
            isOpen={!!reviewModalItem}
            onClose={() => setReviewModalItem(null)}
            title={`${targetAction === 'APPROVED' ? 'Approve' : 'Reject'} Contribution`}
            maxWidth="md"
          >
            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-forest-950/80 border border-forest-800 text-xs">
                <p className="font-serif text-ivory-100 font-medium mb-1">{reviewModalItem.subject}</p>
                <p className="text-stone-300 font-sans">{reviewModalItem.details}</p>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
                  Archivist Moderation Notes (Optional)
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  rows={3}
                  placeholder="Notes explaining approval or reasons for rejection..."
                  className="w-full bg-forest-950 border border-forest-800 rounded-lg p-2.5 text-xs text-ivory-100 focus:outline-none focus:border-gold-500/80 font-sans"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest-800/80">
                <Button variant="ghost" onClick={() => setReviewModalItem(null)}>
                  Cancel
                </Button>
                <Button
                  variant={targetAction === 'APPROVED' ? 'gold' : 'danger'}
                  onClick={handleConfirmReview}
                  isLoading={reviewMutation.isPending}
                >
                  Confirm {targetAction === 'APPROVED' ? 'Approval' : 'Rejection'}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
};
