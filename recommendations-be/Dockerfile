FROM python:3.10-alpine

ENV PYTHONUNBUFFERED 1

EXPOSE 8000

RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

WORKDIR /app

COPY requirements.txt ./
RUN pip install -r requirements.txt

COPY . ./
