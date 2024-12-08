import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef } from "react";
import { ArrowLeft, Download, Building2, GraduationCap, Lightbulb, Wrench, Eye, ArrowUpDown, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { generatePDF } from "../utils/pdfExport";
import { useToast } from "@/components/ui/use-toast";
import CVPreview from "@/components/cv/CVPreview";
import type { FormData, SectionVisibility } from "@/types/cv";

const Builder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    objective: "",
    workExperiences: [{
      company: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      description: ""
    }],
    education: [{
      school: "",
      degree: "",
      graduationDate: "",
      gpa: "",
      additionalInfo: ""
    }],
    projects: [{
      name: "",
      date: "",
      description: ""
    }],
    skills: [],
    featuredSkills: [{
      name: "",
      proficiency: 5
    }]
  });

  const [sectionVisibility, setSectionVisibility] = useState<SectionVisibility>({
    workExperiences: true,
    education: true,
    projects: true,
    skills: true
  });

  const toggleSectionVisibility = (section: keyof SectionVisibility) => {
    setSectionVisibility(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section?: string, index?: number) => {
    const { name, value } = e.target;
    
    if (section && typeof index === 'number') {
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].map((item: any, i: number) => 
          i === index ? { ...item, [name]: value } : item
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addItem = (section: string) => {
    const newItems = {
      workExperiences: { company: "", jobTitle: "", startDate: "", endDate: "", description: "" },
      education: { school: "", degree: "", graduationDate: "", gpa: "", additionalInfo: "" },
      projects: { name: "", date: "", description: "" },
      featuredSkills: { name: "", proficiency: 5 }
    };

    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItems[section]]
    }));
  };

  const removeItem = (section: keyof FormData, index: number) => {
    setFormData(prev => {
      const sectionData = prev[section];
      if (Array.isArray(sectionData)) {
        return {
          ...prev,
          [section]: sectionData.filter((_, i) => i !== index)
        };
      }
      return prev;
    });
  };

  const handleExportPDF = async () => {
    if (!previewRef.current) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not generate PDF. Please try again.",
      });
      return;
    }

    try {
      await generatePDF(previewRef.current);
      toast({
        title: "Success",
        description: "Your resume has been downloaded!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-4 sm:p-6 lg:p-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate("/SilkWorkUI")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Home
      </Button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="London, England"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(+44) 7767890334"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="johnsmith@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Website</label>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/johnsmith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Professional Summary</label>
                <Textarea
                  name="objective"
                  value={formData.objective}
                  onChange={handleChange}
                  placeholder="Brief overview of your professional background..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Building2 className="mr-2 h-5 w-5" />
                Work Experience
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleSectionVisibility('workExperiences')}
                  className={!sectionVisibility.workExperiences ? "text-muted-foreground" : ""}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {sectionVisibility.workExperiences && (
              <CardContent className="space-y-6">
                {formData.workExperiences.map((exp, index) => (
                  <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:text-destructive/90"
                      onClick={() => removeItem('workExperiences', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div>
                      <label className="block text-sm font-medium mb-1">Company</label>
                      <Input
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleChange(e, 'workExperiences', index)}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Job Title</label>
                        <Input
                          name="jobTitle"
                          value={exp.jobTitle}
                          onChange={(e) => handleChange(e, 'workExperiences', index)}
                          placeholder="Your position"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <Input
                          name="startDate"
                          value={exp.startDate}
                          onChange={(e) => handleChange(e, 'workExperiences', index)}
                          placeholder="APR 2024 - Present"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleChange(e, 'workExperiences', index)}
                        placeholder="Describe your responsibilities and achievements..."
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => addItem('workExperiences')}
                >
                  Add Experience
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Education */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Education
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleSectionVisibility('education')}
                  className={!sectionVisibility.education ? "text-muted-foreground" : ""}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {sectionVisibility.education && (
              <CardContent className="space-y-6">
                {formData.education.map((edu, index) => (
                  <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:text-destructive/90"
                      onClick={() => removeItem('education', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">School</label>
                        <Input
                          name="school"
                          value={edu.school}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="University name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Graduation Date</label>
                        <Input
                          name="graduationDate"
                          value={edu.graduationDate}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="APR 2024"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Degree & Major</label>
                        <Input
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="Bachelor of Science in Computer Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">GPA</label>
                        <Input
                          name="gpa"
                          value={edu.gpa}
                          onChange={(e) => handleChange(e, 'education', index)}
                          placeholder="4.00"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Additional Information</label>
                      <Textarea
                        name="additionalInfo"
                        value={edu.additionalInfo}
                        onChange={(e) => handleChange(e, 'education', index)}
                        placeholder="Relevant coursework, honors, etc..."
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => addItem('education')}
                >
                  Add School
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Projects */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5" />
                Projects
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleSectionVisibility('projects')}
                  className={!sectionVisibility.projects ? "text-muted-foreground" : ""}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {sectionVisibility.projects && (
              <CardContent className="space-y-6">
                {formData.projects.map((project, index) => (
                  <div key={index} className="space-y-4 p-4 bg-gray-50 rounded-lg relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-destructive hover:text-destructive/90"
                      onClick={() => removeItem('projects', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Project Name</label>
                        <Input
                          name="name"
                          value={project.name}
                          onChange={(e) => handleChange(e, 'projects', index)}
                          placeholder="Project name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <Input
                          name="date"
                          value={project.date}
                          onChange={(e) => handleChange(e, 'projects', index)}
                          placeholder="Summer 2024"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Description</label>
                      <Textarea
                        name="description"
                        value={project.description}
                        onChange={(e) => handleChange(e, 'projects', index)}
                        placeholder="Describe your project..."
                        rows={4}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => addItem('projects')}
                >
                  Add Project
                </Button>
              </CardContent>
            )}
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Wrench className="mr-2 h-5 w-5" />
                Skills
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleSectionVisibility('skills')}
                  className={!sectionVisibility.skills ? "text-muted-foreground" : ""}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            {sectionVisibility.skills && (
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Skills List</label>
                  <Textarea
                    name="skills"
                    value={formData.skills.join(", ")}
                    onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()) }))}
                    placeholder="Enter your skills, separated by commas..."
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-4">Featured Skills</label>
                  {formData.featuredSkills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <Input
                        name="name"
                        value={skill.name}
                        onChange={(e) => handleChange(e, 'featuredSkills', index)}
                        placeholder="Featured Skill"
                        className="flex-1"
                      />
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`w-4 h-4 rounded-full cursor-pointer ${
                              level <= skill.proficiency ? 'bg-orange-500' : 'bg-gray-200'
                            }`}
                            onClick={() => {
                              const newSkills = [...formData.featuredSkills];
                              newSkills[index] = { ...skill, proficiency: level };
                              setFormData(prev => ({ ...prev, featuredSkills: newSkills }));
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => addItem('featuredSkills')}
                  >
                    Add Featured Skill
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        </div>

        {/* Preview Section */}
        <CVPreview 
          formData={formData}
          onExport={handleExportPDF}
          previewRef={previewRef}
          sectionVisibility={sectionVisibility}
        />
      </div>
    </div>
  );
};

export default Builder;
