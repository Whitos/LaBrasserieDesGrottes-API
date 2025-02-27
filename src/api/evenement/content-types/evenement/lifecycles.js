// path: src/api/evenement/content-types/evenement/lifecycles.js

module.exports = {
    async afterCreate({ result }) {
      await reorderEventsPositions();
    },
    async afterUpdate({ result }) {
      await reorderEventsPositions();
    },
    async afterDelete({ result }) {
      await reorderEventsPositions();
    },
  };
  
  async function reorderEventsPositions() {
    // 1) Récupérer tous les événements triés par date
    const events = await strapi.entityService.findMany('api::evenement.evenement', {
      sort: { date: 'asc' },
      fields: ['id', 'date'],
    });
  
    // 2) Recalculer la position
    for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const newPosition = i + 1;
  
      // 3) Mettre à jour la position de chaque événement
      await strapi.entityService.update('api::evenement.evenement', event.id, {
        data: { position: newPosition },
      });
    }
  }
  