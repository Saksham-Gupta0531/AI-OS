const Package = require('../models/Package');

// Get all packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Add a new agent to a package category (create category if it doesn't exist)
exports.addAgentToPackage = async (req, res) => {
  try {
    const { categoryId, categoryTitle, agent } = req.body;

    let packageDoc = await Package.findOne({ categoryId });

    if (!packageDoc) {
      // Create new category package
      packageDoc = new Package({
        categoryId,
        categoryTitle,
        agents: [agent]
      });
    } else {
      // Add agent to existing category package
      packageDoc.agents.push(agent);
      // Update title if provided
      if (categoryTitle) packageDoc.categoryTitle = categoryTitle;
    }

    await packageDoc.save();
    res.status(201).json({ message: 'Agent added successfully', package: packageDoc });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
