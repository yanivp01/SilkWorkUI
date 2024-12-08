export interface WorkExperience {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  graduationDate: string;
  gpa: string;
  additionalInfo: string;
}

export interface Project {
  name: string;
  date: string;
  description: string;
}

export interface FeaturedSkill {
  name: string;
  proficiency: number;
}

export interface FormData {
  fullName: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  objective: string;
  workExperiences: WorkExperience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  featuredSkills: FeaturedSkill[];
}

export interface SectionVisibility {
  workExperiences: boolean;
  education: boolean;
  projects: boolean;
  skills: boolean;
}