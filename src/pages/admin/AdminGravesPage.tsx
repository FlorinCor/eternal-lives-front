import React, { useState } from 'react';
import { useGraves, useUpdateGrave } from '../../hooks/useGraves';
import { Grave } from '../../types';
import { AdminTable } from '../../components/admin/AdminTable';
import { GraveFormModal } from '../../components/admin/GraveFormModal';
import { SEO } from '../../components/common/SEO';
import { Edit2, MapPin, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminGravesPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedGrave, setSelectedGrave] = useState<Grave | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: graves = [], isLoading } = useGraves();
  const updateMutation = useUpdateGrave();

  const filteredGraves = graves.filter(g =>
    g.cemeteryName.toLowerCase().includes(search.toLowerCase()) ||
    g.city.toLowerCase().includes(search.toLowerCase()) ||
    g.country.toLowerCase().includes(search.toLowerCase()) ||
    (g.personName && g.personName.toLowerCase().includes(search.toLowerCase()))
  );

  const handleOpenEdit = (grave: Grave) => {
    setSelectedGrave(grave);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Grave>) => {
    if (selectedGrave) {
      await updateMutation.mutateAsync({ id: selectedGrave.id, data });
    }
  };

  const columns = [
    {
      header: 'Cemetery & Sanctuary',
      render: (g: Grave) => (
        <div className="flex items-center gap-3">
          <img
            src={g.imageUrl}
            alt={g.cemeteryName}
            className="w-10 h-10 rounded-lg object-cover border border-forest-800 shrink-0"
          />
          <div>
            <div className="font-serif font-medium text-ivory-100">{g.cemeteryName}</div>
            <div className="text-xs text-stone-400 font-sans">
              {g.city}, {g.country}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Associated Luminary',
      render: (g: Grave) => (
        <span className="font-serif text-gold-300 font-medium">
          {g.personName || 'Historical Figure'}
        </span>
      ),
    },
    {
      header: 'Coordinates',
      render: (g: Grave) => (
        <span className="font-mono text-xs text-stone-300">
          {g.latitude.toFixed(4)}°, {g.longitude.toFixed(4)}°
        </span>
      ),
    },
    {
      header: 'Monument Type',
      render: (g: Grave) => (
        <span className="text-xs text-stone-400 italic">
          {g.monumentType || 'Historic Tomb'}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (g: Grave) => (
        <div className="flex items-center gap-2">
          {g.personId && (
            <Link to={`/people/${g.personId}`} target="_blank" title="View Memorial">
              <button className="p-1.5 rounded hover:bg-forest-900 text-stone-400 hover:text-ivory-100">
                <MapPin className="w-4 h-4" />
              </button>
            </Link>
          )}
          <button
            onClick={() => handleOpenEdit(g)}
            title="Edit Grave"
            className="p-1.5 rounded hover:bg-forest-900 text-stone-400 hover:text-gold-300"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEO title="Manage Resting Places & Graves — Archivist Admin" />

      <div className="space-y-6">
        <div className="pb-6 border-b border-forest-850">
          <h1 className="font-serif text-3xl text-ivory-100 font-normal">Manage Graves & Sanctuaries</h1>
          <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
            Update cemetery coordinates, addresses, plot descriptions, and geolocation markers.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 bg-charcoal-900 p-3 rounded-xl border border-forest-800">
          <div className="relative flex-1 max-w-md flex items-center">
            <Search className="w-4 h-4 text-stone-500 absolute left-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by cemetery, city, or person..."
              className="w-full bg-forest-950 border border-forest-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80"
            />
          </div>
          <div className="text-xs text-stone-400 font-sans">
            Total graves: <span className="text-gold-300 font-semibold">{filteredGraves.length}</span>
          </div>
        </div>

        {/* Table */}
        <AdminTable
          columns={columns}
          data={filteredGraves}
          keyExtractor={g => g.id}
          isLoading={isLoading}
        />

        {/* Edit Modal */}
        <GraveFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedGrave}
        />
      </div>
    </>
  );
};
