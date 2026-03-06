# API Contract: Monitoring Endpoint

**Date**: 2026-03-06 | **Branch**: 001-hans-republic-portfolio

## Overview

Internal API endpoint for retrieving monitoring status data. Used by the monitoring dashboard to display real-time status of all digital properties.

---

## Endpoint: GET /api/monitoring

### Request

**Headers**:
| Header | Required | Description |
|--------|----------|-------------|
| Authorization | Yes | Basic auth credentials |

**Query Parameters**: None

### Response

**Success Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "bitkraft-main",
        "brandId": "bitkraft-studio",
        "brandName": "Bitkraft Studio",
        "name": "Bitkraft Studio Website",
        "url": "https://bitkraft.studio",
        "type": "website",
        "status": "online",
        "lastChecked": "2026-03-06T16:00:00Z",
        "responseTime": 245
      }
    ],
    "summary": {
      "total": 10,
      "online": 8,
      "offline": 1,
      "unknown": 1
    },
    "lastUpdated": "2026-03-06T16:10:00Z"
  }
}
```

### Error Responses

**401 Unauthorized**:

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing credentials"
  }
}
```

**500 Internal Server Error**:

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "Failed to fetch monitoring data"
  }
}
```

---

## Data Types

### PropertyStatus

| Value     | Description                    |
| --------- | ------------------------------ |
| `online`  | Property responding normally   |
| `offline` | Property not responding        |
| `unknown` | Status unable to be determined |

### Summary

| Field     | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| `total`   | number | Total properties monitored     |
| `online`  | number | Properties with online status  |
| `offline` | number | Properties with offline status |
| `unknown` | number | Properties with unknown status |

---

## Authentication

Uses Basic Authentication with credentials stored in environment variables:

| Variable              | Description         |
| --------------------- | ------------------- |
| `MONITORING_USERNAME` | Basic auth username |
| `MONITORING_PASSWORD` | Basic auth password |

Implementation via Next.js Middleware:

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (!authHeader) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (
    username !== process.env.MONITORING_USERNAME ||
    password !== process.env.MONITORING_PASSWORD
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/monitoring/:path*",
};
```

---

## Rate Limiting

Not currently implemented. Future enhancement may include rate limiting for the monitoring API.
