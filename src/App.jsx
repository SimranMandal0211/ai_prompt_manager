import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllPrompts, selectFavoritePrompts, selectUniqueTags, selectFilteredPrompts } from './store/promptsSlice';
import AddPromptForm from './components/AddPromptForm';
import FilterBar from './components/FilterBar';
import PromptCard from './components/PromptCard';
import useTheme from './hooks/useTheme';

import'./App.css';


export default function App(){
  const [showForm, setShowForm ] = useState(false);
  const [filters, setFilters] = useState({search: '', tag: '', model: '', sort: 'newest' })

  const allPrompts = useSelector(selectAllPrompts);
  const favoritePrompts = useSelector(selectFavoritePrompts);
  const uniqueTags = useSelector(selectUniqueTags);

  const filteredPrompts = useSelector(
    useMemo(() => state => selectFilteredPrompts(state, filters), [filters])
  );

  const { theme, toggleTheme } = useTheme();


  return (
    <div className='container'>
      {/* Header */}
      <div className='header'>
        <div>
           <h1 className='headerTitle'>Prompt Manager</h1>
           <p className='headerSubtitle'>Powered by Redux Toolkit</p>
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <button className="ghostBtn" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button className='primaryBtn'
            onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Prompt'}
          </button>
        </div>
        
      </div>


      {/* Stats */}
      <div className='stats'>
        {[
          { label: 'Total prompts', value: allPrompts.length },
          { label: 'Favourites', value: favoritePrompts.length },
          { label: 'Unique tags', value: uniqueTags.length }
        ].map(s => (
          <div key={s.label}className='statCard'>
            <div className='statValue'>{s.value}</div>
            <div className='statLabel'>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Add Form */}
      {showForm && <AddPromptForm onClose={() => setShowForm(false)}/>}

      {/* Filters */}
      <FilterBar filters={filters} setFilter={setFilters} uniqueTags={uniqueTags} />

      {/* Prompt List */}
      {filteredPrompts.length === 0 ? 
        <div style={{ textAlign: 'center', padding: '2.5rem', color: '#aaa' }}>No prompts found.</div> :
        filteredPrompts.map((p, index) => (<PromptCard key={p.id} prompt={p} index={index}/>))
      }
    </div>
  )
}
