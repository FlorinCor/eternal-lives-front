import React, { useState, useEffect } from 'react';
import { Grave } from '../../types';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

interface GraveFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Grave>) => Promise<void>;
  initialData?: Grave | null;
}

export const GraveFormModal: React.FC<GraveFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [cemeteryName, setCemeteryName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number | ''>(48.8566);
  const [longitude, setLongitude] = useState<number | ''>(2.3522);
  const [imageUrl, setImageUrl] = useState('');
  const [monumentType, setMonumentType] = useState('');
  const [plotDescription, setPlotDescription] = useState('');
  const [accessInformation, setAccessInformation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setCemeteryName(initialData.cemeteryName || '');
      setCity(initialData.city || '');
      setState(initialData.state || '');
      setCountry(initialData.country || '');
      setAddress(initialData.address || '');
      setLatitude(initialData.latitude || 48.8566);
      setLongitude(initialData.longitude || 2.3522);
      setImageUrl(initialData.imageUrl || '');
      setMonumentType(initialData.monumentType || '');
      setPlotDescription(initialData.plotDescription || '');
      setAccessInformation(initialData.accessInformation || '');
    } else {
      setCemeteryName('');
      setCity('');
      setState('');
      setCountry('');
      setAddress('');
      setLatitude(48.8566);
      setLongitude(2.3522);
      setImageUrl('');
      setMonumentType('');
      setPlotDescription('');
      setAccessInformation('');
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cemeteryName.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        cemeteryName,
        city,
        state: state || undefined,
        country,
        address,
        latitude: Number(latitude) || 48.8566,
        longitude: Number(longitude) || 2.3522,
        imageUrl: imageUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        monumentType,
        plotDescription,
        accessInformation,
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
      title={initialData ? `Edit Grave Record: ${initialData.cemeteryName}` : 'Register Grave Location'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Cemetery Name *
          </label>
          <input
            type="text"
            value={cemeteryName}
            onChange={e => setCemeteryName(e.target.value)}
            required
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              City *
            </label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              State / Province
            </label>
            <input
              type="text"
              value={state}
              onChange={e => setState(e.target.value)}
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Country *
          </label>
          <input
            type="text"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Full Address
          </label>
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="1 Einstein Dr, Princeton, NJ 08540"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Latitude (Decimal)
            </label>
            <input
              type="number"
              step="any"
              value={latitude}
              onChange={e => setLatitude(e.target.value ? Number(e.target.value) : '')}
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
              Longitude (Decimal)
            </label>
            <input
              type="number"
              step="any"
              value={longitude}
              onChange={e => setLongitude(e.target.value ? Number(e.target.value) : '')}
              className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Monument Style / Architecture
          </label>
          <input
            type="text"
            value={monumentType}
            onChange={e => setMonumentType(e.target.value)}
            placeholder="e.g. Marble Mausoleum, Slate Floor Ledger"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Plot Location / Crypt Number
          </label>
          <input
            type="text"
            value={plotDescription}
            onChange={e => setPlotDescription(e.target.value)}
            placeholder="e.g. Vault XXIV, North Nave"
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg px-3 py-2 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1 font-sans">
            Visitor Access & Hours Information
          </label>
          <textarea
            value={accessInformation}
            onChange={e => setAccessInformation(e.target.value)}
            rows={2}
            placeholder="e.g. Open daily to respectful visitors 09:00 - 18:00."
            className="w-full bg-forest-950/90 border border-forest-800 rounded-lg p-2.5 text-sm text-ivory-100 focus:outline-none focus:border-gold-500/80"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-forest-800/80">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="gold" isLoading={isSubmitting}>
            Save Grave Record
          </Button>
        </div>
      </form>
    </Modal>
  );
};
