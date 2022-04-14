import { BlogsModel } from "./blogs"

test("can be created", () => {
  const instance = BlogsModel.create({})

  expect(instance).toBeTruthy()
})
