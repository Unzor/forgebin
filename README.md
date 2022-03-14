# ForgeBin
An automation tool for building and releasing projects, written in JavaScript.
# Progress
Finished (working)

#### [Link](https://forgebin.js.org/), [setup](https://forgebin.js.org/automation.html)

# Description
## ForgeBin
A tool for releasing your app however and whenever you want, automatically.
## What is ForgeBin actually for?
ForgeBin is a tool for automatically building tools and creating releases on GitHub. When it is time, it will run the requested commands to build the tool then export the files to a release.
## How do I use my own project for building?
To set up ForgeBin, you have to:
- Create a GitHub repository and write code
- Make a file named "Forgefile" in the repo and list the build commands and files to export
- Create a new, empty release (call it Base Release just for the adknowledgement)
- Visit the site
- Click the "Set Up" button
- Create and input your Auth token for GitHub
- Input the repository
- Input how often the tool should be built (minimum every hour)
- Check the Build Now box to build at once
- Click "Build" button (warning: you can't disable automation!)
