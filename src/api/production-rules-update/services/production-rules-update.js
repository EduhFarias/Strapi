'use strict';

/**
 * production-rules-update service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::production-rules-update.production-rules-update');
