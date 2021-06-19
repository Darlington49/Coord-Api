// const util = require("util");
// const exec = util.promisify(require("child_process").exec);

// async function main() {
//   firmware_link = "blink.bin";
//   ftdi_link = "debug/ftdi_ft2322.cfg";
//   mcu_module = "debug/esp-wroom-32.cfg";
//   final_cmd = `openocd -f  ${ftdi_link} -f ${mcu_module} -c "program_esp32 ${firmware_link} 0x10000  verify exit;reset;shutdown;"`;

//   const { error, stdout, stderr } = await exec(final_cmd);
//   //   if (error) {
//   //     // console.log(`error: ${error.message}`);
//   //     //status = "failed";
//   //     log = error.message;
//   //     //log = stderr;
//   //     console.log(`_____________log:_______________\n ${log}`);
//   //     n = log.includes("** Programming Finished **");
//   //     console.log(">>>>>>>>>>>>>>>>>>>>>>>" + n + "<<<<<<<<<<<<<<<<");
//   //     n ? (status = "flashed") : (status = "failed");

//   //     if (status === "failed") {
//   //       if (log.includes("Error: unable to open ftdi device"))
//   //         rootcause = "Debuger";
//   //       if (
//   //         log.includes("Error: JTAG scan chain interrogation failed: all zeroes")
//   //       )
//   //         rootcause = "ESP";
//   //     } else rootcause = "";
//   //     console.log("error status:\t", status);
//   //     console.log("error rootcause:\t", rootcause);
//   //     return;
//   //   }
//   if (stderr) {
//     // console.log(`stderr: ${stderr}`);
//     log = stderr;
//     console.log(`_____________log:_______________\n ${log}`);
//     n = log.includes("** Programming Finished **");

//     n ? (status = "flashed") : (status = "failed");
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>" + n + "<<<<<<<<<<<<<<<<");
//     console.log(">>>>>>>>>>>>>>>>>>>>>>>" + status + "<<<<<<<<<<<<<<<<");
//     if (status === "failed") {
//       if (log.includes("Error: unable to open ftdi device"))
//         rootcause = "Debuger";
//       if (
//         log.includes("Error: JTAG scan chain interrogation failed: all zeroes")
//       )
//         rootcause = "ESP";
//     } else if (status === "flashed") {
//       rootcause = "";
//     }
//     console.log("stderr status:\t", status);
//     console.log("stderr rootcause:\t", rootcause);
//   }
//   //   console.log(`Number of files ${stdout}`);
//   //   return stdout;
//   return 1;
// }

// // main()
// main()
//   .then((x) => {
//     console.log(x);
//   })
//   .catch((err) => console.log(err));

firmware_link = "blink.bin";
ftdi_link = "debug/ftdi_ft2322.cfg";
mcu_module = "debug/esp-wroom-32.cfg";
final_cmd = `openocd -f  ${ftdi_link} -f ${mcu_module} -c "program_esp32 ${firmware_link} 0x10000  verify exit;reset;shutdown;"`;

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
async function execShellCommand(cmd) {
  const exec = require("child_process").exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

const javaInfo = await execShellCommand("java -version");
console.log(javaInfo);
/* Prints out:
java version "1.6.0_27"
Java(TM) 2 Runtime Environment, Standard Edition (build 1.6.0_27-b07)
Java HotSpot(TM) Client VM (build 1.6.0_27-b13, mixed mode, sharing)
*/
