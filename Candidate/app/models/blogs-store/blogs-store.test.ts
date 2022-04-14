import { BlogsStoreModel } from "./blogs-store"

test("can be created", () => {
  const instance = BlogsStoreModel.create({})

  expect(instance).toBeTruthy()
})
