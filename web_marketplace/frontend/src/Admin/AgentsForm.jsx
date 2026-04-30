import React, { useState } from 'react';

export default function AgentsForm() {
  const [formData, setFormData] = useState({
    categoryId: '',
    categoryTitle: '',
    title: '',
    subtitle: '',
    description: '',
    iconUrl: '',
    features: ['']
  });

  const [status, setStatus] = useState(null);

  const categories = [
    { id: 'developer', title: 'Developer Agents' },
    { id: 'creator', title: 'Creator Agents' },
    { id: 'gamer', title: 'Gamer Agents' },
    { id: 'student', title: 'Student Agents' }
  ];

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedTitle = categories.find(c => c.id === selectedId)?.title || '';
    setFormData(prev => ({ ...prev, categoryId: selectedId, categoryTitle: selectedTitle }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeatureField = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeatureField = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Clean up empty features
    const cleanFeatures = formData.features.filter(f => f.trim() !== '');

    const payload = {
      categoryId: formData.categoryId,
      categoryTitle: formData.categoryTitle,
      agent: {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        iconUrl: formData.iconUrl,
        features: cleanFeatures
      }
    };

    try {
      const res = await fetch('http://localhost:8080/api/packages/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        setStatus('success');
        // Reset specific fields
        setFormData(prev => ({
          ...prev,
          title: '', subtitle: '', description: '', iconUrl: '', features: ['']
        }));
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="animate-fade-in w-full max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-white">Add New Agent</h1>
      <p className="text-gray-400 mb-8">Enter the agent details below to add it to the marketplace database.</p>

      {status === 'success' && (
        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded text-green-400">
          Agent successfully added to the database!
        </div>
      )}

      {status === 'error' && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded text-red-400">
          Error adding agent. Please ensure the backend is running.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-[#111111] border border-gray-800 p-8 rounded-xl shadow-lg">
        
        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">For which Role? (Category)</label>
          <select 
            required
            value={formData.categoryId}
            onChange={handleCategoryChange}
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#FF5A06] transition-colors"
          >
            <option value="" disabled>Select a role...</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Agent Name */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Agent Name (Title)</label>
            <input 
              type="text" required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g. Code Architect"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#FF5A06] transition-colors"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Subtitle</label>
            <input 
              type="text" required
              value={formData.subtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
              placeholder="e.g. Design & Structure"
              className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#FF5A06] transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
          <textarea 
            required rows="3"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Agent description..."
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#FF5A06] transition-colors resize-none"
          />
        </div>

        {/* Icon URL */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Icon URL (Image link)</label>
          <input 
            type="url" required
            value={formData.iconUrl}
            onChange={(e) => setFormData(prev => ({ ...prev, iconUrl: e.target.value }))}
            placeholder="https://images.unsplash.com/..."
            className="w-full bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#FF5A06] transition-colors"
          />
        </div>

        {/* Features Dynamic List */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Features</label>
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-3">
                <input 
                  type="text" required
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-1 bg-[#1a1a1a] border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-[#FF5A06] transition-colors"
                />
                {formData.features.length > 1 && (
                  <button type="button" onClick={() => removeFeatureField(index)} className="px-4 text-red-400 hover:bg-red-500/10 rounded transition-colors border border-transparent">
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button 
            type="button" 
            onClick={addFeatureField}
            className="mt-3 text-sm text-[#FF5A06] hover:text-white transition-colors flex items-center"
          >
            + Add another feature
          </button>
        </div>

        <hr className="border-gray-800 my-6" />

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className="w-full bg-[#FF5A06] hover:bg-[#eb4f00] text-white font-bold py-3 rounded transition-colors disabled:opacity-50"
        >
          {status === 'submitting' ? 'Saving to Database...' : 'Add Agent'}
        </button>
      </form>
    </div>
  );
}
