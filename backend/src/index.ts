import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
const departments = [
  { "id": "dept-1", "name": "Agriculture & Cooperation" },
  { "id": "dept-2", "name": "Animal Husbandry, Dairy Development & Fisheries" },
  { "id": "dept-3", "name": "Backward Classes Welfare" },
  { "id": "dept-4", "name": "Consumer Affairs, Food & Civil Supplies" },
  { "id": "dept-5", "name": "Energy" },
  { "id": "dept-6", "name": "Environment, Forests, Science & Technology" },
  { "id": "dept-7", "name": "Finance" },
  { "id": "dept-8", "name": "General Administration" },
  { "id": "dept-9", "name": "Health, Medical & Family Welfare" },
  { "id": "dept-10", "name": "Higher Education" },
  { "id": "dept-11", "name": "Home" },
  { "id": "dept-12", "name": "Housing" },
  { "id": "dept-13", "name": "Industries & Commerce" },
  { "id": "dept-14", "name": "Information Technology, Electronics & Communications" },
  { "id": "dept-15", "name": "Labour, Employment, Training & Factories" },
  { "id": "dept-16", "name": "Law" },
  { "id": "dept-17", "name": "Municipal Administration & Urban Development" },
  { "id": "dept-18", "name": "Minorities Welfare" },
  { "id": "dept-19", "name": "Panchayat Raj & Rural Development" },
  { "id": "dept-20", "name": "Planning" },
  { "id": "dept-21", "name": "Revenue" },
  { "id": "dept-22", "name": "Roads & Buildings" },
  { "id": "dept-23", "name": "School Education" },
  { "id": "dept-24", "name": "Scheduled Castes Development" },
  { "id": "dept-25", "name": "Social Welfare" },
  { "id": "dept-26", "name": "Transport" },
  { "id": "dept-27", "name": "Tribal Welfare" },
  { "id": "dept-28", "name": "Water Resources (Irrigation & CAD)" },
  { "id": "dept-29", "name": "Women, Children, Disabled & Senior Citizens" },
  { "id": "dept-30", "name": "Youth Advancement, Tourism & Culture" },
  { "id": "dept-31", "name": "Endowments" },
  { "id": "dept-32", "name": "Prohibition & Excise" },
  { "id": "dept-33", "name": "Registration & Stamps" }
];

