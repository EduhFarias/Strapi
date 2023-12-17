'use strict';

/**
 * production-rule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::production-rule.production-rule');
