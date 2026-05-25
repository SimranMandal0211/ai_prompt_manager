import '../styles/FilterBar.css';
const MODELS = ['Claude Sonnet', 'Claude Opus', 'GPT-4o', 'Gemini 1.5', 'Llama 3']


export default function FilterBar({filters, setFilter, uniqueTags}){
    const update = (
        key, value
    ) => setFilter(prev => ({ ...prev, [key]: value}))
    return (
        <div className='filterBar'>
            <input className='searchInput' placeholder='Search prompts...'
                value={filters.search}
                onChange={e => update('search', e.target.value)} 
            />
            <select className='select' 
                value={filters.tag}
                onChange={e => update('tag', e.target.value)}
            >
                <option value="">All Tags</option>
                {uniqueTags.map(t => 
                    <option key={t} value={t}>{t}</option>
                )}
            </select>

            <select className='select'
                value={filters.model}
                onChange={e => update('model', e.target.value)}
            >
                <option value="">All Models</option>
                {MODELS.map(m => (
                    <option key={m} value={m}>{m}</option>
                ))}
            </select>

            <select
                className='select'
                value={filters.sort}
                onChange={e => update('sort', e.target.value)}
            >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="fav">Favourites first</option>
            </select>
        </div>
    )
}