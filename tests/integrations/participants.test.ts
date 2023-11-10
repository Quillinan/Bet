import app, { init } from "@/app";
import { cleanDb } from "./helper";
import supertest from "supertest";
import httpStatus from "http-status";
import { createParticipant } from "../factories";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /participant", () => {
  it("should respond with status 404 when dont exist participants", async () => {
    const response = await server.get("/participants");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });
  it("should respond with status 200 and contain the participant when participants exist", async () => {
    const participant = await createParticipant();
    const response = await server.get("/participants");

    expect(response.status).toBe(httpStatus.OK);

    expect(response.body).toEqual([
      {
        id: participant.id,
        name: participant.name,
        balance: participant.balance,
        createdAt: participant.createdAt.toISOString(),
        updatedAt: participant.updatedAt.toISOString(),
      },
    ]);
  });
});
