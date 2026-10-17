import { describe, expect, it } from "vitest";
import { findDeeplinkArg, parseDeeplink } from "./deeplink";

describe("parseDeeplink", () => {
  it("accepts real share targets", () => {
    expect(parseDeeplink("ocean://artist?id=UCGtGpOIGHfRu1KYL9pi-mNQ")).toEqual({
      type: "artist",
      id: "UCGtGpOIGHfRu1KYL9pi-mNQ",
    });
    expect(parseDeeplink("ocean://album?id=MPREb_xCxkOKReFZv")).toEqual({
      type: "album",
      id: "MPREb_xCxkOKReFZv",
    });
    expect(
      parseDeeplink("ocean://playlist?id=VLPLD8jNKEyHYB2DHh5vXSI4USLFo29vzUYl"),
    ).toEqual({ type: "playlist", id: "VLPLD8jNKEyHYB2DHh5vXSI4USLFo29vzUYl" });
    expect(parseDeeplink("ocean://track?id=RGdkabupfPI")).toEqual({
      type: "track",
      id: "RGdkabupfPI",
    });
  });

  it("rejects smuggled urls", () => {
    expect(parseDeeplink("https://evil.com")).toBeNull();
    expect(parseDeeplink("javascript:alert(1)")).toBeNull();
    expect(parseDeeplink("ocean://artist?id=UCaaaaaaaaaaaaaaaaaaaaaa&x=1&y=2")).toEqual({
      type: "artist",
      id: "UCaaaaaaaaaaaaaaaaaaaaaa",
    });
    expect(
      parseDeeplink("ocean://artist?id=UCaaaaaaaaaaaaaaaaaaaaaa&id=UCbbbbbbbbbbbbbbbbbbbbbb"),
    ).toBeNull();
    expect(parseDeeplink("ocean://artist")).toBeNull();
    expect(parseDeeplink("ocean://evil?id=RGdkabupfPI")).toBeNull();
    expect(parseDeeplink("ocean://track?id=RGdkabupfPIextra")).toBeNull();
    expect(parseDeeplink("ocean://artist?id=ABaaaaaaaaaaaaaaaaaaaaaa")).toBeNull();
    expect(parseDeeplink("ocean://artist?id=UCaaa/../../../../etc")).toBeNull();
    expect(parseDeeplink("not a url")).toBeNull();
  });

  it("finds the deeplink arg anywhere in argv", () => {
    expect(
      findDeeplinkArg(["/usr/bin/ocean", "ocean://track?id=RGdkabupfPI"]),
    ).toBe("ocean://track?id=RGdkabupfPI");
    expect(findDeeplinkArg(["/usr/bin/ocean", "--no-sandbox"])).toBeUndefined();
  });
});
