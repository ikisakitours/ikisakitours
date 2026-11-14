export interface LegalSectionItem {
  id: string;
  title: string;
  body: string;
  icon?: string;
}

export interface LegalSection {
  id: string;
  heading: string;
  sectionIcon: string;
  type: "paragraph" | "checklist" | "grid" | "icon-list" | "row-list" | "contact";
  content?: string;
  subItems?: LegalSectionItem[];
}

export interface LegalDocumentContent {
  id: string;
  language: string;
  title: string;
  eyebrow: string;
  accent: string;
  lastUpdated: string;
  sections: LegalSection[];
  createdAt: string;
  updatedAt: string;
}