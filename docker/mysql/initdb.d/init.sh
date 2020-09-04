#!/bin/sh

echo "CREATE DATABASE IF NOT EXISTS \`test\` ;" | "${mysql[@]}"
echo "GRANT ALL ON \`test\`.* TO '"$MYSQL_USER"'@'%' ;" | "${mysql[@]}"
echo 'FLUSH PRIVILEGES ;' | "${mysql[@]}"
