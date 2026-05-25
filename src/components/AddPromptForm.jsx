import {useState} from 'react';
import { useDispatch } from 'react-redux';
import '../styles/AddPromptForm.css';
import { addPrompt } from '../store/promptsSlice';

const MODELS = ['Claude Sonnet', 'GPT-4', 'Claude Opus', 'GPT-4o', 'Llama 3', 'Gemini Pro'];

function getTagClass(tag){
    const map = {
        writing: tagWriting,
        coding: tagCoding,
        productivity: tagProductivity,
        creative: tagCreative,
        analysis: tagAnalysis
    }
    return map[tag.toLowerCase()] || tagOther
}

export default function AddPromptForm({onClose}){
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [prompt, setPrompt] = useState('');
    const [model, setModel] = useState('Claude Sonnet');
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState([]);
    
    const handleAddTag = () => {
        const val = tagInput.trim().toLowerCase();
        if( val && !tags.includes(val)) setTags([...tags, val]);
        setTagInput('');
    }

    const handleRemoveTag = (tag) => {
        setTags(tags.filter(t => t !== tag))
    }

    const handleSave = () => {
        if(!title.trim() || !prompt.trim()) {
            return alert('Please fill in title and prompt.');
        }
        dispatch(addPrompt({
            title, 
            prompt,
            model,
            tags
        }))
        onClose();
    }

    return (
        <div className='form'>

            <div className='formRow'>
                <div className='formGroup'>
                    <label className='label'>Title</label>
                    <input className='input'
                        placeholder="e.g. Code review" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className='formGroup'>
                    <label className='label'>Model</label>
                    <select className='input' value={model} onChange={(e) => setModel(e.target.value)}>
                        {MODELS.map(m => <option key={m}>{m}</option>)}
                    </select>
                </div>
            </div>

            <div className='formGroup'>
                <label className='label'>Prompt text</label>
                <textarea className='input' placeholder="Write your prompt here..." value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
            </div>

            <div className='tagRow'>
                <label className='label'>Add Tag</label>
                <input className='input' placeholder="Add a tag and press Enter..." value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddTag()} />
                <button className='secondaryBtn' onClick={handleAddTag}>Add</button>
            </div>

            <div className="tagsPreview">
                {tags.map(tag => (
                    <span key={tag} className={`${styles.tag} ${getTagClass(tag)}`}>
                        {tag}
                        <span className='tagRemove' onClick={() => handleRemoveTag(tag)}>
                            X
                        </span>
                    </span>
                ))}
            </div>

            <div className='formActions'>
                <button className='ghostBtn' onClick={onClose}>
                    Cancel
                </button>
                <button className='primaryBtn' onClick={handleSave}>
                    Save prompt
                </button>
            </div>
        </div>
    )
}