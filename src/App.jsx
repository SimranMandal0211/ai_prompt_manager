import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAllPrompts, selectFavoritePrompts, selectUniqueTags, selectFilteredPrompts } from './store/promptsSlice';
import AddPromptForm from './components/AddPromptForm';

import'./App.css';


export default function App(){
  const [showForm, setShowForm ] = useState(false);
  const [filters, setFilters] = useState({search: '', tag: '', model: '', sort: 'newest' })

  const allPrompts = useSelector(selectAllPrompts);
  const favoritePrompts = useSelector(selectFavoritePrompts);
  const uniqueTags = useSelector(selectUniqueTags);
  const filteredPrompts = useSelector(state => selectFilteredPrompts(state, filters));
  
  return (
    <div className='container'>
      {/* Header */}
      <div className='header'>
        <div>
           <h1 className='headerTitle'>Prompt Manager</h1>
           <p className='headerSubtitle'>Powered by Redux Toolkit</p>
        </div>
        <button className='primaryBtn'
          onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Prompt'}
        </button>
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

      {/* Prompt List */}
    </div>
  )
}
