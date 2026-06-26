# Payment Integration — Architecture & Implementation Blueprint

**Project:** IBT Solutions + IslandHub — Unified Payment System
**Date:** 2026-06-02
**Lead Architect:** OWL (AI Architect Agent)
**Status:** Blueprint — Ready for Review
**Scope:** ALL platform entities — IslandHub vendors, IBT service providers, co-op members, delivery drivers

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [System Architecture Diagram Description](#2-system-architecture-diagram-description)
3. [Payment Gateway Evaluation Matrix](#3-payment-gateway-evaluation-matrix)
4. [Database Schema](#4-database-schema)
5. [Security & Compliance Plan](#5-security--compliance-plan)
6. [Implementation Phases](#6-implementation-phases)

---

## 1. Executive Summary

### 1.1 Problem Statement
The entire IBT ecosystem (IslandHub marketplace, IBT Solutions services, and the Co-operative Federation) needs a unified payment system. Every entity on the platform must be able to accept in-person payments — via NFC Tap-to-Pay or Dynamic QR codes — using only their smartphone. All payouts flow through a single settlement account at St. Kitts-Nevis-Anguilla National Bank, with automatic distribution to each entity.

### 1.2 Entities Requiring Payment Acceptance

| Entity | Platform | Payment Method | Terminal Type | Settlement Model |
|--------|----------|----------------|---------------|------------------|
| **IslandHub Vendors** | IslandHub marketplace | NFC Tap + Dynamic QR | Fygaro Sub-Account | Net after fees → vendor bank |
| **IBT Service Providers** | IBT Solutions | NFC Tap + Dynamic QR | Fygaro Sub-Account | Net after fees → provider bank |
| **Co-op Members** | Co-operative Federation | NFC Tap + Dynamic QR | Fygaro Sub-Account | Net after fees → co-op bank |
| **Delivery Drivers** | IslandHub / IBT | NFC Tap + Dynamic QR (on-the-go) | Fygaro Payment Link | Net after fees → driver bank |
| **Tour Operators** | Tour Hub | NFC Tap + Dynamic QR | Fygaro Sub-Account | Net after fees → operator bank |

### 1.3 Solution Overview
A hybrid architecture pairing an open-source platform layer (marketplace, service portal, co-op management, fleet dispatch — all built into the existing IBT/IslandHub platform) with a certified, Caribbean-compatible payment gateway API. Raw card data **never** touches our servers — all payment data is tokenized by the gateway.

### 1.3 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Gateway | Fygaro vPOS (primary) | Caribbean-focused, supports sub-terminals, webhook-driven settlement |
| Alternative | First Atlantic Commerce | Regional backup with SKN bank compatibility |
| Card Data Handling | Tokenization only (no raw card data) | Keeps us out of PCI-DSS Level 1 scope |
| Mobile Payment Methods | NFC Tap-to-Pay + Dynamic QR | Zero external hardware required |
| Payout Model | Centralized (IBT account → sub-payouts) | Single settlement account, internal ledger for vendor/driver splits |
| Platform Integration | REST API + Webhooks | Real-time transaction status, async settlement notifications |

### 1.4 Local Banking Parameters

| Parameter | Value |
|-----------|-------|
| Settlement Bank | St. Kitts-Nevis-Anguilla National Bank |
| Country | St. Kitts and Nevis |
| Currency | XCD (primary), USD (supported) |
| Account Number | 8-digit local |
| ECACH Routing | 9-digit, branch-specific (e.g., Central Street: 000000217) |
| SWIFT Code | KNANKNSKXXX |

---

## 2. System Architecture Diagram Description

### 2.1 High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CUSTOMER (Payer)                            │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────────────┐    │
│  │ NFC Tap-to-  │    │ Scan Dynamic │    │ Manual Card Entry  │    │
│  │ Pay (Phone)  │    │ QR Code      │    │ (Hosted Field)     │    │
│  └──────┬───────┘    └──────┬───────┘    └─────────┬──────────┘    │
└─────────┼──────────────────┼──────────────────────┼───────────────┘
          │                  │                      │
          ▼                  ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    DRIVER/VENDOR MOBILE APP                         │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  IBT Payment Module (React Native / PWA)                     │  │
│  │  • Virtual Terminal UI (white-labeled)                       │  │
│  │  • NFC Tap-to-Pay handler (Android HCE / Apple Pay)          │  │
│  │  • Dynamic QR generator                                      │  │
│  │  • Transaction history                                       │  │
│  │  • Payout status dashboard                                   │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────────┘
                              │ HTTPS (TLS 1.3)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    IBT PLATFORM (Our Servers)                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Payment Orchestration Layer (Node.js / Express)             │  │
│  │  • Sub-merchant provisioning API                             │  │
│  │  • Transaction routing & logging                             │  │
│  │  • Webhook receiver (payment status updates)                 │  │
│  │  • Payout scheduler (daily/weekly settlement)                │  │
│  │  • Vendor/Driver management portal                           │  │
│  └──────────┬───────────────────────────────┬───────────────────┘  │
│             │                               │                       │
│             ▼                               ▼                       │
│  ┌──────────────────┐          ┌──────────────────────┐           │
│  │  Neon DB          │          │  Redis (caching)     │           │
│  │  • vendors        │          │  • session tokens    │           │
│  │  • drivers        │          │  • rate limiting     │           │
│  │  • terminals      │          │  • webhook queue     │           │
│  │  • transactions   │          └──────────────────────┘           │
│  │  • settlements    │                                             │
│  │  • payout_ledger  │                                             │
│  └──────────────────┘                                             │
└─────────────────────────────┬───────────────────────────────────────┘
                              │ API Key + HMAC Signature
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                 PAYMENT GATEWAY (Fygaro vPOS)                       │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  • Sub-terminal management                                   │  │
│  │  • Secure checkout webview / payment link                    │  │
│  │  • Tokenization engine (PCI-DSS Level 1 certified)           │  │
│  │  • NFC Tap-to-Pay processing                                 │  │
│  │  • Dynamic QR generation                                     │  │
│  │  • Webhook dispatcher                                        │  │
│  │  • Settlement engine                                         │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────────────┘
                              │ Settlement File (ACH/ECACH)
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│           ST. KITTS-NEVIS-ANGUILLA NATIONAL BANK                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  IBT Settlement Account (8-digit)                            │  │
│  │  SWIFT: KNANKNSKXXX                                          │  │
│  │  ECACH Routing: 000000217 (Central Street)                   │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Transaction Lifecycle (Step-by-Step)

```
Step 1: ORDER CREATION
  Driver/Vendor creates order in IBT mobile app
  → IBT Platform validates order, assigns terminal_id
  → Returns payment session token

Step 2: PAYMENT INITIATION
  Customer chooses payment method:
  Option A: NFC Tap-to-Pay
    → Android HCE / Apple Pay activates
    → Fygaro SDK processes tokenized card data
  Option B: Dynamic QR Code
    → IBT app displays QR with payment link
    → Customer scans with banking app / card app
    → Fygaro hosted checkout page opens
  Option C: Manual Entry (fallback)
    → Fygaro hosted fields (iframe) — card data never touches IBT servers

Step 3: GATEWAY PROCESSING
  Fygaro vPOS:
  → Validates tokenized card data
  → Routes to card network (Visa/MC)
  → Acquirer bank approves/declines
  → Returns result + transaction_id

Step 4: WEBHOOK NOTIFICATION
  Fygaro → IBT Platform (POST /webhooks/fygaro):
  {
    "event": "payment.success",
    "transaction_id": "txn_abc123",
    "terminal_id": "term_xyz789",
    "amount": 2500,           // cents (XCD)
    "currency": "XCD",
    "status": "approved",
    "timestamp": "2026-06-02T14:30:00Z",
    "signature": "hmac_sha256..."
  }

Step 5: ORDER COMPLETION
  IBT Platform:
  → Updates transaction status in DB
  → Sends receipt to customer (email/SMS)
  → Updates driver/vendor dashboard
  → Adds to payout ledger

Step 6: SETTLEMENT (Daily/Weekly)
  Fygaro → National Bank (ECACH batch):
  → Net settlement amount (after fees)
  → Deposited to IBT settlement account
  → IBT Platform reconciles via settlement report

Step 7: SUB-PAYOUT (Internal)
  IBT Platform → Vendor/Driver:
  → Calculates individual payout from ledger
  → Transfers via bank API or manual batch
  → Updates payout status in DB
```

### 2.3 Webhook Event Types

| Event | Description | IBT Action |
|-------|-------------|------------|
| `payment.success` | Transaction approved | Complete order, update ledger |
| `payment.declined` | Transaction declined | Notify driver, retry option |
| `payment.refunded` | Refund processed | Reverse ledger entry |
| `settlement.completed` | Funds deposited | Reconcile, trigger sub-payouts |
| `terminal.created` | New sub-terminal provisioned | Activate in vendor/driver profile |
| `terminal.suspended` | Terminal suspended by gateway | Block transactions, alert admin |

---

## 3. Payment Gateway Evaluation Matrix

### 3.1 Fygaro vPOS (Primary Recommendation)

| Criteria | Fygaro vPOS | Notes |
|----------|-------------|-------|
| **Caribbean Coverage** | ✅ Strong | Purpose-built for Caribbean markets |
| **Sub-Terminal API** | ✅ Yes | Create/manage virtual terminals per driver/vendor |
| **NFC Tap-to-Pay** | ✅ Yes | Native SDK for Android/iOS |
| **Dynamic QR** | ✅ Yes | Generated payment links with QR encoding |
| **White-Label** | ✅ Co-branded | Custom checkout UI, branded receipts |
| **Webhook System** | ✅ Yes | Real-time event notifications |
| **Settlement** | ✅ ECACH/ACH | Compatible with SKN National Bank |
| **PCI Compliance** | ✅ Level 1 | Tokenization — no raw card data on our side |
| **API Quality** | ✅ REST + SDK | Well-documented, JSON-based |
| **Fees** | ~2.5% + $0.25/txn | Competitive for Caribbean |
| **Payout Schedule** | T+1 to T+3 | Daily settlement available |

**Fygaro Integration Approach: Sub-Accounts vs Payment Links**

| Approach | Pros | Cons | Recommendation |
|----------|------|------|----------------|
| **Sub-Accounts** | Full terminal management, individual reporting, per-terminal webhooks | More complex setup, per-terminal fees | ✅ **Use for vendors** (higher volume, need reporting) |
| **Payment Links** | Simple API call, no terminal management, quick to implement | Limited reporting, no per-link webhooks | ✅ **Use for drivers** (on-the-go, simpler) |

**Recommended Hybrid:**
- **Vendors** → Fygaro Sub-Accounts (full terminal management, daily settlement)
- **Drivers** → Fygaro Payment Links (dynamic QR, simple API, per-transaction)

### 3.2 First Atlantic Commerce (Alternative)

| Criteria | First Atlantic Commerce | Notes |
|----------|------------------------|-------|
| **Caribbean Coverage** | ✅ Strong | Regional processor, SKN bank compatible |
| **Sub-Terminal API** | ⚠️ Limited | Merchant-level only, no true sub-terminals |
| **NFC Tap-to-Pay** | ✅ Yes | Via hosted checkout |
| **Dynamic QR** | ⚠️ Manual | Build QR → payment link ourselves |
| **White-Label** | ⚠️ Basic | Limited customization |
| **Webhook System** | ✅ Yes | Standard webhook events |
| **Settlement** | ✅ ECACH | Direct SKN bank integration |
| **PCI Compliance** | ✅ Level 1 | Hosted payment pages |
| **API Quality** | ⚠️ SOAP + REST | Older API design |
| **Fees** | ~2.9% + $0.30/txn | Slightly higher than Fygaro |

**Verdict:** Fygaro is the clear winner for our use case. First Atlantic Commerce serves as a backup option if Fygaro onboarding is delayed.

### 3.3 Integration Architecture

```
┌─────────────────────────────────────────────────────────┐
│              IBT Payment Orchestration Layer             │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Payment Service (paymentService.ts)            │   │
│  │  • createTerminal(vendorId) → Fygaro sub-acct   │   │
│  │  • createPaymentLink(driverId, amount) → Fygaro │   │
│  │  • processWebhook(payload) → update DB          │   │
│  │  • getTransactionStatus(txnId) → Fygaro API     │   │
│  │  • initiateRefund(txnId) → Fygaro API           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Payout Service (payoutService.ts)              │   │
│  │  • calculatePayouts(settlementId) → ledger      │   │
│  │  • processSubPayout(vendorId, amount) → bank    │   │
│  │  • reconcile(settlementReport) → DB             │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Webhook Handler (webhookHandler.ts)            │   │
│  │  • verifySignature(payload, signature) → HMAC   │   │
│  │  • routeEvent(eventType) → handler              │   │
│  │  • retryFailedWebhooks() → queue                │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## 4. Database Schema

### 4.1 Core Tables

```sql
-- ============================================================
-- PAYMENT INTEGRATION — DATABASE SCHEMA
-- Database: Neon (PostgreSQL)
-- Run: psql -d $DATABASE_URL -f 062_payment_integration.sql
-- ============================================================

-- Payment terminals (sub-merchants across ALL platform entities)
CREATE TABLE IF NOT EXISTS payment_terminals (
    id SERIAL PRIMARY KEY,
    terminal_id VARCHAR(100) UNIQUE NOT NULL,     -- Fygaro terminal / payment link ID
    
    -- Polymorphic entity reference (one of these is set)
    entity_type VARCHAR(30) NOT NULL CHECK (entity_type IN ('vendor', 'service_provider', 'coop_member', 'driver', 'tour_operator')),
    entity_id INTEGER NOT NULL,                     -- references the respective table's id
    
    terminal_type VARCHAR(20) NOT NULL DEFAULT 'sub_account' CHECK (terminal_type IN ('sub_account', 'payment_link')),
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'closed')),
    display_name VARCHAR(200),                      -- "John's Delivery" or "Maria's Store"
    fygaro_account_id VARCHAR(100),                 -- Fygaro sub-account reference
    
    -- Settlement destination (for sub-payouts)
    payout_bank_name VARCHAR(200),
    payout_account_last4 VARCHAR(4),                -- Last 4 digits only (PCI-safe)
    payout_routing VARCHAR(9),                      -- ECACH routing
    payout_swift VARCHAR(11),                       -- SWIFT code (if international)
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    created_by INTEGER REFERENCES users(user_id)
);

CREATE INDEX idx_terminals_entity ON payment_terminals(entity_type, entity_id);
CREATE INDEX idx_terminals_status ON payment_terminals(status);

-- Transactions
CREATE TABLE IF NOT EXISTS payment_transactions (
    id SERIAL PRIMARY KEY,
    transaction_id VARCHAR(100) UNIQUE NOT NULL,    -- Fygaro transaction ID
    terminal_id INTEGER REFERENCES payment_terminals(id),
    order_id VARCHAR(100),                          -- IBT internal order reference
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('vendor', 'driver')),
    entity_id INTEGER NOT NULL,
    
    -- Amount (stored in cents to avoid floating point)
    amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'XCD',
    fee_cents INTEGER DEFAULT 0,                    -- Gateway fee
    net_cents INTEGER NOT NULL,                     -- amount_cents - fee_cents
    
    -- Payment method
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('nfc_tap', 'qr_code', 'card_entry')),
    
    -- Status tracking
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'approved', 'declined', 'refunded', 'failed')),
    decline_reason VARCHAR(200),
    
    -- Gateway response
    gateway_response JSONB,                         -- Full Fygaro response (tokenized)
    gateway_signature VARCHAR(500),                 -- HMAC signature for verification
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    
    -- Metadata
    device_info JSONB,                              -- { platform, os_version, app_version }
    location POINT,                                 -- GPS coordinates (if available)
    receipt_sent BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_transactions_terminal ON payment_transactions(terminal_id);
