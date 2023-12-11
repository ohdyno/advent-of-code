#!/bin/sh
cat fun.sql | npx sql-formatter -c sql-formatter.config.json -o fun.sql
