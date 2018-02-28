export default {
  title: 'tickets schema',
  version: 0,
  description: 'describes the tickets',
  type: 'object',
  properties: {
    id: {
      type: 'string',
      "primary": true
    },
    status: {
      type: 'string',
    },
    items: {
      type: 'array',
    },
    total: {
      type: 'number',
    },
    total_in: {
      type: 'number',
    },
    total_out: {
      type: 'number',
    },
    currency: {
      type: 'string',
    },
    paymentMethod: {
      type: 'string',
    },
    date: {
      type: 'string',
    }
  }
};
