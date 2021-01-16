FROM node:lts-buster

RUN apt install -y ffmpeg

WORKDIR /home/discord-bot