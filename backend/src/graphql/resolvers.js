import logger from '../util/logger';

export default {
  Query: {
    campaigns: async (parent, args, { models }) => {
      logger.debug(`Data in: ${args.id}`);
      const Campaigns = args.id
        ? await [models.Campaign.findOne({ id: args.id })]
        : await models.Campaign.find({});
      logger.debug(`Data out: ${Campaigns}`);
      return Campaigns;
    },
  },
  Mutation: {
    createCampaign: async (parent, { name, goal, totalBudget }, { models }) => {
      const Campaign = await models.Campaign.findOne({ name });

      if (Campaign) {
        throw new Error('Please provide a unique title.');
      }

      const status = 'Delivering'; // "Ended", "Scheduled"

      // create a new Campaign
      const newCampaign = new models.Campaign({
        name,
        goal,
        totalBudget,
        status,
      });

      // save the Campaign
      try {
        await newCampaign.save();
      } catch (e) {
        throw new Error('Cannot Save Campaign!!!');
      }

      return true;
    },
  },
};
