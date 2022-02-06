import React from "react";
import * as redux from "react-redux";
import { renderWithStore, fireEvent } from "test-utils";

import * as gameSlice from "client/features/game";
import { useKeyPress } from "client/hooks/useKeyPress";

const Wrapper = ({ id }: { id: string }): null => {
  useKeyPress({ id });
  return null;
};

describe("useKeyPress hook", () => {
  let useDispatchSpy: any;
  let sendKeyPressSpy: Function;
  let gameId: string;

  beforeEach(() => {
    useDispatchSpy = jest
      .spyOn(redux, "useDispatch")
      .mockImplementation(() => (f) => f);
    // @ts-ignore
    sendKeyPressSpy = jest.spyOn(gameSlice, "sendKeyPress");

    gameId = "123";
    renderWithStore(<Wrapper id={gameId} />, {});
  });

  afterEach(() => jest.restoreAllMocks());

  it("calls action callback when alphabet key is pressed", async () => {
    fireEvent.keyPress(window, { key: "c" });

    expect(await useDispatchSpy).toHaveBeenCalled();
    expect(await sendKeyPressSpy).toHaveBeenCalledWith({ gameId, key: "c" });
  });

  it("calls action callback on case insensitive basis", async () => {
    fireEvent.keyPress(window, { key: "C" });

    expect(await useDispatchSpy).toHaveBeenCalled();
    expect(await sendKeyPressSpy).toHaveBeenCalledWith({ gameId, key: "c" });
  });

  it("does not call action callback when other than alphabet key is pressed", async () => {
    fireEvent.keyPress(window, { key: "1" });

    expect(await useDispatchSpy).toHaveBeenCalled();
    expect(await sendKeyPressSpy).not.toHaveBeenCalled();
  });
});
