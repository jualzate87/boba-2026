#!/bin/bash
# Push BOBA 2026 to GitHub
# Usage:
#   ./scripts/push.sh                    # Uses default git credentials
#   GITHUB_TOKEN=xxx ./scripts/push.sh    # Uses token for HTTPS auth

set -e
cd "$(dirname "$0")/.."

REMOTE="origin"
BRANCH="main"

if [ -n "$GITHUB_TOKEN" ]; then
  echo "Using GITHUB_TOKEN for authentication..."
  git push "https://jualzate87:${GITHUB_TOKEN}@github.com/jualzate87/boba-2026.git" "$BRANCH"
else
  echo "Pushing with default git credentials..."
  git push "$REMOTE" "$BRANCH"
fi

echo "Push complete."
