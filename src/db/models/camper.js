import { Schema, model } from 'mongoose';

const gallerySchema = new Schema(
  {
    thumb: {
      type: String,
      required: true,
    },
    original: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const reviewSchema = new Schema(
  {
    reviewer_name: {
      type: String,
      required: true,
    },
    reviewer_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const camperSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    form: {
      type: String,
      required: true,
      enum: ['alcove', 'fullyIntegrated', 'panelTruck'],
    },
    length: String,
    width: String,
    height: String,
    tank: String,
    consumption: String,
    transmission: {
      type: String,
      enum: ['automatic', 'manual'],
    },
    engine: {
      type: String,
      enum: ['diesel', 'petrol', 'hybrid', 'electric'],
    },

    AC: { type: Boolean, default: false },
    bathroom: { type: Boolean, default: false },
    kitchen: { type: Boolean, default: false },
    TV: { type: Boolean, default: false },
    radio: { type: Boolean, default: false },
    refrigerator: { type: Boolean, default: false },
    microwave: { type: Boolean, default: false },
    gas: { type: Boolean, default: false },
    water: { type: Boolean, default: false },

    gallery: [gallerySchema],

    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Індекси для пошуку
camperSchema.index({ location: 1 });
camperSchema.index({ form: 1 });
camperSchema.index({ price: 1 });
camperSchema.index({ rating: -1 });

export const CamperCollection = model('campers', camperSchema);
