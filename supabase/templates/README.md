# Supabase Email Templates

This folder contains professional HTML email templates for all Supabase authentication flows. These templates are designed to be minimal, accessible, and easily customizable for your SaaS application.

## 📧 Available Templates

| Template                | Purpose                                        | When Sent                                                    |
| ----------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| `confirmation.html`     | Email verification for new user registrations  | When a user signs up and needs to verify their email         |
| `invite.html`           | User invitations                               | When an admin invites a user to join the application         |
| `reset-password.html`   | Password reset                                 | When a user requests a password reset                        |
| `magic-link.html`       | Passwordless authentication                    | When a user requests a magic link for passwordless login     |
| `email-change.html`     | Email address change verification              | When a user wants to change their email address              |
| `reauthentication.html` | Security verification for sensitive operations | When additional verification is needed for sensitive actions |

## 🚀 Using Templates Locally (Supabase CLI)

### Prerequisites

- Supabase CLI installed
- Local Supabase project initialized

### Setup

1. These templates are already in the correct location: `supabase/templates/`
2. Configure the templates in your `supabase/config.toml` file:

```toml
[auth.email.template.invite]
subject = "You're invited to join My App"
content_path = "./supabase/templates/invite.html"

[auth.email.template.confirmation]
subject = "Confirm Your Email - My App"
content_path = "./supabase/templates/confirmation.html"

[auth.email.template.recovery]
subject = "Reset Your Password - My App"
content_path = "./supabase/templates/reset-password.html"

[auth.email.template.magic_link]
subject = "Your Magic Link - My App"
content_path = "./supabase/templates/magic-link.html"

[auth.email.template.email_change]
subject = "Confirm Email Change - My App"
content_path = "./supabase/templates/email-change.html"

[auth.email.template.reauthentication]
subject = "Security Verification Required - My App"
content_path = "./supabase/templates/reauthentication.html"
```

3. Restart your local Supabase instance:

```bash
supabase stop && supabase start
```

## ☁️ Using Templates with Supabase Cloud

### Step 1: Access the Supabase Dashboard

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Navigate to **Authentication** → **Email Templates**

### Step 2: Configure Each Template

For each template type:

1. **Select the template type** (e.g., "Confirm signup", "Invite user", etc.)
2. **Copy the HTML content** from the corresponding `.html` file in this folder
3. **Paste it into the "Message body" field** in the Supabase dashboard
4. **Update the subject line** to match your app (replace "My App" with your app name)
5. **Save** the template

### Step 3: Template Variables

The templates use these Supabase variables (they'll be automatically replaced):

- `{{ .SiteURL }}` - Your site URL
- `{{ .ConfirmationURL }}` - Auto-generated confirmation link
- `{{ .Token }}` - 6-digit verification code
- `{{ .Email }}` - User's email address
- `{{ .NewEmail }}` - New email address (email change only)

## 🎨 Customization

### Branding Your Templates

The templates use a clean, professional design with neutral colors that work for most SaaS applications. To customize them for your brand:

**App Name & Logo:**

- Replace "My App" with your actual app name throughout the templates
- Add your logo to `public/logo.png` (the templates reference `{{ .SiteURL }}/logo.png`)
- Update the alt text for the logo to match your app name

**Colors:**
To update colors, simply edit the CSS values in each template's `<style>` section:

```css
.button {
  background-color: #your-brand-color;
}
```

**Why Static Templates?**
These templates are designed to be copied directly into Supabase Dashboard, so they need to be self-contained HTML with inline styles. This keeps them simple and reliable across all email clients.

### Template Structure

Each template follows this structure:

- **Email client reset styles** - Ensures compatibility across email clients
- **Main styles** - Layout and typography
- **Email header** - App name and branding
- **Email body** - Main content with call-to-action
- **Email footer** - Contact information and legal text

## 📱 Mobile Responsive

All templates are designed to be mobile-responsive and will look great on:

- Desktop email clients (Outlook, Apple Mail, etc.)
- Webmail (Gmail, Yahoo, Outlook.com)
- Mobile devices (iOS Mail, Android Gmail, etc.)

## 🆘 Support

If you need help customizing these templates:

1. Check the [Supabase documentation](https://supabase.com/docs/guides/local-development/customizing-email-templates)
2. Review the template variables available in the Supabase docs
3. Test changes in a development environment first

## 📝 Notes

- Templates include fallback fonts for better compatibility
- Inline styles are used for maximum email client support
- Security messaging is included for sensitive operations
