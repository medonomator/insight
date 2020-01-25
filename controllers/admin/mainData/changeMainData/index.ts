import Boom from 'boom';
import { mainData } from '../../../../database/schemas/mainData';
import { logger } from '../../../../helpers/logger';
/**
 * Get main data
 * @param {}
 * @return Promise<{}>
 */
export const changeMainData = async req => {
  try {
    const { mainPage, aphorismPage, affirmationPage, materialPage, developmentPlanPage } = req.payload;
    const updater = {};

    if (mainPage) {
      updater['mainPage'] = mainPage;
    }
    if (aphorismPage) {
      updater['aphorismPage'] = aphorismPage;
    }
    if (affirmationPage) {
      updater['affirmationPage'] = affirmationPage;
    }
    if (materialPage) {
      updater['materialPage'] = materialPage;
    }
    if (developmentPlanPage) {
      updater['developmentPlanPage'] = developmentPlanPage;
    }

    logger.info(`Get main data`);
    return mainData.findOneAndUpdate({ _id: '5e1d4447a8f5be06149d863b' }, updater);
  } catch (err) {
    logger.error(err);
    return Boom.badImplementation(err.message);
  }
};
