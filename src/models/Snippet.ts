import { Schema, model, models } from 'mongoose'

const snippetSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    language: { type: String, required: true },
    tags: [String],
    description: String,
    code: { type: String, required: true },
  },
  { timestamps: true }
)

export const SnippetModel =
  models.Snippet || model('Snippet', snippetSchema)