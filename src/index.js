var child_process = require("child_process");
var {
    Octoveal
} = require("./octoveal");
const express = require('express');
var forgefile = require("./forgefile");
var version_parser = require("./version_parser");

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express app!')
});

app.post("/api/new_automation", function(req, res) {
    var octoveal = new Octoveal({
        auth: req.body.auth,
        repo: req.body.repo.split("/").pop(),
        owner: req.body.repo.split("/").shift()
    });
    console.log(req.body.repo.split("/").pop());
    child_process.spawnSync("git clone git://github.com/" + req.body.repo + ".git", {
        shell: true,
        stdio: "inherit"
    });
    var parsed = forgefile.parse(req.body.repo.split("/").pop() + "/Forgefile");
    parsed.build_commands.forEach(async function(c, i) {
        child_process.spawnSync("cd " + req.body.repo.split("/").pop() + " && " + c, {
            shell: true,
            stdio: "inherit"
        });
        if (i == parsed.build_commands.length - 1) {
            var current_release = await octoveal.getLatestRelease();
            current_release = current_release.data.tag_name;
            var parsed_ver = version_parser.parse_array(current_release);
            parsed_ver[parsed_ver.length - 1] = parsed_ver[parsed_ver.length - 1] + 1;
            var new_ver = "v" + parsed_ver.join(".");
            console.log(new_ver);
            await octoveal.createRelease(new_ver);
            parsed.exports.forEach(async function(_export, index) {
                await octoveal.addAssetToRelease(new_ver, req.body.repo.split("/").pop() + "/" + _export); // PART TO FIX
            })
        };
    });
    setInterval(function() {
    // UNFINISHED!!
    }, req.body.time);
})

app.listen(3100, () => {
    console.log('server started');
});
