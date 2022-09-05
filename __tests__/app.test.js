const db = require("../db/connection.js");
const { app } = require("../app.js");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("Using app.js to run the database of NC-games", () => {
  describe("GET api/categories will return an array of 'category' objects with the following properties: slug and description", () => {
    test("200: returns a array of objects", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body.categories)).toBe(true);
          expect(response.body.categories.length > 0).toBe(true);
          expect(
            response.body.categories.forEach((category) => {
              expect(category).toHaveProperty("slug", expect.any(String));
              expect(category).toHaveProperty(
                "description",
                expect.any(String)
              );
            })
          );
        });
    });
  });

  //Head describe DETETE later
});
