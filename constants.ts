import { NavItem, Member, LegalDetail } from './types';

export const ORGANIZATION_NAME = "JATASHANKAR THAKUR SMARITI SEVA SANSTHAN";
export const ORGANIZATION_SHORT_NAME = "JTSSS";

// IMPORTANT: Please ensure you have placed your image file named 'logo.png' in the project root directory.
// Using an absolute path from the server root ensures the image loads correctly in dev and production.
export const LOGO_URL = "/logo.png";

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Mission & Vision', path: '/mission-vision' },
  { label: 'Legal', path: '/legal' },
  { label: 'Operational Area', path: '/operational-area' },
  { label: 'Governing Body', path: '/governing-body' },
  { label: 'Activities', path: '/activities' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact Us', path: '/contact' },
];

export const GOVERNING_BODY: Member[] = [
  { name: 'Pankaj Kumar Thakur', designation: 'Secretary' },
  { name: 'Niraj Kumar Thakur', designation: 'Chairman' },
  { name: 'Sanjay Kumar', designation: 'Treasurer' },
];

export const LEGAL_DETAILS: LegalDetail[] = [
  { label: 'NGO Name', value: 'JATASHANKAR THAKUR SMARITI SEVA SANSTHAN' },
  { label: 'NGO ID', value: 'BR/2021/0300566' },
  { label: 'NGO Type', value: 'Registered Societies (Non-Government)' },
  { label: 'Registration Number', value: '1411' },
  { label: 'Act Name', value: 'The Societies Registration Act, 1860' },
  { label: 'Date of Registration', value: '16-September-2009' },
  { label: 'Registering Authority', value: 'Registrar of Societies' },
  { label: 'Register City', value: 'Sonma' },
  { label: 'Register State', value: 'Bihar' },
];

export const CONTACT_INFO = {
  address: {
    line1: "Post Sonma, Police Station Bakhari",
    district: "Begusarai",
    state: "Bihar",
    pincode: "848201",
    country: "India"
  },
  mobile: "+91-9199990182",
  email: "pankaj250279@gmail.com"
};