import { exec } from "child_process";
import { expect } from "chai";

describe("Build Process", function () {
  this.timeout(60000); // forgiving timeout window for build

  it("should compile the TypeScript project with no errors", (done) => {
    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error("Build Error:\n", stderr || stdout);
      }

      expect(error).to.equal(null);
      done();
    });
  });
});
