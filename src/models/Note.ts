import { Schema, model, models } from "mongoose";

const noteSchema = new Schema(
  {
    topic: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const NoteModel = models.Note || model("Note", noteSchema);