const pios = [
  { "id": "pio-1", "name": "Shri. A. Rajender", "departmentId": "dept-1", "designation": "Public Information Officer" },
  { "id": "pio-2", "name": "Smt. K. Sridevi", "departmentId": "dept-1", "designation": "Asst. Public Information Officer" },
  { "id": "pio-3", "name": "Shri. B. Srinivas", "departmentId": "dept-2", "designation": "Public Information Officer" },
  { "id": "pio-4", "name": "Smt. M. Anitha", "departmentId": "dept-2", "designation": "Asst. Public Information Officer" },
  { "id": "pio-5", "name": "Shri. C. Mahesh", "departmentId": "dept-3", "designation": "Public Information Officer" },
  { "id": "pio-6", "name": "Smt. P. Priyanka", "departmentId": "dept-3", "designation": "Asst. Public Information Officer" },
  { "id": "pio-7", "name": "Shri. D. Venkatesh", "departmentId": "dept-4", "designation": "Public Information Officer" },
  { "id": "pio-8", "name": "Smt. S. Swathi", "departmentId": "dept-4", "designation": "Asst. Public Information Officer" },
  { "id": "pio-9", "name": "Shri. E. Prabhakar", "departmentId": "dept-5", "designation": "Public Information Officer" },
  { "id": "pio-10", "name": "Smt. T. Lavanya", "departmentId": "dept-5", "designation": "Asst. Public Information Officer" },
  { "id": "pio-11", "name": "Shri. G. Satyanarayana", "departmentId": "dept-6", "designation": "Public Information Officer" },
  { "id": "pio-12", "name": "Smt. V. Radhika", "departmentId": "dept-6", "designation": "Asst. Public Information Officer" },
  { "id": "pio-13", "name": "Shri. K. Ramesh", "departmentId": "dept-7", "designation": "Public Information Officer" },
  { "id": "pio-14", "name": "Smt. G. Madhavi", "departmentId": "dept-7", "designation": "Asst. Public Information Officer" },
  { "id": "pio-15", "name": "Shri. M. Suresh", "departmentId": "dept-8", "designation": "Public Information Officer" },
  { "id": "pio-16", "name": "Smt. L. Sunitha", "departmentId": "dept-8", "designation": "Asst. Public Information Officer" },
  { "id": "pio-17", "name": "Shri. P. Anil", "departmentId": "dept-9", "designation": "Public Information Officer" },
  { "id": "pio-18", "name": "Smt. N. Laxmi", "departmentId": "dept-9", "designation": "Asst. Public Information Officer" },
  { "id": "pio-19", "name": "Shri. S. Kumar", "departmentId": "dept-10", "designation": "Public Information Officer" },
  { "id": "pio-20", "name": "Smt. R. Deepika", "departmentId": "dept-10", "designation": "Asst. Public Information Officer" },
  { "id": "pio-21", "name": "Shri. T. Rajender", "departmentId": "dept-11", "designation": "Public Information Officer" },
  { "id": "pio-22", "name": "Smt. K. Sridevi", "departmentId": "dept-11", "designation": "Asst. Public Information Officer" },
  { "id": "pio-23", "name": "Shri. V. Srinivas", "departmentId": "dept-12", "designation": "Public Information Officer" },
  { "id": "pio-24", "name": "Smt. M. Anitha", "departmentId": "dept-12", "designation": "Asst. Public Information Officer" },
  { "id": "pio-25", "name": "Shri. A. Mahesh", "departmentId": "dept-13", "designation": "Public Information Officer" },
  { "id": "pio-26", "name": "Smt. P. Priyanka", "departmentId": "dept-13", "designation": "Asst. Public Information Officer" },
  { "id": "pio-27", "name": "Shri. B. Venkatesh", "departmentId": "dept-14", "designation": "Public Information Officer" },
  { "id": "pio-28", "name": "Smt. S. Swathi", "departmentId": "dept-14", "designation": "Asst. Public Information Officer" },
  { "id": "pio-29", "name": "Shri. C. Prabhakar", "departmentId": "dept-15", "designation": "Public Information Officer" },
  { "id": "pio-30", "name": "Smt. T. Lavanya", "departmentId": "dept-15", "designation": "Asst. Public Information Officer" },
  { "id": "pio-31", "name": "Shri. D. Satyanarayana", "departmentId": "dept-16", "designation": "Public Information Officer" },
  { "id": "pio-32", "name": "Smt. V. Radhika", "departmentId": "dept-16", "designation": "Asst. Public Information Officer" },
  { "id": "pio-33", "name": "Shri. E. Ramesh", "departmentId": "dept-17", "designation": "Public Information Officer" },
  { "id": "pio-34", "name": "Smt. G. Madhavi", "departmentId": "dept-17", "designation": "Asst. Public Information Officer" },
  { "id": "pio-35", "name": "Shri. G. Suresh", "departmentId": "dept-18", "designation": "Public Information Officer" },
  { "id": "pio-36", "name": "Smt. L. Sunitha", "departmentId": "dept-18", "designation": "Asst. Public Information Officer" },
  { "id": "pio-37", "name": "Shri. K. Anil", "departmentId": "dept-19", "designation": "Public Information Officer" },
  { "id": "pio-38", "name": "Smt. N. Laxmi", "departmentId": "dept-19", "designation": "Asst. Public Information Officer" },
  { "id": "pio-39", "name": "Shri. M. Kumar", "departmentId": "dept-20", "designation": "Public Information Officer" },
  { "id": "pio-40", "name": "Smt. R. Deepika", "departmentId": "dept-20", "designation": "Asst. Public Information Officer" },
  { "id": "pio-41", "name": "Shri. P. Rajender", "departmentId": "dept-21", "designation": "Public Information Officer" },
  { "id": "pio-42", "name": "Smt. K. Sridevi", "departmentId": "dept-21", "designation": "Asst. Public Information Officer" },
  { "id": "pio-43", "name": "Shri. S. Srinivas", "departmentId": "dept-22", "designation": "Public Information Officer" },
  { "id": "pio-44", "name": "Smt. M. Anitha", "departmentId": "dept-22", "designation": "Asst. Public Information Officer" },
  { "id": "pio-45", "name": "Shri. T. Mahesh", "departmentId": "dept-23", "designation": "Public Information Officer" },
  { "id": "pio-46", "name": "Smt. P. Priyanka", "departmentId": "dept-23", "designation": "Asst. Public Information Officer" },
  { "id": "pio-47", "name": "Shri. V. Venkatesh", "departmentId": "dept-24", "designation": "Public Information Officer" },
  { "id": "pio-48", "name": "Smt. S. Swathi", "departmentId": "dept-24", "designation": "Asst. Public Information Officer" },
  { "id": "pio-49", "name": "Shri. A. Prabhakar", "departmentId": "dept-25", "designation": "Public Information Officer" },
  { "id": "pio-50", "name": "Smt. T. Lavanya", "departmentId": "dept-25", "designation": "Asst. Public Information Officer" },
  { "id": "pio-51", "name": "Shri. B. Satyanarayana", "departmentId": "dept-26", "designation": "Public Information Officer" },
  { "id": "pio-52", "name": "Smt. V. Radhika", "departmentId": "dept-26", "designation": "Asst. Public Information Officer" },
  { "id": "pio-53", "name": "Shri. C. Ramesh", "departmentId": "dept-27", "designation": "Public Information Officer" },
  { "id": "pio-54", "name": "Smt. G. Madhavi", "departmentId": "dept-27", "designation": "Asst. Public Information Officer" },
  { "id": "pio-55", "name": "Shri. D. Suresh", "departmentId": "dept-28", "designation": "Public Information Officer" },
  { "id": "pio-56", "name": "Smt. L. Sunitha", "departmentId": "dept-28", "designation": "Asst. Public Information Officer" },
  { "id": "pio-57", "name": "Shri. E. Anil", "departmentId": "dept-29", "designation": "Public Information Officer" },
  { "id": "pio-58", "name": "Smt. N. Laxmi", "departmentId": "dept-29", "designation": "Asst. Public Information Officer" },
  { "id": "pio-59", "name": "Shri. G. Kumar", "departmentId": "dept-30", "designation": "Public Information Officer" },
  { "id": "pio-60", "name": "Smt. R. Deepika", "departmentId": "dept-30", "designation": "Asst. Public Information Officer" },
  { "id": "pio-61", "name": "Shri. K. Rajender", "departmentId": "dept-31", "designation": "Public Information Officer" },
  { "id": "pio-62", "name": "Smt. K. Sridevi", "departmentId": "dept-31", "designation": "Asst. Public Information Officer" },
  { "id": "pio-63", "name": "Shri. M. Srinivas", "departmentId": "dept-32", "designation": "Public Information Officer" },
  { "id": "pio-64", "name": "Smt. M. Anitha", "departmentId": "dept-32", "designation": "Asst. Public Information Officer" },
  { "id": "pio-65", "name": "Shri. P. Mahesh", "departmentId": "dept-33", "designation": "Public Information Officer" },
  { "id": "pio-66", "name": "Smt. P. Priyanka", "departmentId": "dept-33", "designation": "Asst. Public Information Officer" }
];

