'use strict';

/**
 * production-rule controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::production-rule.production-rule');
