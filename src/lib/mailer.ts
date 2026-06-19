import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FORM_LABELS: Record<string, string> = {
  // Contact
  contactName: "Contact Name",
  street: "Street",
  city: "City",
  postcode: "Postcode",
  phone: "Phone",
  email: "Email",
  message: "Message",
  // Consultation
  service: "Service",
  servicePrice: "Service Price",
  date: "Date",
  time: "Time",
  firstName: "First Name",
  lastName: "Last Name",
  // Free Assessment – Personal
  title: "Title",
  dob: "Date of Birth",
  age: "Age",
  gender: "Gender",
  maritalStatus: "Marital Status",
  fax: "Fax",
  emailConfirm: "Email Confirm",
  citizenship: "Citizenship",
  residence: "Country of Residence",
  // Education
  highestDegree: "Highest Degree",
  degreeYears: "Years for Degree",
  totalEducationYears: "Total Education Years",
  // Work
  profession: "Profession / NOC",
  totalWorkYears: "Total Work Experience (years)",
  workInCanada: "Work Experience in Canada",
  // English
  hasEnglishTest: "Has English Test",
  englishTestType: "English Test Type",
  engExamDate: "English Exam Date",
  engListening: "English Listening",
  engWriting: "English Writing",
  engSpeaking: "English Speaking",
  engReading: "English Reading",
  // French
  hasFrenchTest: "Has French Test",
  frenchTestType: "French Test Type",
  frExamDate: "French Exam Date",
  frListening: "French Listening",
  frWriting: "French Writing",
  frSpeaking: "French Speaking",
  frReading: "French Reading",
  // Spouse
  spouseName: "Spouse Name",
  spouseDob: "Spouse DOB",
  spouseEducation: "Spouse Education",
  spouseWorkExp: "Spouse Work Experience",
  spouseLanguageInfo: "Spouse Language Info",
  // Children
  numChildren: "Number of Children",
  childrenAges: "Children Ages",
  // Canada connections
  relativeInCanada: "Relative in Canada",
  relativeDetails: "Relative Details",
  studiedInCanada: "Studied in Canada",
  // Previous applications
  prevPRorTRV: "Previous PR or TRV",
  prevApplicationDetails: "Previous Application Details",
  visaRefusals: "Visa Refusals",
  // Finances
  fundsAvailable: "Funds Available (CAD)",
  realEstate: "Real Estate Assets",
  // Travel
  travelHistory: "Travel History",
  // Other
  howHeard: "How Did You Hear About Us",
  furtherInfo: "Further Information",
};

const FORM_TITLES: Record<string, string> = {
  contact: "Contact Form",
  consultation: "Consultation Booking",
  "free-assessment": "Free Assessment",
};

function formatData(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([, v]) => v !== "" && v !== null && v !== undefined)
    .map(([k, v]) => {
      const label = FORM_LABELS[k] ?? k.replace(/([A-Z])/g, " $1").trim();
      return `
        <tr>
          <td style="padding:8px 12px;background:#f9f9f9;font-weight:600;color:#555;width:40%;border-bottom:1px solid #eee;vertical-align:top">${label}</td>
          <td style="padding:8px 12px;color:#1a1a1a;border-bottom:1px solid #eee;vertical-align:top">${String(v)}</td>
        </tr>`;
    })
    .join("");
}

export async function sendFormEmail(
  formType: string,
  data: Record<string, unknown>
): Promise<void> {
  const title = FORM_TITLES[formType] ?? formType;
  const recipient = process.env.SMTP_TO ?? process.env.SMTP_USER ?? "";
  const sender = process.env.SMTP_USER ?? "";

  const nameField =
    (data.firstName && data.lastName
      ? `${data.firstName} ${data.lastName}`
      : data.contactName ?? data.firstName ?? "") as string;

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:system-ui,-apple-system,Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:#cc1f1f;padding:28px 32px">
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.75);letter-spacing:0.08em;text-transform:uppercase">ZF Canada</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#ffffff">New ${title} Submission</h1>
            ${nameField ? `<p style="margin:6px 0 0;font-size:14px;color:rgba(255,255,255,0.85)">From: ${nameField}</p>` : ""}
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:28px 32px">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden;border-collapse:collapse">
              ${formatData(data)}
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px 28px;border-top:1px solid #f0f0f0">
            <p style="margin:0;font-size:12px;color:#999">This email was automatically generated by the ZF Canada website. Do not reply to this email.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  await transporter.sendMail({
    from: `"ZF Canada Website" <${sender}>`,
    to: recipient,
    subject: `[ZF Canada] New ${title}${nameField ? ` — ${nameField}` : ""}`,
    html,
  });
}
