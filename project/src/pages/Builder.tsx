import React, { useState } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { FormSection } from '../components/FormSection';
import { SkillProficiency } from '../components/SkillProficiency';
import { generatePDF } from '../utils/pdfGenerator';
import type { ResumeData } from '../types/resume';

export function Builder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      objective: '',
    },
    education: [{
      school: '',
      degree: '',
      major: '',
      gpa: '',
      date: '',
      additionalInfo: '',
    }],
    experience: [{
      company: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      description: '',
    }],
    projects: [{
      name: '',
      date: '',
      description: '',
    }],
    skills: {
      list: [],
      featured: [],
    },
    customSections: [],
  });

  const handleChange = (
    section: keyof ResumeData,
    index: number,
    field: string,
    value: string
  ) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSaveAsPDF = async () => {
    await generatePDF('resume-preview');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <Button
            variant="primary"
            className="flex items-center"
            onClick={handleSaveAsPDF}
          >
            <Save className="mr-2 h-4 w-4" />
            Save as PDF
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-8">
            <FormSection title="Personal Information">
              {/* Personal Info Fields */}
              <div className="grid gap-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        fullName: e.target.value,
                      },
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
                {/* Add other personal info fields */}
              </div>
            </FormSection>

            {/* Education Section */}
            <FormSection title="Education">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="space-y-4">
                  <input
                    type="text"
                    placeholder="School"
                    value={edu.school}
                    onChange={(e) =>
                      handleChange('education', index, 'school', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                  {/* Add other education fields */}
                </div>
              ))}
              <Button
                variant="secondary"
                onClick={() =>
                  setResumeData((prev) => ({
                    ...prev,
                    education: [
                      ...prev.education,
                      {
                        school: '',
                        degree: '',
                        major: '',
                        gpa: '',
                        date: '',
                        additionalInfo: '',
                      },
                    ],
                  }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </FormSection>

            {/* Experience Section */}
            <FormSection title="Work Experience">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) =>
                      handleChange('experience', index, 'company', e.target.value)
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                  {/* Add other experience fields */}
                </div>
              ))}
              <Button
                variant="secondary"
                onClick={() =>
                  setResumeData((prev) => ({
                    ...prev,
                    experience: [
                      ...prev.experience,
                      {
                        company: '',
                        jobTitle: '',
                        startDate: '',
                        endDate: '',
                        description: '',
                      },
                    ],
                  }))
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </FormSection>

            {/* Skills Section */}
            <FormSection title="Skills">
              <div className="space-y-4">
                <textarea
                  placeholder="Enter skills (comma-separated)"
                  value={resumeData.skills.list.join(', ')}
                  onChange={(e) =>
                    setResumeData((prev) => ({
                      ...prev,
                      skills: {
                        ...prev.skills,
                        list: e.target.value.split(',').map((s) => s.trim()),
                      },
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  rows={4}
                />
              </div>
            </FormSection>
          </div>

          {/* Preview Section */}
          <div id="resume-preview" className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Preview</h2>
            {/* Personal Info Preview */}
            <div className="mb-6">
              <h3 className="text-xl font-bold">
                {resumeData.personalInfo.fullName || 'Your Name'}
              </h3>
              <div className="text-gray-600">
                {resumeData.personalInfo.email && (
                  <p>{resumeData.personalInfo.email}</p>
                )}
                {resumeData.personalInfo.phone && (
                  <p>{resumeData.personalInfo.phone}</p>
                )}
                {resumeData.personalInfo.location && (
                  <p>{resumeData.personalInfo.location}</p>
                )}
              </div>
            </div>

            {/* Education Preview */}
            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-2">Education</h4>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{edu.school}</p>
                    <p>
                      {edu.degree} {edu.major}
                    </p>
                    <p className="text-gray-600">
                      {edu.date} {edu.gpa && `| GPA: ${edu.gpa}`}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Experience Preview */}
            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-2">Work Experience</h4>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold">{exp.company}</p>
                    <p className="text-gray-800">{exp.jobTitle}</p>
                    <p className="text-gray-600">
                      {exp.startDate} - {exp.endDate}
                    </p>
                    <p className="mt-2">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Preview */}
            {resumeData.skills.list.length > 0 && (
              <div>
                <h4 className="text-lg font-bold mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills.list.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}