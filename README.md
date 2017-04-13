# Discord Bot  
## Requires:  
* Node.js 6.0 or greater, http://nodejs.org/  
  
## Upon downloading, or cloning  
Search up a tutorial on how to open a terminal in your Operating System.  
Open up the terminal in the directory where you downloaded the folder. (Search up how to if you need to.)  
Type: `npm install`  
Wait. This will install the required modules it needs to run.  
  
In your preferred folder view (Like Windows Explorer, not the browser but the file browser).  
Goto this folder and goto /JSON/ inside of it.  
Rename the file named 'exampleconfig.json' to 'config.json'.  
  
Inside that you will have to do several things. So open it in your favorite text editor. Like notepad.  

### finding your bot token.  
Click New App in https://discordapp.com/developers/applications/me  
Login if you have to.  
Type in a name for the app.  
Type a description, if you want.  
You can also select an app icon, if you want.  
  
![The app page](http://i.imgur.com/r90Vorg.png)  
  
Congrats. You now have an app, but it is still not a bot.  
Press the "Create a Bot User" button. This will make it an actual bot.  
![Create a Bot User button](http://i.imgur.com/LU9mgMK.png)  
  
You will see this: ![App Bot User area](http://i.imgur.com/C8SCoed.png).  
Copy the username, but without anything after the #, and put it in the config file `botName` property.  
Press the click to reveal next to Token.  
Do not show this token to anyone else because they could do a good amount if they got it.  
Copy the token and put it in config.json `botToken` spot.  
That's all you have to do for now.  
Make sure to save the changes.

You can leave `commandsBegin` as the same value, this makes so commands have to be run with that before them.  
    
`channelToWelcomeUserIn` the channel id to welcome the user in.  
To use this you may have to go into your user settings (bottom left cornerish usually).  
Find the option for developers and make so it is checked.  
Right click the channel in the server you want it send messages in.  
Click copy id.  
Put that as the value of `channelToWelcomeUserIn`, but make sure to keep it inside the "".  
  
To actually start the bot!  

https://discordapp.com/oauth2/authorize?client_id=CLIENT_ID_HERE&scope=bot  
Copy that link, and replace CLIENT_ID_HERE with the client ID on your bot page.  

Open up your terminal in the folder and type `node index.js`  
That will run the bot, and it should join.  
  
    
You can change the image with a new one if you want. You may need to change the code in index.js that looks for 'hello.png'.  
In the config file the text x and y are where the text will be placed.  
Change those for the image.