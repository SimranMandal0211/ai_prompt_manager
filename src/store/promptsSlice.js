import { createSlice } from '@reduxjs/toolkit';
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

export const { addPrompt, toggleFav, deletePrompt} = promptsSlice.actions;
export default promptsSlice.reducer;