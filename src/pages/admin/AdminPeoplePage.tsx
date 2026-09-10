import React, { useState } from 'react';
import { usePeople, useCreatePerson, useUpdatePerson, useDeletePerson } from '../../hooks/usePeople';
import { Person } from '../../types';
import { AdminTable } from '../../components/admin/AdminTable';
import { PersonFormModal } from '../../components/admin/PersonFormModal';
import { Button } from '../../components/common/Button';
import { SEO } from '../../components/common/SEO';
import { Plus, Edit2, Trash2, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminPeoplePage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { data: peopleResponse, isLoading } = usePeople({ limit: 100 });
  const people = peopleResponse?.items || [];

  const createMutation = useCreatePerson();
  const updateMutation = useUpdatePerson();
  const deleteMutation = useDeletePerson();

  const filteredPeople = people.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(search.toLowerCase()) ||
    p.country.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setSelectedPerson(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (person: Person) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  const handleSubmit = async (data: Partial<Person>) => {
    if (selectedPerson) {
      await updateMutation.mutateAsync({ id: selectedPerson.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this memorial record?')) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const columns = [
    {
      header: 'Luminary',
      render: (p: Person) => (
        <div className="flex items-center gap-3">
          <img
            src={p.portraitUrl}
            alt={p.name}
            className="w-10 h-10 rounded-full object-cover border border-forest-800 shrink-0"
          />
          <div>
            <div className="font-serif font-medium text-ivory-100 text-base">{p.name}</div>
            <div className="text-xs text-stone-400 font-sans">
              {p.birthYear} — {p.deathYear}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'categoryName' as keyof Person,
      render: (p: Person) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-sans bg-forest-950 text-gold-300 border border-forest-800">
          {p.categoryName}
        </span>
      ),
    },
    {
      header: 'Country',
      accessor: 'country' as keyof Person,
    },
    {
      header: 'Resting Place',
      render: (p: Person) => (
        <div className="text-xs font-sans">
          <div className="text-ivory-200">{p.grave.cemeteryName}</div>
          <div className="text-stone-400">{p.grave.city}, {p.grave.country}</div>
        </div>
      ),
    },
    {
      header: 'Featured',
      render: (p: Person) => (
        <span
          className={`text-xs font-sans px-2 py-0.5 rounded ${
            p.isFeatured ? 'bg-emerald-950 text-emerald-300' : 'text-stone-500'
          }`}
        >
          {p.isFeatured ? 'Yes' : 'No'}
        </span>
      ),
    },
    {
      header: 'Actions',
      render: (p: Person) => (
        <div className="flex items-center gap-2">
          <Link to={`/people/${p.slug}`} target="_blank" title="View Memorial Page">
            <button className="p-1.5 rounded hover:bg-forest-900 text-stone-400 hover:text-ivory-100">
              <ExternalLink className="w-4 h-4" />
            </button>
          </Link>
          <button
            onClick={() => handleOpenEdit(p)}
            title="Edit Memorial"
            className="p-1.5 rounded hover:bg-forest-900 text-stone-400 hover:text-gold-300"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(p.id)}
            title="Delete Record"
            className="p-1.5 rounded hover:bg-red-950 text-stone-400 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SEO title="Manage Luminaries — Archivist Admin" />

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-forest-850">
          <div>
            <h1 className="font-serif text-3xl text-ivory-100 font-normal">Manage Luminaries</h1>
            <p className="text-xs sm:text-sm text-stone-400 font-sans mt-1">
              Add, update, or remove historical biographical entries and grave links.
            </p>
          </div>
          <Button variant="gold" size="sm" onClick={handleOpenCreate} leftIcon={<Plus className="w-4 h-4" />}>
            Catalog Luminary
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
              placeholder="Search by name, category, or country..."
              className="w-full bg-forest-950 border border-forest-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-ivory-100 placeholder:text-stone-600 focus:outline-none focus:border-gold-500/80"
            />
          </div>
          <div className="text-xs text-stone-400 font-sans">
            Total records: <span className="text-gold-300 font-semibold">{filteredPeople.length}</span>
          </div>
        </div>

        {/* Table */}
        <AdminTable
          columns={columns}
          data={filteredPeople}
          keyExtractor={p => p.id}
          isLoading={isLoading}
        />

        {/* Person Edit / Create Modal */}
        <PersonFormModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          initialData={selectedPerson}
        />
      </div>
    </>
  );
};
