'use strict';

const { errors } = require('@strapi/utils');
const { ApplicationError } = errors;

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
    async bootstrap({ strapi }) {
      // registering a subscriber  
      strapi.db.lifecycles.subscribe(async (event) => {
        if (event.action === 'beforeUpdate') {
          console.log(event);
          if (event.model.collectionName === 'production_rules') {
            console.log('ATUALIZOU A PRINCIPAL')
          }
          if (event.model.collectionName === 'production_rules_updates') {
           const ruleToUpdate = await strapi.entityService.findMany('api::production-rule.production-rule', {
            filters: {
              name: {
                $eq: event.params.data.name
              }
            }
           });
          //  PARA SABER SE TA SALVANDO OU PUBLICANDO, CHECAR SE PUBLISHED_AT ESTA COMO NULO OU DATA 
           const test = await strapi.entityService.update('api::production-rule.production-rule', ruleToUpdate[0].id, {
              data: {
                  rule: event.params.data.rule,
                }
              });
              //  throw new ApplicationError('O arquivo foi criado na collection production-rules-update');
              console.log(test);
          }
          // console.log('Before update event');
          // const {data, where, select, populate} = event.params;
          // console.log('Event: ', event.params.data);
        }
      });
  }
};
