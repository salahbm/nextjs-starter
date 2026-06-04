# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of Next JS Starter seriously. If you believe you've found a security vulnerability, please follow these steps:

1. **Do not disclose the vulnerability publicly**
2. **Email us** at security@nextjsstarter.com with details about the vulnerability
3. Include the following information:
   - Type of vulnerability
   - Full path of source file(s) related to the vulnerability
   - Steps to reproduce
   - Proof of concept or exploit code (if possible)
   - Impact of the vulnerability

## What to Expect

- We will acknowledge receipt of your vulnerability report within 48 hours
- We will provide a more detailed response within 7 days
- We will work with you to understand and validate the issue
- We will keep you informed about our progress towards a fix
- We will credit you for the discovery (unless you prefer to remain anonymous)

## Security Best Practices

### For Developers

1. **Keep dependencies updated**
   - Regularly update project dependencies to patch known vulnerabilities
   - Use `npm audit` to check for vulnerable dependencies

2. **Authentication & Authorization**
   - Always use secure authentication methods
   - Implement proper authorization checks
   - Never store sensitive information in client-side code

3. **Data Validation**
   - Validate all input data on both client and server sides
   - Use Zod for runtime validation
   - Sanitize user inputs to prevent injection attacks

4. **API Security**
   - Use HTTPS for all API communications
   - Implement rate limiting to prevent abuse
   - Use proper authentication for API endpoints

5. **Environment Variables**
   - Never commit sensitive environment variables to version control
   - Use `.env.local` for local development
   - Use secure environment variable management in production

### For Users

1. **Account Security**
   - Use strong, unique passwords
   - Enable two-factor authentication if available
   - Log out from shared devices

2. **Data Privacy**
   - Be mindful of what information you share
   - Regularly review your account permissions

## Security Updates

Security updates will be released as needed. We recommend always using the latest version of the application to ensure you have all security patches.
