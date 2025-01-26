#!/bin/zsh
PROJECT_NAME=$1
if [ "$#" -eq 1 ]; then
  if [ ! -e $PROJECT_NAME ]; then
    yarn create vite $PROJECT_NAME -t react-swc-ts
    (cd $PROJECT_NAME/src && rm -r assets App.css App.tsx index.css && touch App.tsx && touch styles.css && sed -i -e "s/index.css/styles.css/" main.tsx)
  fi
  (cd $PROJECT_NAME && yarn && yarn dev)
else
  echo "引数は1つです(プロジェクト名を入力)"
fi
