import {
  createConversation,
  deleteConversation,
  getConversation,
  setConversation,
  getAllConversations,
  changeName,
} from "../models/conversationStorage";

describe("conversationController", () => {
  test("createConversation", async () => {
    const { fileName, content } = await createConversation("testConversation");

    expect(fileName).toBe("testConversation.json");
    expect(content[0].fileName).toBe("testConversation");
  });

  test("getConversation", async () => {
    const conversationData = await getConversation("testConversation.json");

    expect(conversationData[0].fileName).toBe("testConversation");
  });

  test("setConversation", async () => {
    const conversation = [{ fileName: "testConversation", message: "Hello" }];

    await setConversation("testConversation.json", conversation);

    const updatedConversation = await getConversation("testConversation.json");

    expect(updatedConversation[0].message).toBe("Hello");
  });

  test("getAllConversations", async () => {
    const allConversations = await getAllConversations();

    expect(allConversations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fileName: "testConversation.json",
          docname: "testConversation",
        }),
      ])
    );
  });

  test("changeName", async () => {
    await changeName("testConversation.json", "updatedTestConversation");

    const updatedConversation = await getConversation("testConversation.json");

    expect(updatedConversation[0].fileName).toBe("updatedTestConversation");
  });

  test("deleteConversation", async () => {
    await deleteConversation("testConversation.json");

    const deletedConversation = await getConversation("testConversation.json");

    expect(deletedConversation).toBeUndefined();
  });
});
