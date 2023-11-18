import { init } from "@/app";
import { cleanDb } from "../integrations/helper";
import { participantsRepository } from "@/repositories";
import { createParticipant } from "../factories";
import { prisma } from "@/database";

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("checkBalance", () => {
  it("should return false if participant doesnt exist", async () => {
    const result = await participantsRepository.checkBalance(-1, 50);

    expect(result).toBe(false);
  });
  it("should return false if participant has insufficient balance", async () => {
    const participant = await createParticipant();
    const requiredBalance = participant.balance + 1;

    const result = await participantsRepository.checkBalance(
      participant.id,
      requiredBalance
    );

    expect(result).toBe(false);
  });
  it("should return true if participant has enough balance with the correct participant ID", async () => {
    const participant = await createParticipant();

    const findUniqueSpy = jest.spyOn(prisma.participant, "findUnique");

    const result = await participantsRepository.checkBalance(
      participant.id,
      participant.balance
    );

    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: { id: participant.id },
    });
    expect(result).toBe(true);

    findUniqueSpy.mockRestore();
  });
});

describe("reduceBalance", () => {
  it("should decrement participant balance correctly", async () => {
    const participant = await createParticipant();

    const reductionAmount = participant.balance;
    await participantsRepository.reduceBalance(participant.id, reductionAmount);

    const updatedParticipant = await prisma.participant.findUnique({
      where: { id: participant.id },
    });

    expect(updatedParticipant?.balance).toBe(0);
  });
});

describe("updateWinner", () => {
  it("should increment participant balance correctly", async () => {
    const participant = await createParticipant();
    const initialBalance = participant.balance;

    const reductionAmount = participant.balance;
    await participantsRepository.updateWinner(participant.id, reductionAmount);

    const updatedParticipant = await prisma.participant.findUnique({
      where: { id: participant.id },
    });

    expect(updatedParticipant?.balance).toBe(initialBalance * 2);
  });
});
