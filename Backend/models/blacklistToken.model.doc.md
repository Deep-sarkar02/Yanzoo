# Blacklist Token Model Documentation (`blacklistToken.model.js`)

## Overview
This file is used for **Security (Logout)**.

## How it works
- When a user or captain logs out, their current Token (ID card) is still technically valid until it expires (24 hours).
- To prevent them from using it again, we save that specific token in this "Blacklist".
- Our `authMiddleware` checks this list. If a token is found here, it is rejected even if the date is valid.

## Schema Fields

- **token**: The JWT string to ban.
- **createdAt**: When it was added.
- **expires**: 86400 seconds (24h). This is a "TTL" (Time To Live) index. MongoDB automatically deletes the record after 24 hours (because the token itself would be expired by then anyway, so we don't need to block it anymore).
