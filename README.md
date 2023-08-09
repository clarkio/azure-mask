<div align="center">
  
# Azure Mask (Az Mask)

[![Known Vulnerabilities](https://snyk.io/test/github/clarkio/azure-mask/badge.svg)](https://snyk.io/test/github/clarkio/azure-mask)
![GitHub](https://img.shields.io/github/license/clarkio/azure-mask)
[![Discord](https://img.shields.io/discord/421902136457035777)](https://discord.gg/xB95beJ)
[![Twitch Status](https://img.shields.io/twitch/status/clarkio)](https://twitch.tv/clarkio)
<br>
[![Twitter Follow](https://img.shields.io/twitter/follow/_clarkio?style=social)](https://twitter.com/intent/follow?screen_name=_clarkio)

</div>

This is a browser extension that will do its best to find and mask GUIDs (such as Subscription IDs), email addresses, keys, and connection strings with a blur. The intention of the extension is to make it easier to do screen recordings without revealing sensitive, personal, account information that may show up on screen. It will only run and apply against Azure portal URLs ([see manifest.json for specifics](https://github.com/clarkio/azure-mask/blob/master/src/manifest.json#L32)). It's available in Chromium based browsers and Firefox.

![screen shot](azure-mask-screen-shot.png)

## Features

* Blurs GUIDs (such as Subscription IDs)
* Blurs your account email
* Hides the "Report a Bug" button (if found)
* Toggle the mask on/off and store this state
* Apply the mask (if enabled) after Document Object Model (DOM) mutations

## Install the Extension

### Chrome / Edge

#### From Chrome Web Store

1. In Chrome go to [Chrome Web Store](https://chrome.google.com/webstore/detail/az-mask/amobeamdmdnloajcaiomgegpakjdiacm)
2. Click on Az Mask extension
3. Click on Add To Chrome
4. Confirm any prompts

#### From Package

1. Go to [Releases](https://github.com/clarkio/azure-mask/releases) and download the latest `.zip` file (e.g. `az-mask-1.1.5.zip
`)
2. Go to the folder you downloaded the zip and extract it.
3. In Chrome go to [chrome://extensions](chrome://extensions)
4. Check the "Developer mode" option in the top-right corner
4. Select the button to load extracted extensions. 
5. Select the folder you created by unpacking in step 2.
6. Confirm any prompts

#### From Source

1 - `git clone git@github.com:clarkio/azure-mask.git`

2a - (Chrome) In Chrome, navigate to `chrome://extensions/`

2b - (Edge) In Edge, navigate to `edge://extensions/`

3a - (Chrome) In Chrome, check the "Developer mode" option in the top-right corner

3b - (Edge) In Edge, enable the "Developer mode" toggle on the bottom-left corner

4 - Click the "Load unpacked extension" button

5 - Navigate to where you cloned this repo and then choose `/azure-mask/src`


After following these steps you should now see the new extension icon in Chrome.

### Firefox

1. In Firefox go to [Az Mask add-on](https://addons.mozilla.org/en-US/firefox/addon/azure-mask/)
2. Click "Add to Firefox"
3. You'll see a pop up notification in the address bar from Firefox. Click "Add"
4. You'll see a confirmation that it was added. Click "Ok"