CREATE INDEX idx_transactions_entity ON payment_transactions(entity_type, entity_id);
CREATE INDEX idx_transactions_status ON payment_transactions(status);
CREATE INDEX idx_transactions_created ON payment_transactions(created_at);
CREATE INDEX idx_transactions_order ON payment_transactions(order_id);

-- Settlement batches (from gateway)
CREATE TABLE IF NOT EXISTS payment_settlements (
    id SERIAL PRIMARY KEY,
    settlement_id VARCHAR(100) UNIQUE NOT NULL,     -- Fygaro settlement ID
    settlement_date DATE NOT NULL,
    total_amount_cents INTEGER NOT NULL,
    total_fees_cents INTEGER NOT NULL,
    net_amount_cents INTEGER NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'XCD',
    transaction_count INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    bank_reference VARCHAR(100),                    -- ECACH/ACH reference number
    reconciliation_status VARCHAR(20) DEFAULT 'unreconciled' CHECK (reconciliation_status IN ('unreconciled', 'reconciled', 'discrepancy')),
    raw_report JSONB,                               -- Full settlement report from gateway
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP
);

CREATE INDEX idx_settlements_date ON payment_settlements(settlement_date);
CREATE INDEX idx_settlements_status ON payment_settlements(status);

-- Payout ledger (internal tracking of what each vendor/driver is owed)
CREATE TABLE IF NOT EXISTS payout_ledger (
    id SERIAL PRIMARY KEY,
    entity_type VARCHAR(20) NOT NULL CHECK (entity_type IN ('vendor', 'driver')),
    entity_id INTEGER NOT NULL,
    transaction_id INTEGER REFERENCES payment_transactions(id),
    settlement_id INTEGER REFERENCES payment_settlements(id),
    
    -- Amount breakdown
    gross_amount_cents INTEGER NOT NULL,
    gateway_fee_cents INTEGER NOT NULL,
    platform_fee_cents INTEGER DEFAULT 0,           -- IBT commission (if any)
    net_amount_cents INTEGER NOT NULL,
    
    -- Payout status
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'processing', 'completed', 'failed')),
    payout_method VARCHAR(20) DEFAULT 'bank_transfer' CHECK (payout_method IN ('bank_transfer', 'manual', 'wallet')),
    bank_account_last4 VARCHAR(4),                  -- Last 4 digits only (no full account numbers)
    bank_routing VARCHAR(9),                        -- ECACH routing number
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT NOW(),
    scheduled_at TIMESTAMP,
    completed_at TIMESTAMP,
    notes TEXT
);

