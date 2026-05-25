import { configureStore } from '@reduxjs/toolkit';
import promptsReducer from './promptsSlice';

// load saved state from localStorage
const loadState = () => {
    try{
        const saved = localStorage.getItem('promptsState')
        return saved ? { prompts: JSON.parse(saved)} : undefined
    }catch{
        return undefined
    }
}

// save state to localStorage
const saveState = (state) => {
    try{
        localStorage.setItem('promptsState', JSON.stringify(state.prompts))
    }catch{
        console.error('Could not save to localStorage')
    }
}

export const store = configureStore({
    reducer: {
        prompts: promptsReducer 
    },
    preloadedState: loadState()
})

store.subscribe(() => {
    saveState(store.getState())
})