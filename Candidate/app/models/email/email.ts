import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const EmailModel = types
  .model("Email")
  .props({  id: types.identifierNumber,
    email: types.maybeNull(types.string),
    phone: types.maybeNull(types.number),})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type EmailType = Instance<typeof EmailModel>
export interface Email extends EmailType {}
type EmailSnapshotType = SnapshotOut<typeof EmailModel>
export interface EmailSnapshot extends EmailSnapshotType {}
export const createEmailDefaultModel = () => types.optional(EmailModel, {})
