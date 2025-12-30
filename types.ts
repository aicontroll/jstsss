export interface NavItem {
  label: string;
  path: string;
}

export interface Member {
  name: string;
  designation: string;
}

export interface LegalDetail {
  label: string;
  value: string;
}

export interface Activity {
  title: string;
  date?: string;
  description: string;
  imageUrl?: string;
}