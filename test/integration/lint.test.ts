import { exec } from "child_process";
import { expect } from "chai";

describe("ESLint Compliance", function () {
  this.timeout(10000); // in case eslint takes a second

  it("should pass linting with no errors or warnings", (done) => {
    exec("npm run lint", (error, stdout, stderr) => {
      if (error) {
        console.error("ESLint output:\n", stdout || stderr);
      }
      expect(error).to.equal(null);
      done();
    });
  });
});
