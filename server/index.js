const express = require("express");
const path = require('path');
const mongoose = require('mongoose');


const app = express();
const port = 3030;
const db = require('./schema');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


mongoose.connect("mongodb://localhost/inplace")

// Volunteers
app.get('/api/volunteer', async (req, res) => {
  try {
    const volunteers = await db.Volunteer.find().lean();
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/volunteer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const volunteer = await db.Volunteer.findById(id).lean();
    if (!volunteer) return res.status(404).json({ error: 'Not found' });
    res.json(volunteer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Organizations
app.get('/api/organization', async (req, res) => {
  try {
    const orgs = await db.Organization.find().lean();
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/organization/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const org = await db.Organization.findById(id).lean();
    if (!org) return res.status(404).json({ error: 'Not found' });
    res.json(org);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Opportunities
app.get('/api/opportunity', async (req, res) => {
  try {
    const opps = await db.Opportunity.find().populate('leading_org').lean();
    res.json(opps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/opportunity/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const opp = await db.Opportunity.findById(id).populate('leading_org').lean();
    if (!opp) return res.status(404).json({ error: 'Not found' });
    res.json(opp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Notifications
app.get('/api/notification', async (req, res) => {
  try {
    const notes = await db.Notification.find()
      .populate('recipientVolunteer')
      .populate('recipientOrganization')
      .lean();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/notification/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const note = await db.Notification.findById(id)
      .populate('recipientVolunteer')
      .populate('recipientOrganization')
      .lean();
    if (!note) return res.status(404).json({ error: 'Not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Applications
app.get('/api/application', async (req, res) => {
  try {
    const apps = await db.Application.find()
      .populate('applicant')
      .populate('opportunity')
      .lean();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/application/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const appDoc = await db.Application.findById(id)
      .populate('applicant')
      .populate('opportunity')
      .lean();
    if (!appDoc) return res.status(404).json({ error: 'Not found' });
    res.json(appDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Extra read-only relations

// Get all opportunities for an organization
app.get('/api/organization/:id/opportunities', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const opps = await db.Opportunity.find({ leading_org: id }).populate('leading_org').lean();
    res.json(opps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get notifications for an organization (recipientOrganization)
app.get('/api/organization/:id/notifications', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const notes = await db.Notification.find({ recipientOrganization: id })
      .populate('recipientOrganization')
      .populate('recipientVolunteer')
      .lean();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get notifications for a volunteer (recipientVolunteer)
app.get('/api/volunteer/:id/notifications', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const notes = await db.Notification.find({ recipientVolunteer: id })
      .populate('recipientVolunteer')
      .populate('recipientOrganization')
      .lean();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all applications for an opportunity
app.get('/api/opportunity/:id/applications', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });
    const apps = await db.Application.find({ opportunity: id })
      .populate('applicant')
      .populate('opportunity')
      .lean();
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* Routing to React app */
app.use(express.static(path.join(__dirname, '../build')));
app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, ()=> console.log("Listening on", port));
