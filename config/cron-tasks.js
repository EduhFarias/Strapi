module.exports = {
    /**
     * Scheduled publication workflow.
     * Checks every minute if there are draft rules to publish.
     */
  
    '*/1 * * * *': async () => {
      // fetch rules to publish;
      const draftRuleToPublish = await strapi.entityService.findMany('api::production-rule.production-rule', {
        publicationState: 'preview', // preview returns both draft and published entries
        filters: {
          publishedAt: {
            $null: true, // so we add another condition here to filter entries that have not been published
          },
          publish_at: {
            $lt: new Date() // and we keep only rules with a 'publish_at' datetime value that is lower than the current datetime
          }
        }
      });
      // update the publish_at of rules previously fetched
      await Promise.all(draftRuleToPublish.map(article => {
        return strapi.entityService.update('api::production-rule.production-rule', article.id, {
          data: {
            publishedAt: new Date(),
          }
        });
      }))
    },
  };