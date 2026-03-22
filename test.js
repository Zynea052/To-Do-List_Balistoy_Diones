const request = require("supertest");
const app = require("./server");

describe("To-Do API Test", () => {

  it("GET /tasks - should return all tasks", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
  });

  it("POST /tasks - should add task", async () => {
    const res = await request(app)
      .post("/tasks")
      .send({ title: "Test Task" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Task added!");
  });

});