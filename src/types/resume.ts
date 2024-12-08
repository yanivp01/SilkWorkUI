export interface Education {
  school: string;
  degree: string;
  major: string;
  gpa: string;
  date: string;
  additionalInfo: string;
}

export interface Experience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  name: string;
  date: string;
  description: string;
}

export interface Skill {
  name: string;
  proficiency: number;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    objective: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: {
    list: string[];
    featured: Skill[];
  };
  customSections: {
    title: string;
    content: string;
  }[];
}