import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Articolo",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Data di pubblicazione",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Klaviyo", value: "Klaviyo" },
          { title: "Email Marketing", value: "Email Marketing" },
          { title: "Shopify", value: "Shopify" },
          { title: "Strategia", value: "Strategia" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Tempo di lettura (minuti)",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
    defineField({
      name: "excerpt",
      title: "Anteprima",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "body",
      title: "Contenuto",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normale", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ allowRelative: true, scheme: ["https", "http", "mailto"] }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Apri in nuova scheda",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
    // SEO
    defineField({
      name: "seoTitle",
      title: "SEO — Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO — Meta description",
      type: "text",
      rows: 2,
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
  ],
  groups: [
    { name: "seo", title: "SEO" },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      date: "publishedAt",
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle ?? ""} · ${date ? new Date(date).toLocaleDateString("it-IT") : ""}`,
      };
    },
  },
});
