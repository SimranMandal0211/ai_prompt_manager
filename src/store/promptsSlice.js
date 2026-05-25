import { createSlice, createSelector } from '@reduxjs/toolkit';
import { initialPrompts } from '../data/initialData';

const promptsSlice = createSlice({
    name: 'prompts',
    initialState: {
        items: initialPrompts,
        nextId: initialPrompts.length + 1
    },
    reducers: {
        addPrompt: (state, action) => {
            state.items.unshift({
                ...action.payload,
                id: state.nextId++,
                fav: false,
                createdAt: Date.now()
            })
        },

        toggleFav: (state, action) => {
            const item = state.items.find(p => p.id === action.payload)
            if(item) item.fav = !item.fav;
        },

        deletePrompt: (state, action) => {
            state.items = state.items.filter(p => p.id !== action.payload)
        }
    }
})

export const { addPrompt, toggleFav, deletePrompt } = promptsSlice.actions;

// Selectors
export const selectAllPrompts = state => state.prompts.items;


export const selectFavoritePrompts = createSelector(
    selectAllPrompts, 
    (items) => items.filter(p => p.fav)
);


export const selectUniqueTags = createSelector(
    selectAllPrompts,
    items => [...new Set(items.flatMap(p => p.tags))]
);


export const selectFilteredPrompts = createSelector(selectAllPrompts,
    (_, filters) => filters,
    (items, { search, tag, model, sort }) => {
        let result = [...items];
        if(search) result = result.filter(p => 
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.prompt.toLowerCase().includes(search.toLowerCase())
        )
        if(tag) result = result.filter(p => p.tags.includes(tag));
        if(model) result = result.filter(p => p.model === model);
        if(sort === 'newest') result.sort((a,b) => b.createdAt - a.createdAt);
        else if(sort === 'oldest') result.sort((a,b) => a.createdAt - b.createdAt);
        else if(sort === 'fav') result.sort((a,b) => b.fav - a.fav);
        return result;
    }
)

export default promptsSlice.reducer;
