const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  features: [{ type: String }],
  iconUrl: { type: String, required: true }
});

const packageSchema = new mongoose.Schema({
  categoryId: { type: String, required: true, unique: true },
  categoryTitle: { type: String, required: true },
  agents: [agentSchema]
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
