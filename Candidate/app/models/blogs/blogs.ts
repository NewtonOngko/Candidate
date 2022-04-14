import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const BlogsModel = types
  .model("Blogs")
  .props({ 
    id: types.identifierNumber,
    title: types.maybeNull(types.string),
    subTitle : types.maybeNull(types.string),
    photo : types.maybeNull(types.string),
    content: types.maybeNull(types.string),
    author: types.maybeNull(types.string),
    create_at : types.maybeNull(types.number),
    tag : types.maybeNull(types.string)
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type BlogsType = Instance<typeof BlogsModel>
export interface Blogs extends BlogsType {}
type BlogsSnapshotType = SnapshotOut<typeof BlogsModel>
export interface BlogsSnapshot extends BlogsSnapshotType {}
export const createBlogsDefaultModel = () => types.optional(BlogsModel, {})
