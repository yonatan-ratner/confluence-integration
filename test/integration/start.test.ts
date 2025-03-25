import { spawn, execSync } from "child_process";
import http from "http";
import fs from "fs";
import path from "path";
import { expect } from "chai";

describe("Startup Process", function () {
  this.timeout(15000);

  let serverProcess: ReturnType<typeof spawn>;
  const indexPath = path.resolve(__dirname, "../../dist/index.js");

  before((done) => {
    if (!fs.existsSync(indexPath)) {
      console.log("[startup.test] dist/index.js missing — running build...");
      execSync("npm run build", { stdio: "inherit" });
    }

    serverProcess = spawn("node", [indexPath]);

    serverProcess.stdout?.on("data", (data) => {
      const output = data.toString();
      if (output.includes("Express is listening")) {
        done();
      }
    });

    serverProcess.stderr?.on("data", (data) => {
      console.error("stderr:", data.toString());
    });

    serverProcess.on("error", (err) => {
      done(err);
    });
  });

  it('should respond on "/" route', (done) => {
    http
      .get("http://localhost:3000", (res) => {
        let rawData = "";
        res.on("data", (chunk) => (rawData += chunk));
        res.on("end", () => {
          expect(res.statusCode).to.equal(200);
          expect(rawData).to.include("Yonatans Confluence Integration");
          done();
        });
      })
      .on("error", (err) => {
        done(err);
      });
  });

  after(() => {
    if (serverProcess) {
      serverProcess.kill();
    }
  });
});
