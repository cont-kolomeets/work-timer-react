import { issueNumberFromLink } from "../stringUtil";

describe("stringUtil", () => {
    it("issueNumberFromLink", () => {
        expect(issueNumberFromLink("1245")).toBe("#1245");
        expect(issueNumberFromLink("Issue: 1245")).toBe("#1245");
        expect(issueNumberFromLink("Issue")).toBe("Issue");
    });
});