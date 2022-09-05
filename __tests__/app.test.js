const db = require("../db/connection.js");
const { app } = require("../app.js");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/");
const { response } = require("express");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(testData); // <- seeding each time DELETE COMMENT later!
});

describe("Using app.js to run the database of NC-games", () => {
  describe("GET api/categories will return an array of 'category' objects with the following properties: slug and description", () => {
    test("when GET api/categories is called returns a array of objects", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body.categories)).toBe(true);
          expect(response.body.categories.length > 0).toBe(true);
        });
    });
  });

  //Head describe DETETE later
});
