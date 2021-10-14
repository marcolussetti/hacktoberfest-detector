# hacktoberfest-optin-checker

A very, very simple and very, very dumb Firefox Add-On to check whether a repository in GitHub is opted-in to the hacktoberfest tag.

It works by querying the GitHub API, so you do need to generate and use an API key for yourself.

## Installation

Download from https://github.com/marcolussetti/hacktoberfest-optin-checker/releases/download/1.1.0/hacktoberfest_opt_in_checker-1.1.0-an+fx.xpi

Install from Menu -> Add-ons and Themes -> Extension in the left bar -> Gear wheel -> Install from file

And "enjoy" :)

## Usage

Open the settings for the addon and put in your GitHub Username and a GitHub Token (Personal Access Token). This is saved to your browser settings.

The token can be generated on GitHub from Settings -> Developer Settings -> Personal Access Tokens. No permissions should be enabled for this token.

Once this is done, you can press CTRL-H on any GitHub page to determine if the project falls in within the Hacktoberfest scope.

## License

MIT
