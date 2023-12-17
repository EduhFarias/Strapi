'use strict';

/**
 * production-rule router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::production-rule.production-rule');
