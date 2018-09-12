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
        logger.error('Cannot Save Campaign %s', e);
        throw new Error('Cannot Create Campaign!!!');
      }

      return newCampaign;
    },
    updateCampaign: async (parent, { args }, { models }) => models.Campaign.findOneAndUpdate({
      id: args.id,
    }, { args }),
    deleteCampaign: async (parent, { args }, { models }) => models.Campaign.findOneAndDelete({
      id: args.id,
    }),
  },
};
