const { exec } = require("child_process");

exec("java encrypt.java \"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\" \"this is a key\" \"and this is an iv key\"", function (err, stdout, stderr) {
    console.log(stdout + "\n\n" + stderr);
});