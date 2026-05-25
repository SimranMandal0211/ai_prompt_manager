export const initialPrompts = [
  {
    id: 1,
    title: 'Senior code reviewer',
    prompt: 'Review this code as a senior engineer. Point out bugs, suggest improvements, and explain the time/space complexity. Be concise but thorough.',
    model: 'Claude Sonnet',
    tags: ['coding'],
    favorite: true,
    createdAt: Date.now() - 86400000
  },
  {
    id: 2,
    title: 'Explain like I\'m 5',
    prompt: 'Explain the following concept to a 5-year-old using simple words, analogies, and a short example. Avoid jargon completely.',
    model: 'GPT-4o',
    tags: ['writing', 'analysis'],
    favorite: false,
    createdAt: Date.now() - 43200000
  },
  {
    id: 3,
    title: 'LinkedIn post writer',
    prompt: 'Write a LinkedIn post about the topic below. Use a hook in line 1, share a personal insight, end with a question. Keep it under 200 words.',
    model: 'Claude Sonnet',
    tags: ['writing', 'productivity'],
    favorite: true,
    createdAt: Date.now() - 3600000
  }
]