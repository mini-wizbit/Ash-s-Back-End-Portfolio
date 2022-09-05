const db = require("../db/connection.js");
const { app } = require("../app.js");
const request = require("supertest");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/");
const { response } = require("express");

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
    test("404: Not Found from possible spelling mistake", () => {
      return request(app)
        .get("/api/cateogries")
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Not Found" });
        });
    });
  });
  describe("4: GET/api/reviews/:review_id", () => {
    test("200: responds with a single matching review", () => {
      const review_id = 2;
      return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200)
        .then((response) => {
          expect(response.body.game).toHaveProperty(
            "review_id",
            expect.any(Number)
          );
          expect(response.body.game).toHaveProperty(
            "title",
            expect.any(String)
          );
          expect(response.body.game).toHaveProperty(
            "review_body",
            expect.any(String)
          );
          expect(response.body.game).toHaveProperty(
            "designer",
            expect.any(String)
          );
          expect(response.body.game).toHaveProperty(
            "review_img_url",
            expect.any(String)
          );
          expect(response.body.game).toHaveProperty(
            "votes",
            expect.any(Number)
          );
          expect(response.body.game).toHaveProperty(
            "category",
            expect.any(String)
          );
          expect(response.body.game).toHaveProperty(
            "owner",
            expect.any(String)
          );
          expect(response.body.game).toHaveProperty(
            "created_at",
            expect.any(String)
          );
        });
    });
    test("400: ? GET/api/review/:review_id where the id = 9999", () => {
      const review_id = 9999;
      return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(400)
        .then((response) => {
          expect(response.body).toEqual({
            status: 400,
            msg: "Bad Request",
          });
        });
    });
    test("404: Not Found from possible spelling mistake for reviews (safety netting)", () => {
      const review_id = 2;
      return request(app)
        .get(`/api/reveiws/${review_id}`)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Not Found" });
        });
    });
  });
  //Head describe DELETE later
});
