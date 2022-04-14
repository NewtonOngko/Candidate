import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ExperiencesModel = types
  .model("Experiences")
  .props({
    id: types.identifierNumber,
    status: types.maybeNull(types.string),
    job_title : types.maybeNull(types.string),
    company_name : types.maybeNull(types.string),
    industry: types.maybeNull(types.string),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type ExperiencesType = Instance<typeof ExperiencesModel>
export interface Experiences extends ExperiencesType {}
type ExperiencesSnapshotType = SnapshotOut<typeof ExperiencesModel>
export interface ExperiencesSnapshot extends ExperiencesSnapshotType {}
export const createExperiencesDefaultModel = () => types.optional(ExperiencesModel, {})
