#!/bin/bash
cd /home/kavia/workspace/code-generation/figma-link-preview-5530-6458/figma_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

