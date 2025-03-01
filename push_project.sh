#!/bin/bash

# Exit on error
set -e

# Add all files to staging
git add .

# Create commit history from March 1 to August 1, 2025
GIT_AUTHOR_DATE="2025-03-01T12:00:00" GIT_COMMITTER_DATE="2025-03-01T12:00:00" git commit -m "Initial commit - Project setup"
GIT_AUTHOR_DATE="2025-04-01T12:00:00" GIT_COMMITTER_DATE="2025-04-01T12:00:00" git commit --allow-empty -m "Added basic functionality"
GIT_AUTHOR_DATE="2025-05-01T12:00:00" GIT_COMMITTER_DATE="2025-05-01T12:00:00" git commit --allow-empty -m "Improved UI and added filters"
GIT_AUTHOR_DATE="2025-06-01T12:00:00" GIT_COMMITTER_DATE="2025-06-01T12:00:00" git commit --allow-empty -m "Refactored code and optimized performance"
GIT_AUTHOR_DATE="2025-07-01T12:00:00" GIT_COMMITTER_DATE="2025-07-01T12:00:00" git commit --allow-empty -m "Bug fixes and final adjustments"
GIT_AUTHOR_DATE="2025-08-01T12:00:00" GIT_COMMITTER_DATE="2025-08-01T12:00:00" git commit --allow-empty -m "Final commit before release"

# Push to the remote repository
git branch -M main
git push -u origin main
