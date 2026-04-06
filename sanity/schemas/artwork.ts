export default {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'collection',
      title: 'Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    },
    {
      name: 'year',
      title: 'Année',
      type: 'string',
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            }
          ]
        }
      ],
    },
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Original', value: 'original' },
          { title: 'Dérivé (Tirage/Affiche)', value: 'derivative' },
        ],
      },
      initialValue: 'original',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'format',
      title: 'Format',
      type: 'object',
      fields: [
        { name: 'width', title: 'Largeur', type: 'number' },
        { name: 'height', title: 'Hauteur', type: 'number' },
        { name: 'unit', title: 'Unité', type: 'string', initialValue: 'cm' },
      ],
    },
    {
      name: 'support',
      title: 'Support',
      type: 'string',
      options: {
        list: [
          { title: 'Huile sur toile', value: 'huile' },
          { title: 'Acrylique sur toile', value: 'acrylique' },
          { title: 'Technique mixte', value: 'mixte' },
          { title: 'Papier Fine Art', value: 'papier' },
          { title: 'Numérique', value: 'numerique' },
        ],
      },
    },
    {
      name: 'price',
      title: 'Prix',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'currency',
      title: 'Monnaie',
      type: 'string',
      initialValue: 'EUR',
    },
    {
      name: 'story',
      title: 'Story (Narrative)',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'inStock',
      title: 'En Stock',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'stripeProductId',
      title: 'Stripe Product ID',
      type: 'string',
    },
  ],
};
