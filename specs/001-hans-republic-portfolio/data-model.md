# Data Model: Hans Republic Corporate Portfolio & Monitoring Dashboard

**Date**: 2026-03-06 | **Branch**: 001-hans-republic-portfolio

## Entities

### Brand

Represents each Hans Republic subsidiary brand.

| Field         | Type              | Required | Description                           |
| ------------- | ----------------- | -------- | ------------------------------------- |
| `id`          | string            | Yes      | Unique identifier (kebab-case slug)   |
| `name`        | string            | Yes      | Display name                          |
| `tagline`     | string            | No       | Short tagline (max 100 chars)         |
| `description` | string            | Yes      | Full description (markdown supported) |
| `logo`        | string            | No       | Path to logo image in public folder   |
| `services`    | ServiceCategory[] | Yes      | Array of service categories           |
| `websiteUrl`  | string            | No       | External website URL                  |
| `order`       | number            | Yes      | Display order in listings             |

**Validation Rules**:

- `id`: Must be kebab-case, 2-50 characters
- `name`: Must be 2-100 characters
- `description`: Must be 10-5000 characters
- `websiteUrl`: Must be valid URL or empty
- `order`: Must be non-negative integer

---

### ServiceCategory

The type of services offered by each brand.

| Value                 | Description                          |
| --------------------- | ------------------------------------ |
| `web-development`     | WordPress and custom web development |
| `digital-marketing`   | SEO, social media, advertising       |
| `affiliate-marketing` | Affiliate program management         |
| `e-commerce`          | Online store and digital products    |
| `media`               | Content creation and publishing      |

---

### DigitalProperty

A website or application belonging to a brand that needs to be monitored.

| Field          | Type             | Required | Description                           |
| -------------- | ---------------- | -------- | ------------------------------------- |
| `id`           | string           | Yes      | Unique identifier                     |
| `brandId`      | string           | Yes      | Reference to Brand.id                 |
| `name`         | string           | Yes      | Display name for the property         |
| `url`          | string           | Yes      | Full URL to check                     |
| `type`         | PropertyType     | Yes      | Type of property                      |
| `status`       | MonitorStatus    | Yes      | Current monitoring status             |
| `lastChecked`  | ISO8601 DateTime | Yes      | Last check timestamp                  |
| `responseTime` | number           | No       | Response time in milliseconds         |
| `isPublic`     | boolean          | Yes      | Whether visible in public brand pages |
| `monitorId`    | string           | No       | UptimeRobot monitor ID                |

**Validation Rules**:

- `id`: Must be kebab-case, 2-50 characters
- `brandId`: Must reference existing Brand.id
- `url`: Must be valid HTTPS URL
- `responseTime`: Must be non-negative if provided

---

### PropertyType

The type of digital property.

| Value     | Description     |
| --------- | --------------- |
| `website` | Public website  |
| `webapp`  | Web application |
| `api`     | API endpoint    |

---

### MonitorStatus

The health state of a digital property.

| Value     | Description         | Color Indicator |
| --------- | ------------------- | --------------- |
| `online`  | Responding normally | Green           |
| `offline` | Not responding      | Red             |
| `unknown` | Unable to verify    | Gray            |

---

## Data Files

### brands.json

```json
{
  "brands": [
    {
      "id": "bitkraft-studio",
      "name": "Bitkraft Studio",
      "tagline": "Premium WordPress Development",
      "description": "Bitkraft Studio specializes in custom WordPress development...",
      "image": "https://example.com/bitkraft.jpg",
      "services": ["web-development"],
      "websiteUrl": "https://bitkraft.studio",
      "order": 1
    }
  ]
}
```

### properties.yaml

```yaml
properties:
  - id: bitkraft-main
    brandId: bitkraft-studio
    name: Bitkraft Studio Website
    url: https://bitkraft.studio
    type: website
    status: online
    lastChecked: "2026-03-06T00:00:00Z"
    responseTime: 150
    isPublic: true
```

---

## State Transitions

### Monitor Status Flow

```
Unknown → Online (successful check)
Unknown → Offline (failed check)
Online → Offline (failed check)
Offline → Online (successful check)
```

---

## Relationships

```
Brand (1) ──┬── (N) DigitalProperty
            │
            └── (N) ServiceCategory
```

- Each Brand can have multiple DigitalProperty entries
- ServiceCategory is an enum, not a separate entity
