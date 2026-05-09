#!/bin/bash
export DATABASE_URL="file:/tmp/temp.db"
yarn db:migrate:deploy
yarn db:generate
yarn build
rm /tmp/temp.db
