// Multi-Format Export Helpers for Smart Resume Builder (.pdf, .docx, .txt, .json, .html)

export const exportAsPlainText = (resume) => {
  const { personalInfo = {}, experience = [], education = [], skills = [], projects = [] } = resume;
  
  let text = `${(personalInfo.fullName || 'RESUME').toUpperCase()}\n`;
  text += `${personalInfo.jobTitle || ''}\n`;
  text += `Email: ${personalInfo.email || ''} | Phone: ${personalInfo.phone || ''} | Location: ${personalInfo.location || ''}\n`;
  if (personalInfo.linkedin) text += `LinkedIn: ${personalInfo.linkedin}\n`;
  if (personalInfo.github) text += `GitHub: ${personalInfo.github}\n`;
  text += `\n${'='.repeat(60)}\nPROFESSIONAL SUMMARY\n${'='.repeat(60)}\n`;
  text += `${personalInfo.summary || ''}\n\n`;

  if (experience.length > 0) {
    text += `${'='.repeat(60)}\nWORK EXPERIENCE\n${'='.repeat(60)}\n`;
    experience.forEach((exp) => {
      text += `\n${exp.title || 'Role'} - ${exp.company || 'Company'}\n`;
      text += `Dates: ${exp.startDate || ''} | Location: ${exp.location || ''}\n`;
      text += `${exp.description || ''}\n`;
    });
    text += '\n';
  }

  if (skills.length > 0) {
    text += `${'='.repeat(60)}\nSKILLS & EXPERTISE\n${'='.repeat(60)}\n`;
    const skillList = skills.map(s => typeof s === 'string' ? s : `${s.name}${s.level ? ` (${s.level})` : ''}`);
    text += `${skillList.join(', ')}\n\n`;
  }

  if (education.length > 0) {
    text += `${'='.repeat(60)}\nEDUCATION\n${'='.repeat(60)}\n`;
    education.forEach((edu) => {
      text += `${edu.degree || ''} - ${edu.school || ''} (${edu.year || ''})\n`;
    });
    text += '\n';
  }

  downloadBlob(text, `${slugify(personalInfo.fullName)}_Resume.txt`, 'text/plain;charset=utf-8');
};

export const exportAsJSON = (resume) => {
  const jsonString = JSON.stringify(resume, null, 2);
  const name = slugify(resume.personalInfo?.fullName);
  downloadBlob(jsonString, `${name}_Resume_Data.json`, 'application/json');
};

export const exportAsHTML = (resumeElementId, fullName) => {
  const element = document.getElementById(resumeElementId);
  if (!element) return;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${fullName || 'Resume'}</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; padding: 40px; display: flex; justify-content: center; }
    .page-a4 { width: 210mm; min-height: 297mm; background: #fff; padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
  </style>
</head>
<body>
  <div class="page-a4">
    ${element.innerHTML}
  </div>
</body>
</html>`;

  downloadBlob(htmlContent, `${slugify(fullName)}_Resume.html`, 'text/html;charset=utf-8');
};

export const exportAsDocx = (resume) => {
  const { personalInfo = {}, experience = [], education = [], skills = [] } = resume;
  
  // HTML format compatible with Microsoft Word import
  const wordHTML = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${personalInfo.fullName || 'Resume'}</title>
<style>
  body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; line-height: 1.4; color: #333; }
  h1 { font-size: 22pt; color: #1e293b; margin-bottom: 2pt; }
  h2 { font-size: 12pt; color: #4f46e5; text-transform: uppercase; border-bottom: 1.5pt solid #4f46e5; padding-bottom: 2pt; margin-top: 14pt; }
  .contact { font-size: 10pt; color: #64748b; margin-bottom: 12pt; }
  .exp-title { font-weight: bold; font-size: 11pt; }
  .exp-date { font-weight: normal; color: #64748b; float: right; }
</style>
</head>
<body>
  <h1>${personalInfo.fullName || 'Your Name'}</h1>
  <p style="color: #4f46e5; font-weight: bold; font-size: 13pt; margin-top:0;">${personalInfo.jobTitle || ''}</p>
  <p className="contact">${personalInfo.email || ''} | ${personalInfo.phone || ''} | ${personalInfo.location || ''}</p>
  
  ${personalInfo.summary ? `<h2>Professional Summary</h2><p>${personalInfo.summary}</p>` : ''}
  
  ${experience.length > 0 ? `
    <h2>Work Experience</h2>
    ${experience.map(e => `
      <div style="margin-bottom: 10pt;">
        <p className="exp-title">${e.title} - ${e.company} <span className="exp-date">${e.startDate || ''}</span></p>
        <p>${e.description || ''}</p>
      </div>
    `).join('')}
  ` : ''}

  ${skills.length > 0 ? `
    <h2>Skills & Expertise</h2>
    <p>${skills.map(s => typeof s === 'string' ? s : `${s.name}${s.level ? ` (${s.level})` : ''}`).join(' • ')}</p>
  ` : ''}

  ${education.length > 0 ? `
    <h2>Education</h2>
    ${education.map(ed => `<p><b>${ed.degree}</b> - ${ed.school} (${ed.year || ''})</p>`).join('')}
  ` : ''}
</body>
</html>`;

  downloadBlob(wordHTML, `${slugify(personalInfo.fullName)}_Resume.doc`, 'application/msword');
};

const slugify = (str) => (str || 'Resume').replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, '');

const downloadBlob = (content, filename, contentType) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
