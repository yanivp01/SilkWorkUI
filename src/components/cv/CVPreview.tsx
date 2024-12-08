import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { FormData, SectionVisibility } from "@/types/cv";

interface CVPreviewProps {
  formData: FormData;
  onExport: () => void;
  previewRef: React.RefObject<HTMLDivElement>;
  sectionVisibility: SectionVisibility;
}

const CVPreview = ({ formData, onExport, previewRef, sectionVisibility }: CVPreviewProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-fit sticky top-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Live Preview</h2>
        <Button onClick={onExport}>
          <Download className="mr-2 h-4 w-4" /> Export PDF
        </Button>
      </div>
      <div ref={previewRef} className="border rounded-lg p-6 bg-white shadow-inner">
        <h1 className="text-2xl font-bold mb-2">{formData.fullName || "Your Name"}</h1>
        <div className="text-gray-600 mb-4 space-y-1">
          {formData.location && <p>{formData.location}</p>}
          {formData.email && <p>{formData.email}</p>}
          {formData.phone && <p>{formData.phone}</p>}
          {formData.website && <p>{formData.website}</p>}
        </div>
        {formData.objective && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
            <p className="text-gray-700">{formData.objective}</p>
          </div>
        )}
        
        {sectionVisibility.workExperiences && formData.workExperiences.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Work Experience</h2>
            {formData.workExperiences.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.company}</h3>
                  <span className="text-gray-600">{exp.startDate}</span>
                </div>
                <p className="text-gray-700">{exp.jobTitle}</p>
                <p className="text-gray-600 mt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {sectionVisibility.education && formData.education.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Education</h2>
            {formData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{edu.school}</h3>
                  <span className="text-gray-600">{edu.graduationDate}</span>
                </div>
                <p className="text-gray-700">{edu.degree}</p>
                {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                {edu.additionalInfo && <p className="text-gray-600 mt-1">{edu.additionalInfo}</p>}
              </div>
            ))}
          </div>
        )}

        {sectionVisibility.projects && formData.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Projects</h2>
            {formData.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.name}</h3>
                  <span className="text-gray-600">{project.date}</span>
                </div>
                <p className="text-gray-600 mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {sectionVisibility.skills && formData.skills.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Skills</h2>
            <p className="text-gray-700">{formData.skills.join(", ")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CVPreview;