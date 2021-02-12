const test = require("tape");
const request = require("supertest");
const express = require("express");
const server = require("../server");
const { json } = require("express");

console.log(process.env.NODE_ENV)

describe("NENT - Tech Trainee code challenge Integration tests\n-----------------------", () => {
    it("Initiate CRUD tests", done => {
        test("POST /api/v1/restaurants/ should add one document", assert => {
            const restaurant = {"opening_hours": ["Monday: 11:00 AM \u2013 3:00 PM", "Tuesday: 11:00 AM \u2013 3:00 PM", "Wednesday: 11:00 AM \u2013 3:00 PM", "Thursday: 11:00 AM \u2013 3:00 PM", "Friday: 11:00 AM \u2013 3:00 PM", "Saturday: Closed", "Sunday: Closed"], "address": "Repslagargatan 8, 118 46 Stockholm, Sweden", "phone_number": "08-641 20 77", "location": {"lat": 59.31781179999999, "lng": 18.0701277}, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png", "name": "Tamarindo", "price_level": 1, "rating": 4.4, "google_maps_url": "https://maps.google.com/?cid=9369167126300605621", "website": "http://www.tamarindo.se/", "photo": "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg"}
            request(server)
            .post("/api/v1/restaurants/")
            .send(restaurant)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("Document added\n-------------------------");
                assert.end();
            });
        });

        test("POST /api/v1/restaurants/multiple/ should add many documents", assert => {
            const restaurant = {"restaurants":[{
                "opening_hours": [
                    "Monday: 8:00 AM \u2013 9:00 PM",
                    "Tuesday: 8:00 AM \u2013 9:00 PM",
                    "Wednesday: 8:00 AM \u2013 9:00 PM",
                    "Thursday: 8:00 AM \u2013 9:00 PM",
                    "Friday: 8:00 AM \u2013 9:00 PM",
                    "Saturday: 9:00 AM \u2013 9:00 PM",
                    "Sunday: 9:00 AM \u2013 9:00 PM"
                ],
                "address": "Brnnkyrkagatan 62, 118 23 Stockholm, Sweden",
                "phone_number": "08-613 36 00",
                "location": {
                    "lat": 59.318825,
                    "lng": 18.0561621
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/shopping-71.png",
                "name": "Paradiset Sdermalm",
                "rating": 4.2,
                "google_maps_url": "https://maps.google.com/?cid=11539250592858637665",
                "website": "http://www.paradiset.com/",
                "photo": "https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg",
            },
            {
                "opening_hours": [
                    "Monday: 11:00 AM \u2013 8:00 PM",
                    "Tuesday: 11:00 AM \u2013 8:00 PM",
                    "Wednesday: 11:00 AM \u2013 8:00 PM",
                    "Thursday: 11:00 AM \u2013 8:00 PM",
                    "Friday: 11:00 AM \u2013 8:00 PM",
                    "Saturday: 12:00 \u2013 8:00 PM",
                    "Sunday: 12:00 \u2013 8:00 PM"
                ],
                "address": "Bllstavgen 36, 168 65 Bromma, Sweden",
                "phone_number": "070-733 11 28",
                "location": {
                    "lat": 59.36073769999999,
                    "lng": 17.9548819
                },
                "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
                "name": "Bun Meat Bun",
                "price_level": 2,
                "rating": 4.3,
                "google_maps_url": "https://maps.google.com/?cid=106830997729029427",
                "website": "http://www.bunmeatbun.se/",
                "photo": "https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg",
            }]}
            request(server)
            .post("/api/v1/restaurants/multiple/")
            .send(restaurant)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("Document added\n-------------------------");
                assert.end();
            });
        });
        
        test("GET /api/v1/restaurants/ should fetch all documents", assert => {
            request(server)
            .get("/api/v1/restaurants/")
            .expect(200)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("Fetched Documents\n-------------------------");
                assert.end();
            });
        });

        test("UPDATE /api/v1/restaurants/0 should update document when document exists", assert => {
            const restaurant = {"opening_hours": ["Monday: 11:00 AM \u2013 3:00 PM", "Tuesday: 11:00 AM \u2013 3:00 PM", "Wednesday: 11:00 AM \u2013 3:00 PM", "Thursday: 11:00 AM \u2013 3:00 PM", "Friday: 11:00 AM \u2013 3:00 PM", "Saturday: Closed", "Sunday: Closed"], "address": "Repslagargatan 8, 118 46 Stockholm, Sweden", "phone_number": "08-641 20 77", "location": {"lat": 59.31781179999999, "lng": 18.0701277}, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png", "name": "Tamarindo", "price_level": 2, "rating": 3.4, "google_maps_url": "https://maps.google.com/?cid=9369167126300605621", "website": "http://www.tamarindo.se/", "photo": "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg", "id": 0}
            request(server)
            .put("/api/v1/restaurants/0")
            .send(restaurant)
            .expect(200)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("Document updated\n-------------------------");
                assert.end();
            });
        });

        test("DELETE /api/v1/restaurants/0 should delete when document exists", assert => {
            request(server)
            .delete("/api/v1/restaurants/0")
            .expect(200)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("Deleted Document\n-------------------------");
                assert.end();
            });
        });

        test("DELETE /api/v1/restaurants/0 should return document not found when document doesn't exists", assert => {
            request(server)
            .delete("/api/v1/restaurants/0")
            .expect(404)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("Document not found for deletion\n-------------------------");
                assert.end();
            });
        });

        test("UPDATE /api/v1/restaurants/0 should return document not found when document doesn't exists", assert => {
            const restaurant = {"opening_hours": ["Monday: 11:00 AM \u2013 3:00 PM", "Tuesday: 11:00 AM \u2013 3:00 PM", "Wednesday: 11:00 AM \u2013 3:00 PM", "Thursday: 11:00 AM \u2013 3:00 PM", "Friday: 11:00 AM \u2013 3:00 PM", "Saturday: Closed", "Sunday: Closed"], "address": "Repslagargatan 8, 118 46 Stockholm, Sweden", "phone_number": "08-641 20 77", "location": {"lat": 59.31781179999999, "lng": 18.0701277}, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png", "name": "Tamarindo", "price_level": 2, "rating": 3.4, "google_maps_url": "https://maps.google.com/?cid=9369167126300605621", "website": "http://www.tamarindo.se/", "photo": "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg", "id": 0}
            request(server)
            .put("/api/v1/restaurants/0")
            .send(restaurant)
            .expect(404)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("Document updated\n-------------------------");
                assert.end();
            });
        });

        test("DELETE /api/v1/restaurants/all should delete all documents", assert => {
            request(server)
            .delete("/api/v1/restaurants/all")
            .expect(200)
            .end((err, res) => {
                if (err) return assert.fail(JSON.stringify(res));
                assert.pass("All documents deleted\n-------------------------");
                assert.end();
                done();
            });
        });
    });
});