const rtiApplications = [
  { id: 'TSRTI/2026/001', status: 'PENDING', applicant: 'John Doe', department: 'Education', submittedAt: '2026-04-15' },
  { id: 'TSRTI/2026/002', status: 'RESOLVED', applicant: 'Jane Smith', department: 'Health', submittedAt: '2026-04-10' },
];

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Telangana RTI API is running' });
});

// Submit RTI
app.post('/api/rti/submit', (req: Request, res: Response) => {
  const { applicant, department, query } = req.body;
  const newRti = {
    id: `TSRTI/2026/${String(rtiApplications.length + 1).padStart(3, '0')}`,
    status: 'SUBMITTED',
    applicant,
    department,
    submittedAt: new Date().toISOString().split('T')[0]
  };
  rtiApplications.push(newRti);
  res.status(201).json(newRti);
});

// Track RTI
app.get('/api/rti/track/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const application = rtiApplications.find(a => a.id === id);
  if (application) {
    res.json(application);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
});

// List Departments
app.get('/api/departments', (req: Request, res: Response) => {
  res.json(departments);
});

// List PIOs by Department
app.get('/api/pios/:departmentId', (req: Request, res: Response) => {
  const { departmentId } = req.params;
  const filteredPios = pios.filter(p => p.departmentId === departmentId);
  res.json(filteredPios);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