CREATE INDEX idx_payout_entity ON payout_ledger(entity_type, entity_id);
CREATE INDEX idx_payout_status ON payout_ledger(status);
CREATE INDEX idx_payout_settlement ON payout_ledger(settlement_id);

-- Webhook log (for debugging and audit)
CREATE TABLE IF NOT EXISTS payment_webhooks (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    payload JSONB NOT NULL,
    signature VARCHAR(500),
    processed BOOLEAN DEFAULT FALSE,
    processing_result JSONB,
    retry_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

CREATE INDEX idx_webhooks_event ON payment_webhooks(event_type);
CREATE INDEX idx_webhooks_processed ON payment_webhooks(processed);

-- Terminal configuration (per-terminal settings)
CREATE TABLE IF NOT EXISTS terminal_config (
    id SERIAL PRIMARY KEY,
    terminal_id INTEGER REFERENCES payment_terminals(id) UNIQUE,
    daily_limit_cents INTEGER DEFAULT 500000,      -- XCD $5,000 default
    single_txn_limit_cents INTEGER DEFAULT 100000,  -- XCD $1,000 default
    require_pin BOOLEAN DEFAULT FALSE,
    receipt_email VARCHAR(255),
    receipt_phone VARCHAR(20),
    custom_branding JSONB,                          -- { logo_url, primary_color, business_name }
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_terminal_config_terminal ON terminal_config(terminal_id);
```

### 4.2 Entity Relationship Diagram

```
users
  ├── vendors ──── payment_terminals (entity_type='vendor')
  │                  ├── payment_transactions
  │                  ├── payout_ledger
  │                  └── terminal_config
  │
  ├── drivers ──── payment_terminals (entity_type='driver')
  │                  ├── payment_transactions
  │                  ├── payout_ledger
  │                  └── terminal_config
  │
  └── payment_settlements ─── payout_ledger
       └── payment_transactions

payment_webhooks (audit log, independent)
```

---

## 5. Security & Compliance Plan

### 5.1 PCI-DSS Scope Reduction

**Goal:** Keep IBT Platform out of PCI-DSS Level 1 compliance scope.

| Data Element | Storage Location | PCI Scope |
|-------------|-----------------|-----------|
| Raw card number (PAN) | ❌ NEVER stored | Out of scope |
| CVV/CVC | ❌ NEVER stored | Out of scope |
| Card expiry | ❌ NEVER stored | Out of scope |
| Tokenized card reference | ✅ Fygaro only | Fygaro's scope |
| Transaction ID | ✅ IBT DB | Out of scope (no card data) |
| Amount, currency, status | ✅ IBT DB | Out of scope |
| Last 4 digits | ✅ IBT DB (payout_ledger) | Out of scope (SAQ A) |
| Bank account (last 4) | ✅ IBT DB (payout_ledger) | Out of scope |

**Compliance Level:** SAQ A (lowest level) — we only use hosted payment fields and tokenization.

### 5.2 Security Measures

```
┌─────────────────────────────────────────────────────────────┐
│                    SECURITY LAYERS                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: TRANSPORT                                        │
│  • TLS 1.3 for all API calls                               │
│  • Certificate pinning in mobile app                       │
│  • No HTTP fallback                                        │
│                                                             │
│  Layer 2: AUTHENTICATION                                   │
│  • API keys stored in environment variables (never in DB)  │
│  • HMAC-SHA256 webhook signature verification              │
│  • JWT tokens for mobile app authentication                │
│  • Rate limiting: 100 req/min per terminal                 │
│                                                             │
│  Layer 3: DATA PROTECTION                                  │
│  • No raw card data in logs                                │
│  • gateway_response JSONB field stores tokenized data only │
│  • Bank account numbers: last 4 digits only                │
│  • Encryption at rest (Neon DB default)                    │
│                                                             │
│  Layer 4: WEBHOOK SECURITY                                 │
│  • Verify HMAC signature on every webhook                  │
│  • Reject webhooks with invalid/missing signatures         │
│  • Idempotent processing (duplicate webhook = no-op)       │
│  • Log all webhook attempts (success + failure)            │
│                                                             │
│  Layer 5: ACCESS CONTROL                                   │
│  • Role-based access: admin, vendor, driver                │
│  • Vendors see only their own transactions                 │
│  • Drivers see only their own transactions                 │
│  • Admins see all (read-only for raw gateway data)         │
│                                                             │
│  Layer 6: MONITORING                                       │
│  • Alert on >5 declined transactions in 10 minutes         │
│  • Alert on webhook processing failures                    │
│  • Daily reconciliation report                             │
│  • Weekly security audit log review                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 5.3 Webhook Signature Verification

```typescript
// Pseudocode for webhook verification
function verifyWebhook(payload: string, signature: string, secret: string): boolean {
  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}
```

### 5.4 Environment Variables Required

```bash
# Fygaro API
FYARGO_API_KEY=sk_live_...
FYARGO_API_SECRET=...
FYARGO_WEBHOOK_SECRET=whsec_...
FYARGO_BASE_URL=https://api.fygaro.com/v1

# Settlement Bank (for reference only — not API credentials)
SETTLEMENT_BANK_NAME=St. Kitts-Nevis-Anguilla National Bank
SETTLEMENT_ACCOUNT_LAST4=XXXX
SETTLEMENT_ECACH_ROUTING=000000217
SETTLEMENT_SWIFT=KNANKNSKXXX

# Platform
PAYMENT_PLATFORM_FEE_PERCENT=0  # Set to 0 for launch, adjust later
PAYOUT_SCHEDULE=daily           # daily, weekly, or manual
```

---

## 6. Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [ ] Create database migration (062_payment_integration.sql)
- [ ] Set up Fygaro developer account and API keys
- [ ] Build payment orchestration service (paymentService.ts)
- [ ] Implement webhook handler with HMAC verification
- [ ] Create admin API endpoints for terminal management

### Phase 2: Vendor Integration (Week 3-4)
- [ ] Build vendor payment portal (web)
- [ ] Implement Fygaro sub-account provisioning
- [ ] Create transaction history dashboard
- [ ] Build payout ledger and reporting
- [ ] Test end-to-end with Fygaro sandbox

### Phase 3: Driver Mobile (Week 5-6)
- [ ] Build driver mobile payment UI (PWA or React Native)
- [ ] Implement dynamic QR code generation
- [ ] Integrate Fygaro payment links API
- [ ] Add NFC Tap-to-Pay (if Fygaro SDK supports)
- [ ] Build driver payout dashboard

### Phase 4: Settlement & Payouts (Week 7-8)
- [ ] Implement settlement reconciliation
- [ ] Build sub-payout calculation engine
- [ ] Create settlement reports
- [ ] Set up automated payout scheduling
- [ ] End-to-end testing with Fygaro production

### Phase 5: Security Hardening (Week 9)
- [ ] Penetration testing
- [ ] PCI-DSS SAQ A self-assessment
- [ ] Webhook security audit
- [ ] Rate limiting and DDoS protection
- [ ] Production deployment

---

## Appendix A: Fygaro API Endpoints (Expected)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/terminals` | POST | Create sub-terminal |
| `/terminals/{id}` | GET | Get terminal details |
| `/terminals/{id}/suspend` | POST | Suspend terminal |
| `/payments` | POST | Create payment (NFC/card) |
| `/payments/{id}` | GET | Get payment status |
| `/payments/{id}/refund` | POST | Refund payment |
| `/payment-links` | POST | Create dynamic QR payment link |
| `/settlements` | GET | List settlements |
| `/settlements/{id}` | GET | Get settlement details |
| `/webhooks` | POST | Register webhook URL |

## Appendix B: Cost Estimate

| Item | Cost |
|------|------|
| Fygaro setup fee | ~$500 (one-time) |
| Per-transaction fee | 2.5% + $0.25 |
| Monthly platform fee | ~$50-100 |
| Sub-terminal fee | ~$10/month per terminal |
| Estimated monthly (1000 txns) | ~$300-400 |

---

*Document prepared by OWL — AI Architect Agent*
*For review by IBT Solutions technical team*
