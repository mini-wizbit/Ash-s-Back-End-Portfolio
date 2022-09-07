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
          expect(response.body.game).toHaveProperty("review_id", 2);
          expect(response.body.game).toHaveProperty("title", "Jenga");
          expect(response.body.game).toHaveProperty(
            "review_body",
            "Fiddly fun for all the family"
          );
          expect(response.body.game).toHaveProperty("designer", "Leslie Scott");
          expect(response.body.game).toHaveProperty(
            "review_img_url",
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
          );
          expect(response.body.game).toHaveProperty("votes", 5);
          expect(response.body.game).toHaveProperty("category", "dexterity");
          expect(response.body.game).toHaveProperty("owner", "philippaclaire9");
          expect(response.body.game).toHaveProperty(
            "created_at",
            "2021-01-18T10:01:41.251Z"
          );
        });
    });
    test("404: ? GET/api/review/:review_id where the id = 9999", () => {
      const review_id = 9999;
      return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({
            status: 404,
            msg: "Not Found",
          });
        });
    });
    test("400: ? GET/api/review/:review_id where the id = banaas", () => {
      const review_id = "bananas";
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
  describe("5: GET/api/users", () => {
    test("200: response with a array of objects with users info", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body.users)).toBe(true);
          expect(response.body.users.length > 0).toBe(true);
          expect(
            response.body.users.forEach((user) => {
              expect(user).toHaveProperty("username", expect.any(String));
              expect(user).toHaveProperty("name", expect.any(String));
              expect(user).toHaveProperty("avatar_url", expect.any(String));
            })
          );
        });
    });
    test("404: Not Found from possible spelling mistake in Users", () => {
      return request(app)
        .get("/api/uses")
        .expect(404)
        .then((response) => {
          expect(response.body).toEqual({ msg: "Not Found" });
        });
    });
  });
  describe("6. PATCH/api/reviews/:reviews_id", () => {
    test("200: response with a board game object with a updated vote", () => {
      const review = { votes: 2 };
      const review_id = 2;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(200)
        .then(({ body }) => {
          expect(body.review.votes).toBe(7);
          expect(body.review).toHaveProperty("review_id", 2);
          expect(body.review).toHaveProperty("title", "Jenga");
          expect(body.review).toHaveProperty(
            "review_body",
            "Fiddly fun for all the family"
          );
          expect(body.review).toHaveProperty("designer", "Leslie Scott");
          expect(body.review).toHaveProperty(
            "review_img_url",
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
          );
          expect(body.review).toHaveProperty("category", "dexterity");
          expect(body.review).toHaveProperty("owner", "philippaclaire9");
          expect(body.review).toHaveProperty(
            "created_at",
            "2021-01-18T10:01:41.251Z"
          );
        });
    });
    test("200: response with a board game object with a updated vote this time with 100 votes added", () => {
      const review = { votes: 100 };
      const review_id = 7;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(200)
        .then(({ body }) => {
          expect(body.review.votes).toBe(109);
          expect(body.review).toHaveProperty("review_id", 7);
          expect(body.review).toHaveProperty(
            "title",
            "Mollit elit qui incididunt veniam occaecat cupidatat"
          );
          expect(body.review).toHaveProperty("category", "social deduction");
          expect(body.review).toHaveProperty("designer", "Avery Wunzboogerz");
          expect(body.review).toHaveProperty("owner", "mallionaire");
        });
    });
    test("200: response with a board game object with a updated vote, this time taking away votes", () => {
      const review = { votes: -6 };
      const review_id = 7;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(200)
        .then(({ body }) => {
          expect(body.review.votes).toBe(3);
          expect(body.review).toHaveProperty("review_id", 7);
          expect(body.review).toHaveProperty(
            "title",
            "Mollit elit qui incididunt veniam occaecat cupidatat"
          );
          expect(body.review).toHaveProperty("category", "social deduction");
          expect(body.review).toHaveProperty("designer", "Avery Wunzboogerz");
          expect(body.review).toHaveProperty("owner", "mallionaire");
        });
    });
    test("200: response with a board game object with a updated vote, this time taking away 100 votes and getting a negative vote number.", () => {
      const review = { votes: -100 };
      const review_id = 6;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(200)
        .then(({ body }) => {
          expect(body.review.votes).toBe(-92);
          expect(body.review).toHaveProperty("review_id", 6);
          expect(body.review).toHaveProperty(
            "title",
            "Occaecat consequat officia in quis commodo."
          );
          expect(body.review).toHaveProperty("category", "social deduction");
          expect(body.review).toHaveProperty("designer", "Ollie Tabooger");
          expect(body.review).toHaveProperty("owner", "mallionaire");
        });
    });
    test("ERROR handling... what if the review_id is 9999", () => {
      const review = { votes: 2 };
      const review_id = 9999;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 404,
            msg: "Not Found",
          });
        });
    });
    test("ERROR handling... what if the votes were apples?", () => {
      const review = { votes: "Apples" };
      const review_id = 2;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            msg: "Bad Request",
          });
        });
    });
    test("ERROR handling... what if the votes key is fruit", () => {
      const review = { fruit: "Apples" };
      const review_id = 2;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            msg: "Bad Request",
          });
        });
    });
    test("ERROR handling... oh dear forgot to put something in the review...", () => {
      const review = {};
      const review_id = 2;
      return request(app)
        .patch(`/api/reviews/${review_id}`)
        .send(review)
        .expect(400)
        .then(({ body }) => {
          expect(body).toEqual({
            status: 400,
            msg: "Bad Request",
          });
        });
    });
  });
  describe("4: GET/api/reviews/:review_id now includes a comment_Count", () => {
    test("200: responds with a single matching review", () => {
      const review_id = 2;
      return request(app)
        .get(`/api/reviews/${review_id}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.game).toHaveProperty("review_id", 2);
          expect(body.game).toHaveProperty("title", "Jenga");
          expect(body.game).toHaveProperty(
            "reviewbody",
            "Fiddly fun for all the family"
          );
          expect(body.game).toHaveProperty("designer", "Leslie Scott");
          expect(body.game).toHaveProperty(
            "review_img_url",
            "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png"
          );
          expect(body.game).toHaveProperty("votes", 5);
          expect(body.game).toHaveProperty("category", "dexterity");
          expect(body.game).toHaveProperty("owner", "philippaclaire9");
          expect(body.game).toHaveProperty(
            "created_at",
            "2021-01-18T10:01:41.251Z"
          );
          expect(body.game).toHaveProperty("comment_count", 4); // I hope it was 4
        });
    });
    //next test
  });
  //Head describe DELETE later
});
