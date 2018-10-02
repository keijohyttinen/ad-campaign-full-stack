import mongoose from 'mongoose';

const PlatformSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  total_budget: {
    type: Number,
  },
  remaining_budget: {
    type: Number,
  },
  start_date: {
    type: Number,
  },
  end_date: {
    type: Number,
  },
  target_audiance: {
    languages: [String],
    genders: [String],
    age_range: [Number],
    locations: [String],
    interests: [String],
  },
  creatives: {
    header: String,
    description: String,
    url: String,
    image: String,
  },
  insights: {
    impressions: Number,
    clicks: Number,
    nanos_score: mongoose.Schema.Types.Decimal128,
    cost_per_click: mongoose.Schema.Types.Decimal128,
    click_through_rate: mongoose.Schema.Types.Decimal128,
    advanced_kpi_1: mongoose.Schema.Types.Decimal128,
    advanced_kpi_2: mongoose.Schema.Types.Decimal128,
  },
});

const CampaignSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  goal: {
    type: String,
    required: true,
  },
  total_budget: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
  platforms: {
    facebook: PlatformSchema,
    instagram: PlatformSchema,
    google: PlatformSchema,
    adwords: PlatformSchema,
  },
});

export default mongoose.model('Campaign', CampaignSchema);
