#!/bin/bash

REPLACE="__PROJECT__"
PROJECT=$1

grep -lRZ $REPLACE --exclude=./scripts/setup.sh | xargs sed -ie "s/${REPLACE}/${PROJECT}/g"
rm -f **/*one

printf "\n\nSetup complete for $PROJECT!\nYou can create your first commit now.\n\n"
# rm -rf scripts
