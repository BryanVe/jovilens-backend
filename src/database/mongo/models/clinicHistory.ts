import { model, Schema } from 'mongoose'

const collectionName = 'clinicHistories'

const Symptom = new Schema<ISymptom>(
  {
    id: String,
    answer: String,
  },
  {
    _id: false,
  }
)

const ClinicHistory = new Schema<IClinicHistory>(
  {
    patientId: {
      type: String,
      required: true,
    },
    signs: {
      type: [String],
      default: undefined,
    },
    symptoms: {
      type: [Symptom],
      default: undefined,
    },
    diagnosis: {
      type: String,
    },
    treatment: {
      type: String,
    },
    nextConsultation: {
      type: Date,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    collection: collectionName,
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform(_, ret) {
        delete ret._id
        delete ret.deleted
      },
      virtuals: true,
    },
  }
)

export const ClinicHistoryModel = model<IClinicHistory>(
  collectionName,
  ClinicHistory
)
