# What is the Purpose of Each Module

## **HTTP**

- Contains both **client** and **server** implementations.
- Supports features traditionally difficult to use, like large or chunk-encoded messages.
- Commonly used in **non-secure** environments or internal networks.

---

## **HTTP/2**

- The Core API is **more symmetric** between client and server compared to the `http` API.
- Many events (`error`, `connect`, `stream`) can be emitted on both client and server sides.
- Designed for **faster performance** with multiplexing and header compression.

---

## **HTTPS**

- Implements **HTTP/1.1 over TLS/SSL** for encrypted communication.
- Ensures **confidentiality** and **integrity** of data.
- Commonly used in production for **secure APIs**, **e-commerce**, and systems handling **sensitive data**.

---

## **Key Technical Differences: HTTP/1.1 vs HTTP/2**

| Key                 | HTTP/1.1                  | HTTP/2                                     |
| ------------------- | ------------------------- | ------------------------------------------ |
| Submission Method   | Text-based                | Binary format                              |
| Communications      | One request at a time     | Multiple requests/responses simultaneously |
| Compression         | No default compression    | Compresses request headers                 |
| Performance         | May cause delays          | Reduces or avoids delays                   |
| Resource Management | Needs manual optimization | Less need for manual optimization          |
| Security            | HTTP or HTTPS (optional)  | Mostly requires HTTPS in browsers          |
| Request Priority    | No priority support       | Supports request prioritization            |

---

## **When to Use Each Module**

### HTTP

- **Use case:** Services in a trusted network without encryption needs.
- **Example:** Internal microservice in a corporate intranet.

### HTTP/2

- **Use case:** APIs that require reduced latency and better concurrency.
- **Example:** Single Page Applications (SPAs) loading assets faster via multiplexing.

### HTTPS

- **Use case:** Handling sensitive or private data.
- **Example:** E-commerce APIs handling checkout requests with customer details and payment info.

---
