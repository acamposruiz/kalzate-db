export default {
  title: 'item schema',
  version: 0,
  description: 'describes an item',
  type: 'object',
  properties: {
    created_at: {
      type: 'number',
      index: true
    },
    reference: {
      type: 'string',
      primary: true,
    },
    brand: {
      type: 'string',
    },
    size: {
      type: 'number',
    },
    price: {
      type: 'number',
    },
    amount: {
      type: 'number',
    },
    gender: {
      type: 'string',
    },
    colors: {
      type: "array",
      uniqueItems: true,
      item: {
        type: "string",
      }
    }
  }
};
