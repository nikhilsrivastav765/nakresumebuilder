import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, XCircle, Sparkles, Trash2 } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

const Skills = () => {
  const { resumeData, updateSection } = useResume();
  const { currentUser } = useAuth();
  const [skills, setSkills] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [titleForSkills, setTitleForSkills] = useState('');
  const [error, setError] = useState(''); // Add state for error message

  useEffect(() => {
    setSkills(resumeData.skills || []);
  }, [resumeData.skills]);

  const addSkill = (skillName) => {
    const trimmed = skillName.trim();
    if (trimmed && !skills.some((skill) => skill.name.toLowerCase() === trimmed.toLowerCase())) {
      const updatedSkills = [...skills, { name: trimmed }];
      setSkills(updatedSkills);
      updateSection('skills', updatedSkills);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      addSkill(input);
      setInput('');
    }
  };

  const handleBlur = () => {
    if (input.trim()) {
      addSkill(input);
      setInput('');
    }
  };

  const handleRemove = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    updateSection('skills', updatedSkills);
  };

  const fetchSkills = async () => {
    if (!titleForSkills) {
      setError('Please enter a professional title before generating skills.'); // Set error message
      return; // Stop the function execution
    }
    setError(''); // Clear any previous error
    setLoading(true);
    try {
      const res = await fetch('https://api.ai21.com/studio/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 9de06376-d189-4793-a648-6f79d91903f3`,
        },
        body: JSON.stringify({
          model: "jamba-large-1.6",
          messages: [
            {
              role: "user",
              content: `Suggest 10 professional skills based on the title "${titleForSkills}". Only give the skill names, separated by commas.`,
            },
          ],
          n: 1,
          max_tokens: 2048,
          temperature: 0.4,
          top_p: 1,
          stop: [],
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.choices && data.choices.length > 0) {
        const content = data.choices[0].message.content;
        const suggestions = content.split(',').map(skill => skill.trim());

        const newSkills = [...skills];

        suggestions.forEach((skillName) => {
          if (skillName && !newSkills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
            newSkills.push({ name: skillName });
          }
        });

        setSkills(newSkills);
        updateSection('skills', newSkills);
        setInput('');
      } else {
        console.warn('No suggestions found in API response');
      }
    } catch (error) {
      console.error('Failed to fetch AI skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setTitleForSkills(value);
  };

    const handleDeleteAll = () => {
        setSkills([]);
        updateSection('skills', []);
    };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
    hover: { scale: 1.05 },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <Tag className="w-6 h-6 text-blue-500" />
        Skills
      </h2>

      <div className="flex justify-between items-center">
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-2"
        >
            <AnimatePresence>
            {skills.map((skill, index) => (
                <motion.div
                key={index}
                variants={skillVariants}
                exit="exit"
                whileHover="hover"
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center gap-2 shadow-md transition-all duration-200"
                >
                <span>{skill.name}</span>
                <motion.button
                    onClick={() => handleRemove(index)}
                    className="text-red-500 text-sm hover:text-red-700 transition-colors"
                    title="Remove Skill"
                >
                    <XCircle className="w-4 h-4" />
                </motion.button>
                </motion.div>
            ))}
            </AnimatePresence>
        </motion.div>
        {skills.length > 0 && (
            <button
            onClick={handleDeleteAll}
            className="bg-red-500/20 text-red-500 hover:bg-red-500/30 hover:text-red-400 transition-all duration-200 px-3 py-1 rounded-md flex items-center gap-2"
            >
            <Trash2 className="w-4 h-4" />
            Delete All
            </button>
        )}
      </div>

      <motion.div variants={inputVariants}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Type your professional title (e.g., Software Developer)"
          className="w-full p-3 border rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </motion.div>

      <div className="mt-4">
        {currentUser?.isPremium ? (
          <>
            <button
              onClick={fetchSkills}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              disabled={loading}
            >
              <Sparkles className="w-4 h-4" />
              {loading ? 'Loading...' : 'Get AI Skill Suggestions'}
            </button>
            {error && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-600">
            Not sure what to add?{' '}
            <span
              className="text-blue-600 underline cursor-pointer"
              onClick={() => console.log('Redirect to Premium')}
            >
              Upgrade to Premium to use AI suggestions
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Skills;
