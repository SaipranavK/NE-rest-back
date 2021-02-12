const test = require("tape");
const request = require("supertest");
const express = require("express");
const db = require("../models/restaurants");
const server = require("../server");
const { json } = require("express");

describe("NENT - Tech Trainee code challenge Integration tests\n-----------------------", () => {
    it("Initiates CRUD tests", done => {
        
        test("POST /api/v1/restaurants/ should add one document", assert => {
            const restaurant = {"opening_hours": ["Monday: 11:00 AM \u2013 3:00 PM", "Tuesday: 11:00 AM \u2013 3:00 PM", "Wednesday: 11:00 AM \u2013 3:00 PM", "Thursday: 11:00 AM \u2013 3:00 PM", "Friday: 11:00 AM \u2013 3:00 PM", "Saturday: Closed", "Sunday: Closed"], "address": "Repslagargatan 8, 118 46 Stockholm, Sweden", "phone_number": "08-641 20 77", "location": {"lat": 59.31781179999999, "lng": 18.0701277}, "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png", "name": "Tamarindo", "price_level": 1, "rating": 4.4, "google_maps_url": "https://maps.google.com/?cid=9369167126300605621", "website": "http://www.tamarindo.se/", "photo": "https://cdn.pixabay.com/photo/2016/11/18/22/21/architecture-1837150_1280.jpg", "id": 0}
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
                done();
            });
        });
    });
});
