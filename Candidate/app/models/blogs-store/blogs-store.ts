import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { BlogApi } from "../../services/api/blog-api"
import { BlogsModel, BlogsSnapshot } from "../blogs/blogs"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const BlogsStoreModel = types
  .model("BlogsStore")
  .props({
    blog : types.optional(types.array(BlogsModel),[])
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveBlog: (blogSnapshots: BlogsSnapshot[]) => {
      self.blog.replace(blogSnapshots)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .views((self)=>({
    getDataBlog:(text : string)=>{
      return self.blog.filter(item => item.author.toLocaleLowerCase().includes(text.toLocaleLowerCase
        ().trim())) && self.blog.filter(item => item.title.toLocaleLowerCase().includes(text.toLocaleLowerCase
          ().trim()))
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getBlog :async () => {
      const blogApi = new BlogApi(self.environment.api)
      const result = await blogApi.getBlog()
      console.log('blog',result)
      if (result.kind === "ok") {
        self.saveBlog(result.blog)
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type BlogsStoreType = Instance<typeof BlogsStoreModel>
export interface BlogsStore extends BlogsStoreType {}
type BlogsStoreSnapshotType = SnapshotOut<typeof BlogsStoreModel>
export interface BlogsStoreSnapshot extends BlogsStoreSnapshotType {}
export const createBlogsStoreDefaultModel = () => types.optional(BlogsStoreModel, {})
