// Schema to select company's opportunity and see details about it

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opportunitySchema = new Schema({
  name: String,
  description: String,
  location: String,
  startDate: Date,
  endDate: Date,
  companyId: String,
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

// Need help to create a route 
app.get('/opportunities/:id', async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    res.json(opportunity);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving opportunity');
  }
});