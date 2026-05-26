import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleFav, deletePrompt } from '../store/promptsSlice';
import '../styles/PromptCard.css';
import { FaHeart, FaRegHeart , FaTrash , FaCheck, FaCopy } from 'react-icons/fa';

function getTagClass(tag){
    const map = {
    writing: 'tagWriting',
    coding: 'tagCoding',
    analysis: 'tagAnalysis',
    creative: 'tagCreative',
    productivity: 'tagProductivity',
  }
  return map[tag.toLowerCase()] || 'tagOther'
}

export default function PromptCard({prompt}){
    const dispatch = useDispatch();
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(prompt.prompt)
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const handleDelete = () => {
        if(window.confirm('Delete this prompts?')) {
            dispatch(deletePrompt(prompt.id))
        }
    }

    return (
        <div className={`card ${prompt.favorite ? 'cardFavorited' : ''}`}>

            {/* Heading */}
            <div className="cardHeader">
                <span className="cardTitle">{prompt.title}</span>
                <span className="cardModel">{prompt.model}</span>
            </div>

            {/* Body */}
            <p className="cardBody">{prompt.prompt}</p>

            {/* Footer */}
            <div className="cardFooter">
                <div className="cardTags">
                    {prompt.tags.map(tag => (
                        <span key={tag} className={`${tag} ${getTagClass(tag)}`} style={{padding: '2px 5px', borderRadius: '5px'}}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="cardActions">
                    <button
                        onClick={() => dispatch(toggleFav(prompt.id))}
                        className={`iconBtn ${prompt.fav ? 'iconBtnActive' : ''}`}
                        title="Favourite"
                    >
                        {prompt.fav ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <button
                        onClick = { handleCopy}
                        className={`iconBtn ${copied ? copied : ''}`}
                        title="Copy"
                    >
                        {copied ? <FaCheck/> : <FaCopy/>}
                    </button>

                    <button
                    onClick={handleDelete}
                    className='iconBtn'
                    title="Delete"
                    >
                        <FaTrash /> 
                    </button>
                </div>
            </div>
        </div>
    )
}