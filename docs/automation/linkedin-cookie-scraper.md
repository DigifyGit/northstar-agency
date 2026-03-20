# LinkedIn Cookie Scraper — Setup Guide

## Overview
Playwright-based LinkedIn job scraper running in GitHub Actions using authenticated session state.

## Setup (one-time)

### 1. Export your LinkedIn session cookies
- Log into LinkedIn in any browser
- Export your full storage state as JSON (cookies + localStorage)
- The JSON must have this structure:
  ```json
  {
    "cookies": [ ... ],
    "origins": [ ... ]
  }
  ```
