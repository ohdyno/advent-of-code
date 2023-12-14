#!/bin/sh
find . -name "*.sql" -type f -exec sh -c "npx sql-formatter -c sql-formatter.config.json --fix {}" \;