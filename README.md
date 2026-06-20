# VANIKARA Intelligence Private Limited

<div align="center">

# Engineering Tomorrow's Intelligent Digital Experiences

**Official Production Repository**

Enterprise-grade AI Platform • Three.js Experience • CYGMA AI • Student Ecosystem • Intelligent Cloud Infrastructure

---

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-R3F-black)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![OpenAI](https://img.shields.io/badge/OpenAI-CYGMA_AI-orange)
![License](https://img.shields.io/badge/Status-Production_Ready-success)

</div>

---

# Overview

**VANIKARA Intelligence Private Limited** is an AI-first technology company focused on engineering intelligent digital experiences through immersive web technologies, cloud infrastructure, artificial intelligence, and scalable software platforms.

This repository contains the complete production codebase powering:

* Corporate Website
* CYGMA AI Platform
* Intelligent Student Services
* Authentication System
* Administrative Dashboard
* CRM Workspace
* Careers Portal
* Contact Management
* Analytics Platform
* Payment Infrastructure
* Future AI Products

---

# Platform Architecture

```text
                        VANIKARA PLATFORM

                               │
     ┌─────────────────────────┼─────────────────────────┐
     │                         │                         │
     ▼                         ▼                         ▼

Corporate Website         CYGMA AI Platform       Admin Dashboard

     │                         │                         │

     ▼                         ▼                         ▼

Hero Experience         AI Workspace           CRM Management

     │                         │                         │

     ▼                         ▼                         ▼

Authentication        OpenAI Integration      Analytics

     │                         │                         │

     ▼                         ▼                         ▼

Supabase Database     Conversation Engine     Contact System

     │                         │                         │

     └─────────────────────────┼─────────────────────────┘

                           Cloud Infrastructure
```

---

# Technology Stack

## Frontend

* Next.js App Router
* React 19
* TypeScript
* Tailwind CSS
* Framer Motion

---

## Three.js Engine

* React Three Fiber
* Three.js
* Shared 3D World
* Physically Based Rendering
* Glass Materials
* Dynamic Lighting
* HDR Environment
* Cinematic Camera
* Neural Network Renderer
* Floating Objects
* Orbit Rings
* Bloom Pipeline
* Atmospheric Fog

---

## Backend

* Next.js API Routes
* Server Components
* Server Actions
* REST APIs

---

## Database

Supabase

* PostgreSQL
* Authentication
* Storage
* Row Level Security
* Realtime Database

---

## Authentication

* Google OAuth
* Microsoft OAuth
* Email Login
* Guest Preview
* Protected Admin Access

---

## Artificial Intelligence

CYGMA AI Platform

Powered by:

* OpenAI API
* Streaming Responses
* Markdown Rendering
* Code Highlighting
* Chat History
* Future Vector Search
* Future RAG Pipeline

---

## Cloud Services

* Vercel
* Supabase
* Firebase
* Gmail SMTP
* Stripe

---

# Three.js World

The website is powered by one synchronized Three.js universe.

```text
                Shared Three.js Universe

 ┌─────────────────────────────────────────────────────┐

                 Glass Core Planet

                 Neural Network

                 Orbit Rings

                 Floating AI Objects

                 Dynamic Particles

                 Ambient Fog

                 HDR Lighting

                 Bloom

                 Cinematic Camera

 └─────────────────────────────────────────────────────┘

                ▲                        ▲

                │                        │

        Hero Camera              Login Camera

     Wide Cinematic          Close Cinematic
```

Both Hero and Login pages use the same shared world with different camera presets to ensure visual consistency and seamless transitions.

---

# Core Features

## Website

* Responsive Landing Page
* Dynamic Hero Section
* Product Showcase
* Company Timeline
* Contact Page
* Careers Page
* AI Section
* Cookie Consent
* Accessibility Support

---

## CYGMA AI

* AI Chat
* Real-time Streaming
* Markdown Support
* Code Rendering
* Thread History
* Guest Access
* Authentication
* Export Conversations
* Voice Input (Future)
* RAG Support (Future)

---

## Admin Dashboard

* CRM Dashboard
* Contact Management
* Career Applications
* Analytics
* AI Usage
* User Administration
* Internal Notes

---

## Contact Platform

* Contact Forms
* SMTP Email Delivery
* Admin Notifications
* Inquiry Tracking

---

## Careers Portal

* Resume Upload
* Applicant Tracking
* Status Management
* Admin Review

---

## Payment System

Stripe Integration

* Checkout
* Future Subscriptions
* Payment Verification
* Secure Webhooks

---

# Security

The platform follows modern security practices.

* Row Level Security (RLS)
* API Rate Limiting
* Secure Authentication
* HTTP Security Headers
* Content Security Policy
* Permissions Policy
* Cookie Consent Manager
* Session Validation
* Environment Variable Isolation

---

# Performance

The application is optimized for smooth production deployment.

* Shared Three.js Scene
* Dynamic Imports
* Lazy Loading
* Object Pooling
* Buffer Reuse
* Shader Warm-Up
* Static Geometry Allocation
* Optimized Rendering
* Zero Garbage Allocations
* Cached Textures
* Smooth 60 FPS Animations

---

# Accessibility

Designed according to WCAG 2.2 AA guidelines.

* Keyboard Navigation
* Skip Links
* Screen Reader Support
* ARIA Labels
* Focus Indicators
* Reduced Motion Support
* Responsive Typography
* High Contrast Themes

---

# Development

## Install

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Lint

```bash
npm run lint
```

---

## Type Checking

```bash
npm run type-check
```

---

## End-to-End Tests

```bash
npm run test:e2e
```

---

## AI Backend Validation

```bash
npx tsx scripts/test-ai-backend.ts
```

---

## Validation Suite

```bash
npm run test:validate
```

---

# Environment Variables

Configure the following services before deployment.

## Database

* DATABASE_URL
* NEXT_PUBLIC_SUPABASE_URL
* NEXT_PUBLIC_SUPABASE_ANON_KEY
* SUPABASE_SERVICE_ROLE_KEY

---

## OpenAI

* OPENAI_API_KEY

---

## Firebase

* NEXT_PUBLIC_FIREBASE_API_KEY
* NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
* NEXT_PUBLIC_FIREBASE_PROJECT_ID
* NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
* NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
* NEXT_PUBLIC_FIREBASE_APP_ID
* NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

---

## Stripe

* STRIPE_SECRET_KEY
* STRIPE_WEBHOOK_SECRET

---

## SMTP

* SMTP_HOST
* SMTP_PORT
* SMTP_USER
* SMTP_PASSWORD

---

## Website

* NEXT_PUBLIC_SITE_URL

---

# Deployment Pipeline

```text
Developer

    │

    ▼

GitHub Repository

    │

    ▼

GitHub Actions

    │

    ▼

Type Check

    │

    ▼

Lint

    │

    ▼

Production Build

    │

    ▼

Playwright Tests

    │

    ▼

Vercel Deployment

    │

    ▼

Health Checks

    │

    ▼

Production
```

---

# Project Structure

```text
src/

 ├── app/
 ├── api/
 ├── components/
 ├── three/
 ├── context/
 ├── hooks/
 ├── layouts/
 ├── lib/
 ├── services/
 ├── styles/
 ├── types/
 └── utils/
```

---

# Roadmap

Upcoming platform enhancements include:

* Multi-model AI Router
* Vector Database Integration
* Retrieval-Augmented Generation (RAG)
* Team Collaboration
* AI Agents
* Enterprise Workspace
* API Marketplace
* AI Automation Flows
* Mobile Applications
* Analytics Platform 2.0

---

# Contributing

This repository is maintained by **VANIKARA Intelligence Private Limited**.

Contributors should:

* Follow the project architecture.
* Maintain coding standards.
* Write production-ready code.
* Preserve accessibility compliance.
* Optimize for performance.
* Test all changes before merging.

---

# License

Copyright © VANIKARA Intelligence Private Limited.

All rights reserved.

Unauthorized copying, modification, redistribution, or commercial use of this software without written permission from VANIKARA Intelligence Private Limited is prohibited.

---

<div align="center">

## VANIKARA Intelligence Private Limited

### Engineering Tomorrow's Intelligent Digital Experiences

Built with ❤️ using Next.js, React, Three.js, Supabase, OpenAI, and modern cloud technologies.

</div>
