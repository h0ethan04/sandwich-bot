
# Banh Mi's Discord Mod

## Some context:

On January 10th, 2024, at the beginning of the winter quarter of my sophomore year in college, disaster struck.
For unknown reasons the entirity of the UCI Discord server network was set upon by raiders, who entered the school servers to spam gore images. 
Thousands of students were impacted; the initial strike was in the UCI general server, which has approximately 12,000 students in it.
From there, they spread to some of the major servers, including one of the course servers that I was a part of.
I witnessed firsthand the gore that was sent; I tried to fight back by spamming messages to push the gore out of frame for my peers,
but them seeing it was inevitable. I was but a single student, trying to fend off multiple raiders across several text channels.
I did my best to warn my classmates and prevent them from seeing anything until the server was deleted by the owner.

This incident hit me particularly hard because I own and moderate several course servers for other students in the school of ICS.
Luckily, thanks to some quick action from Alina (an alumni and moderator of several major UCI servers), a response team was assembled.
Together, we worked against the raiders -- while some of the more experience students developed a bot that could mass ban raiders to protect the servers,
others, including myself, worked as part of the response team, gathering evidence and running interference whenever the raiders struck.
Our goal was to reduce the number of students who saw the gore, in any way possible, even if some of us ended seeing more as a result.
Secondary to that was retrieving evidence of the atrocitious scenes, in hopes of getting the help of law enforcement or our administration.

It was around early morning of January 12th that we started running out of space for our bot. 
I volunteered to remove it from my servers, and in its place I began to write this one.
This bot, my first discord bot, detects images and embeds sent in the server, copies them into a message, and posts the message in a private channel
so that I can personally review the messages -- as such it can be used to help ensure academic integrity as well as to detect when the raiders
enter my server to post gore.

Though this is far from the level of bots that are used by many major servers, this bot is special to me because it was the first real project I've needed to do.
This was the first project where a deadline was all the more real, where I am fighting the clock to learn the discord.js api, to learn JavaScript.
Although it was created in circumstances that are far from ideal, hopefully, in the case of a raid, it allows me to quickly respond and protect the ~1000
students that I am responsible for, as the owner of their course servers.

## About the bot
This bot is writtin in JavaScript, and uses Node.js as a template. 
The primary functionality is to provide the server admins a method to ban users based on the images or file attachments sent.
I am currently hosting this bot on a server, where it runs 24/7. 
