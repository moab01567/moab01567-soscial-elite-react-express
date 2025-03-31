import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { ReactionFeature } from "../features/reaction/ReactionFeature";
import { APIUsers, EAuthority, ELoginType } from "../../../shared/interface";
import * as reactionService from "../features/reaction/ReactionService";
import {
  APIReactionAndUser,
  APIReactionCounter,
  ReactionsEmoji,
} from "../../../shared/ReactionsInterfaceAndEnum";

const user: APIUsers = {
  userId: "1",
  authority: EAuthority.publisher,
  name: "fist",
  picture: "http://test.no",
  loginType: ELoginType.github,
  email: "",
};
const reactions: APIReactionAndUser[] = [
  {
    user: user,
    reaction: {
      reactionId: "1",
      articleId: "1",
      reactionEmoji: ReactionsEmoji.HART,
      userId: user.userId,
      timeStamp: Date.now().toLocaleString(),
    },
  },
];
const reactionCounter: APIReactionCounter = {
  articleId: "1",
  reaction: {
    [ReactionsEmoji.HART]: 1,
    [ReactionsEmoji.LAUGHING]: 0,
    [ReactionsEmoji.THUMBS_UP]: 0,
  },
};
describe("ReactionFeature", () => {
  test("Rendering with one reaction", async () => {
    //Arrange
    const getReactionInfoSpy = vi.spyOn(reactionService, "getReactionInfo");
    getReactionInfoSpy.mockResolvedValue([reactions, reactionCounter]);
    //Act
    render(<ReactionFeature user={user} articleId={"1"} />);

    //Assert
    await waitFor(() => {
      expect(screen.getByText("❤️1")).toBeDefined();
    });
  });
  test("Rendering and remove reaction", async () => {
    //Arrange
    const getReactionInfoSpy = vi.spyOn(reactionService, "getReactionInfo");
    getReactionInfoSpy.mockResolvedValue([reactions, reactionCounter]);
    const PUTEReactionSpy = vi.spyOn(reactionService, "PUTEReaction");
    PUTEReactionSpy.mockImplementation(
      // @ts-ignore
      async (reactionId: string, reactionsEmoji: ReactionsEmoji) => {
        reactions[0].reaction.reactionEmoji = reactionsEmoji;
        reactionCounter.reaction[reactionsEmoji] = 1;
      },
    );
    //Act
    render(<ReactionFeature user={user} articleId={"1"} />);
    await waitFor(() => {
      screen.getByText("❤️1");
    });
    fireEvent.click(screen.getByText("❤️1"));
    fireEvent.click(screen.getByText("👍"));

    //Assert
    await waitFor(() => {
      expect(screen.getByText("👍1")).toBeDefined();
    });
  });
});
