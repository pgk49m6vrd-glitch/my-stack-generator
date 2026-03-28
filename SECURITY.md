# Security Policy

At My Stack Generator, we take the security of our tools and the projects they generate seriously. We appreciate your efforts to responsibly disclose any vulnerabilities you may find.

## Supported Versions

Currently, the following versions of My Stack Generator are supported with security updates. We highly recommend always using the latest major version.

| Version | Supported          |
| ------- | ------------------ |
| 3.x.x   | :white_check_mark: |
| 2.x.x   | :x:                |
| < 2.0   | :x:                |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, discussions, or pull requests.**

Instead, please report them using the following method:

1. **GitHub Security Advisories**: Use the "Report a vulnerability" button in the **Security** tab of this repository. This allows for private collaboration on a fix between you and the maintainers before any public disclosure.

### What to Include

Please provide as much information as possible to help us understand and reproduce the issue:
* Description of the vulnerability and its potential impact.
* Steps to reproduce the issue (a proof-of-concept is highly appreciated).
* The version(s) of My Stack Generator or the generated templates affected.
* Potential mitigation strategies, if you happen to know any.

### Response Timeline

We aim to handle all reports promptly:
* We will acknowledge receipt of your vulnerability report within **48 hours**.
* We will investigate and provide regular updates on our progress towards a fix.
* Once the issue is resolved and a patch is released, we will publish a security advisory and credit you for the discovery (unless you prefer to remain anonymous).

## Out of Scope

The following types of reports are generally considered out of scope for *this* repository:
*   **User Infrastructure**: Issues related to your personal infrastructure, such as misconfigured Firebase Security Rules or Supabase RLS policies in the projects you generated.
*   **Upstream Dependencies**: Vulnerabilities in libraries we scaffold (e.g., React, Tailwind CSS, Vite) that are not uniquely triggered by our code. Please report these directly to the respective upstream projects. Update your `package.json` dependencies regularly to mitigate these.
*   Reports from automated scanners without a human-verified, exploitable proof-of-concept.

## Security Best Practices for Users

While My Stack Generator scaffolds projects with sensible defaults, the security of your final application remains your responsibility. We strongly recommend that you always:
- Follow security best practices for your chosen backend (e.g., enforce strict Firebase/Supabase rules).
- Keep your project dependencies up to date using tools like `npm audit` or Dependabot.
- Never commit secrets or `.env` files containing sensitive credentials to your version control systems.
