import express from 'express';
import { SubsidyRule } from '../models/SubsidyRule.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const rules = await SubsidyRule.find().sort({ min: 1 });
    res.json(rules);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving subsidy rules', error: err.message });
  }
});

export default router;
