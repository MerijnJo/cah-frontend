FROM ubuntu:latest
LABEL authors="Merijn Jonkers"

ENTRYPOINT ["top", "-b"]