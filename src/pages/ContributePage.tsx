import React, { useState } from 'react';
import { useSubmitContribution } from '../hooks/useContributions';
import { useAuth } from '../context/AuthContext';
import { ContributionType } from '../types';
import { Button } from '../components/common/Button';
import { SEO } from '../components/common/SEO';
import { Feather, CheckCircle, ShieldCheck, HelpCircle } from 'lucide-react';

export const ContributePage: React.FC = () => {
  const { user } = useAuth();
  const { mutateAsync: submitContribution, isPending } = useSubmitContribution();

  const [type, setType] = useState<ContributionType>('PERSON');
  const [personName, setPersonName] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [sourceReference, setSourceReference] = useState('');
  const [submittedBy, setSubmittedBy] = useState(user?.name || '');
  const [userEmail, setUserEmail] = useState(user?.email || '');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !details.trim() || !submittedBy.trim() || !userEmail.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage(null);
    try {
      await submitContribution({
        type,
        personName: personName.trim() || undefined,
        subject: subject.trim(),
        details: details.trim(),
        sourceReference: sourceReference.trim() || undefined,
        submittedBy: submittedBy.trim(),
        userEmail: userEmail.trim(),
      });
      setSubmittedSuccess(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit proposal. Please try again.');
    }
  };

  const handleResetForm = () => {
    setSubject('');
    setPersonName('');
    setDetails('');
    setSourceReference('');
    setSubmittedSuccess(false);
  };

  return (
    <>
      <SEO
        title="Contribute to Archive — Eternal Lives Sanctuary"
        description="Submit historical resting place suggestions, corrections, verified quotes, or archival photographs to Eternal Lives."
      />

      <div className="min-h-screen bg-forest-950 pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-gold-400 font-serif text-sm uppercase tracking-widest mb-3">
              <Feather className="w-4 h-4 text-gold-500" />
              <span>Community Custodianship</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-ivory-100 font-normal mb-3">
              Contribute to the Sanctuary
            </h1>
            <p className="text-stone-400 text-sm sm:text-base font-sans max-w-xl mx-auto">
              Help preserve human memory by suggesting new historical figures, precise grave coordinates, verified quotes, or photographic corrections.
            </p>
          </div>

          {/* Submission Process Notice */}
          <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-800 text-xs text-ivory-200 font-sans mb-8 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-gold-300">Archival Review Notice:</strong> All submissions are meticulously reviewed and cross-referenced against historical registries by our custodian team before publication to maintain scholarly integrity.
            </p>
          </div>

          {submittedSuccess ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-charcoal-900/90 border border-gold-600/40 text-center shadow-2xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-forest-900 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="font-serif text-3xl text-ivory-100 font-normal">
                Thank You for Your Custodianship
              </h2>
              <p className="text-stone-300 text-sm max-w-md mx-auto font-sans leading-relaxed">
                Your submission has been queued for review by the archivist curators. You will receive an update at <span className="text-gold-300">{userEmail}</span> once evaluated.
              </p>
              <div className="pt-4">
                <Button variant="outline" size="sm" onClick={handleResetForm}>
                  Submit Another Proposal
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-charcoal-900/90 border border-forest-800/80 rounded-2xl p-6 sm:p-10 shadow-2xl">
              {errorMessage && (
                <div className="mb-6 p-3.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contribution Type */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 font-sans">
                    Type of Contribution *
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[
                      { id: 'PERSON', label: 'New Luminary' },
                      { id: 'GRAVE', label: 'Missing Grave' },
                      { id: 'QUOTE', label: 'Quote & Words' },
                      { id: 'PHOTO', label: 'Photograph' },
                      { id: 'CORRECTION', label: 'Correction' },
                    ].map(t => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setType(t.id as ContributionType)}
                        className={`p-2.5 rounded-lg text-xs font-medium font-sans border transition-colors ${
                          type === t.id
                            ? 'bg-forest-900 text-gold-300 border-gold-500/80 shadow-gold-glow'
                            : 'bg-forest-950 text-stone-400 border-forest-800 hover:text-ivory-200'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Person Name (if applicable) */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
                    Historical Person Name (if known)
                  </label>
                  <input
                    type="text"
                    value={personName}
                    onChange={e => setPersonName(e.target.value)}
                    placeholder="e.g. Ada Lovelace, Hypatia of Alexandria"
                    className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3.5 py-2.5 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
                  />
                </div>

                {/* Subject Summary */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
                    Subject / Title *
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    required
                    placeholder="e.g. Suggest resting site for mathematician Ada Lovelace"
                    className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3.5 py-2.5 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
                  />
                </div>

                {/* Details */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
                    Detailed Information & Historical Notes *
                  </label>
                  <textarea
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    required
                    rows={4}
                    placeholder="Provide burial cemetery, address, year of birth/death, notable quotes, or context..."
                    className="w-full bg-forest-950/90 border border-forest-800 rounded-lg p-3 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors font-sans"
                  />
                </div>

                {/* Source / Citation Reference */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
                    Archival Reference & Source Link
                  </label>
                  <input
                    type="text"
                    value={sourceReference}
                    onChange={e => setSourceReference(e.target.value)}
                    placeholder="e.g. Oxford National Biography, Church registry record link"
                    className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3.5 py-2.5 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
                  />
                </div>

                {/* Submitter Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-forest-800/80">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={submittedBy}
                      onChange={e => setSubmittedBy(e.target.value)}
                      required
                      placeholder="Dr. Evelyn Reed"
                      className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3.5 py-2 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={e => setUserEmail(e.target.value)}
                      required
                      placeholder="evelyn@history.org"
                      className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3.5 py-2 text-sm text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80 transition-colors"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  isLoading={isPending}
                  className="w-full font-serif tracking-wider"
                  leftIcon={<Feather className="w-4 h-4" />}
                >
                  Submit for Archival Verification
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
