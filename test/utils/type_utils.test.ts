import { expect } from "chai";
import { createUrlParamsFromCustomType } from "../../src/utils/typeUtils";

describe("createUrlParamsFromCustomType", () => {
  it("should convert a simple object to URL params", () => {
    const input = { name: "Yonatan", role: "dev" };
    const result = createUrlParamsFromCustomType(input);
    expect(result).to.include("name=Yonatan");
    expect(result).to.include("role=dev");
  });

  it("should handle empty objects correctly", () => {
    const result = createUrlParamsFromCustomType({});
    expect(result).to.equal("");
  });

  it("should throw when input is not an object", () => {
    expect(() => createUrlParamsFromCustomType("notAnObject")).to.throw();
    expect(() => createUrlParamsFromCustomType(42)).to.throw();
    expect(() => createUrlParamsFromCustomType(null)).to.throw();
    expect(() => createUrlParamsFromCustomType(undefined)).to.throw();
  });
});
