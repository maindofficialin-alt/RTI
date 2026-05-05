import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import multer from 'multer';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 5000;
const JWT_SECRET = 'rti-demo-secret-key-2026';
const DATA_DIR = path.join(__dirname, '..', 'data');
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');

// Ensure directories exist
[DATA_DIR, UPLOADS_DIR].forEach(dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); });

// --- JSON File DB Helpers ---
function readDB(file: string): any[] {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) { fs.writeFileSync(p, '[]'); return []; }
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}
function writeDB(file: string, data: any[]) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2));
}

// --- Seed default admin user if empty ---
const SRINIVAS_ID = 'srinivas-demo-id-123';

function seedUsers() {
  const users = readDB('users.json');
  if (users.length === 0) {
    const salt = bcrypt.genSaltSync(10);
    writeDB('users.json', [
      { id: uuidv4(), name: 'Admin', email: 'admin@gmail.com', password: bcrypt.hashSync('Admin@369', salt), role: 'admin', createdAt: new Date().toISOString() },
      { id: SRINIVAS_ID, name: 'Srinivas', email: 'srinivas@example.com', password: bcrypt.hashSync('password123', salt), role: 'citizen', location: 'HYDERABAD, TELANGANA', createdAt: new Date().toISOString() },
    ]);
  }
}

// --- Seed demo RTI application ---
function seedRTI() {
  const apps = readDB('applications.json');
  if (apps.length === 0) {
    writeDB('applications.json', [
      {
        id: uuidv4(), 
        registrationNumber: 'TSRTI/2026/0842', 
        userId: SRINIVAS_ID, 
        applicantName: 'Srinivas',
        email: 'srinivas@example.com', 
        phone: '9876543210', 
        address: 'Plot 42, Jubilee Hills, Hyderabad',
        departmentId: 'dept-10', 
        departmentName: 'Higher Education Department', 
        pioId: 'pio-19', 
        pioName: 'Shri. S. Kumar',
        subject: 'Inquiry on Infrastructure Funds for Government Degree Colleges', 
        description: 'Detailed inquiry regarding the allocation and utilization of infrastructure funds for Government Degree Colleges in Hyderabad district for the academic year 2025-26.',
        status: 'Processing', 
        documents: [
          { name: 'Infrastructure_Response_Note.pdf', url: '/uploads/mock-response-1.pdf', size: 1024567 }
        ], 
        timeline: [
          { date: '2026-05-05', time: '10:30 AM', message: 'Final Response Uploaded' },
          { date: '2026-05-04', message: 'Payment verified' },
          { date: '2026-04-15', message: 'RTI Submitted' },
        ], 
        response: {
          text: "The department has reviewed your request regarding infrastructure funds. Total allocation for 2025-26 is ₹15.5 Crores. Detailed breakdown is attached in the response PDF.",
          repliedBy: "Shri. S. Kumar (PIO)",
          repliedOn: "2026-05-05"
        },
        createdAt: '2026-04-15T09:00:00Z', 
        updatedAt: '2026-05-05T10:30:00Z',
      },
      {
        id: uuidv4(), 
        registrationNumber: 'TSRTI/2026/0521', 
        userId: SRINIVAS_ID, 
        applicantName: 'Srinivas',
        email: 'srinivas@example.com', 
        phone: '9876543210', 
        address: 'Plot 42, Jubilee Hills, Hyderabad',
        departmentId: 'dept-10', 
        departmentName: 'Higher Education Department', 
        pioId: 'pio-19', 
        pioName: 'Shri. S. Kumar',
        subject: 'Faculty Vacancy Report - Osmania University Affiliated Colleges', 
        description: 'Requesting the current status of faculty vacancies in all Osmania University affiliated government colleges as of March 2026.',
        status: 'Completed', 
        documents: [
          { name: 'Faculty_Vacancy_Report_March2026.pdf', url: '/uploads/mock-response-2.pdf', size: 450000 }
        ], 
        timeline: [
          { date: '2026-04-05', message: 'Application Completed and Information Provided' },
          { date: '2026-03-25', message: 'Under Review by Department' },
          { date: '2026-03-22', message: 'RTI Submitted' },
        ], 
        response: {
          text: "Information provided. There are currently 124 vacant positions across 15 government colleges affiliated with Osmania University. Recruitment process is initiated.",
          repliedBy: "Shri. S. Kumar (PIO)",
          repliedOn: "2026-04-05"
        },
        createdAt: '2026-03-22T14:20:00Z', 
        updatedAt: '2026-04-05T11:00:00Z',
      }
    ]);
  }
}

// --- Multer config ---
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, UPLOADS_DIR),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_, file, cb) => {
  const allowed = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
  cb(null, allowed.includes(file.mimetype));
}});

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Auth middleware
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    (req as any).user = jwt.verify(token, JWT_SECRET);
    next();
  } catch { res.status(401).json({ error: 'Invalid token' }); }
}

// --- Static Data ---
const departments = [
  { id: 'dept-1', name: 'Agriculture & Cooperation' }, { id: 'dept-2', name: 'Animal Husbandry, Dairy Development & Fisheries' },
  { id: 'dept-3', name: 'Backward Classes Welfare' }, { id: 'dept-4', name: 'Consumer Affairs, Food & Civil Supplies' },
  { id: 'dept-5', name: 'Energy' }, { id: 'dept-6', name: 'Environment, Forests, Science & Technology' },
  { id: 'dept-7', name: 'Finance' }, { id: 'dept-8', name: 'General Administration' },
  { id: 'dept-9', name: 'Health, Medical & Family Welfare' }, { id: 'dept-10', name: 'Higher Education' },
  { id: 'dept-11', name: 'Home' }, { id: 'dept-12', name: 'Housing' },
  { id: 'dept-13', name: 'Industries & Commerce' }, { id: 'dept-14', name: 'Information Technology, Electronics & Communications' },
  { id: 'dept-15', name: 'Labour, Employment, Training & Factories' }, { id: 'dept-16', name: 'Law' },
  { id: 'dept-17', name: 'Municipal Administration & Urban Development' }, { id: 'dept-18', name: 'Minorities Welfare' },
  { id: 'dept-19', name: 'Panchayat Raj & Rural Development' }, { id: 'dept-20', name: 'Planning' },
  { id: 'dept-21', name: 'Revenue' }, { id: 'dept-22', name: 'Roads & Buildings' },
  { id: 'dept-23', name: 'School Education' }, { id: 'dept-24', name: 'Scheduled Castes Development' },
  { id: 'dept-25', name: 'Social Welfare' }, { id: 'dept-26', name: 'Transport' },
  { id: 'dept-27', name: 'Tribal Welfare' }, { id: 'dept-28', name: 'Water Resources (Irrigation & CAD)' },
  { id: 'dept-29', name: 'Women, Children, Disabled & Senior Citizens' }, { id: 'dept-30', name: 'Youth Advancement, Tourism & Culture' },
  { id: 'dept-31', name: 'Endowments' }, { id: 'dept-32', name: 'Prohibition & Excise' }, { id: 'dept-33', name: 'Registration & Stamps' },
];

const pios = [
  { id: 'pio-1', name: 'Shri. A. Rajender', departmentId: 'dept-1', designation: 'Public Information Officer' },
  { id: 'pio-2', name: 'Smt. K. Sridevi', departmentId: 'dept-1', designation: 'Asst. Public Information Officer' },
  { id: 'pio-3', name: 'Shri. B. Srinivas', departmentId: 'dept-2', designation: 'Public Information Officer' },
  { id: 'pio-4', name: 'Smt. M. Anitha', departmentId: 'dept-2', designation: 'Asst. Public Information Officer' },
  { id: 'pio-5', name: 'Shri. C. Mahesh', departmentId: 'dept-3', designation: 'Public Information Officer' },
  { id: 'pio-6', name: 'Smt. P. Priyanka', departmentId: 'dept-3', designation: 'Asst. Public Information Officer' },
  { id: 'pio-7', name: 'Shri. D. Venkatesh', departmentId: 'dept-4', designation: 'Public Information Officer' },
  { id: 'pio-8', name: 'Smt. S. Swathi', departmentId: 'dept-4', designation: 'Asst. Public Information Officer' },
  { id: 'pio-9', name: 'Shri. E. Prabhakar', departmentId: 'dept-5', designation: 'Public Information Officer' },
  { id: 'pio-10', name: 'Smt. T. Lavanya', departmentId: 'dept-5', designation: 'Asst. Public Information Officer' },
  { id: 'pio-11', name: 'Shri. G. Satyanarayana', departmentId: 'dept-6', designation: 'Public Information Officer' },
  { id: 'pio-12', name: 'Smt. V. Radhika', departmentId: 'dept-6', designation: 'Asst. Public Information Officer' },
  { id: 'pio-13', name: 'Shri. K. Ramesh', departmentId: 'dept-7', designation: 'Public Information Officer' },
  { id: 'pio-14', name: 'Smt. G. Madhavi', departmentId: 'dept-7', designation: 'Asst. Public Information Officer' },
  { id: 'pio-15', name: 'Shri. M. Suresh', departmentId: 'dept-8', designation: 'Public Information Officer' },
  { id: 'pio-16', name: 'Smt. L. Sunitha', departmentId: 'dept-8', designation: 'Asst. Public Information Officer' },
  { id: 'pio-17', name: 'Shri. P. Anil', departmentId: 'dept-9', designation: 'Public Information Officer' },
  { id: 'pio-18', name: 'Smt. N. Laxmi', departmentId: 'dept-9', designation: 'Asst. Public Information Officer' },
  { id: 'pio-19', name: 'Shri. S. Kumar', departmentId: 'dept-10', designation: 'Public Information Officer' },
  { id: 'pio-20', name: 'Smt. R. Deepika', departmentId: 'dept-10', designation: 'Asst. Public Information Officer' },
  { id: 'pio-21', name: 'Shri. T. Rajender', departmentId: 'dept-11', designation: 'Public Information Officer' },
  { id: 'pio-22', name: 'Smt. K. Sridevi', departmentId: 'dept-11', designation: 'Asst. Public Information Officer' },
  { id: 'pio-23', name: 'Shri. V. Srinivas', departmentId: 'dept-12', designation: 'Public Information Officer' },
  { id: 'pio-24', name: 'Smt. M. Anitha', departmentId: 'dept-12', designation: 'Asst. Public Information Officer' },
  { id: 'pio-25', name: 'Shri. A. Mahesh', departmentId: 'dept-13', designation: 'Public Information Officer' },
  { id: 'pio-26', name: 'Smt. P. Priyanka', departmentId: 'dept-13', designation: 'Asst. Public Information Officer' },
  { id: 'pio-27', name: 'Shri. B. Venkatesh', departmentId: 'dept-14', designation: 'Public Information Officer' },
  { id: 'pio-28', name: 'Smt. S. Swathi', departmentId: 'dept-14', designation: 'Asst. Public Information Officer' },
  { id: 'pio-29', name: 'Shri. C. Prabhakar', departmentId: 'dept-15', designation: 'Public Information Officer' },
  { id: 'pio-30', name: 'Smt. T. Lavanya', departmentId: 'dept-15', designation: 'Asst. Public Information Officer' },
  { id: 'pio-31', name: 'Shri. D. Satyanarayana', departmentId: 'dept-16', designation: 'Public Information Officer' },
  { id: 'pio-32', name: 'Smt. V. Radhika', departmentId: 'dept-16', designation: 'Asst. Public Information Officer' },
  { id: 'pio-33', name: 'Shri. E. Ramesh', departmentId: 'dept-17', designation: 'Public Information Officer' },
  { id: 'pio-34', name: 'Smt. G. Madhavi', departmentId: 'dept-17', designation: 'Asst. Public Information Officer' },
];

// ==================== ROUTES ====================

// Health
app.get('/api/health', (_: Request, res: Response) => {
  res.json({ status: 'OK', message: 'RTI Demo API running', endpoints: ['/api/auth/register', '/api/auth/login', '/api/departments', '/api/pios/:deptId', '/api/rti/submit', '/api/rti/track/:regNo', '/api/rti/my-applications', '/api/upload'] });
});

// --- AUTH ---
app.post('/api/auth/register', (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields required' });
  const users = readDB('users.json');
  if (users.find((u: any) => u.email === email)) return res.status(409).json({ error: 'Email already registered' });
  const hashed = bcrypt.hashSync(password, 10);
  const user = { id: uuidv4(), name, email, password: hashed, role: 'citizen', createdAt: new Date().toISOString() };
  users.push(user);
  writeDB('users.json', users);
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const users = readDB('users.json');
  const user = users.find((u: any) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get('/api/auth/me', authMiddleware, (req: Request, res: Response) => {
  res.json({ user: (req as any).user });
});

// --- DEPARTMENTS & PIOs ---
app.get('/api/departments', (_: Request, res: Response) => res.json(departments));
app.get('/api/pios/:departmentId', (req: Request, res: Response) => {
  res.json(pios.filter(p => p.departmentId === req.params.departmentId));
});

// --- RTI SUBMIT ---
app.post('/api/rti/submit', upload.array('documents', 5), (req: Request, res: Response) => {
  const { applicantName, email, phone, address, departmentId, departmentName, pioId, pioName, subject, description } = req.body;
  if (!applicantName || !email || !departmentId || !subject || !description) return res.status(400).json({ error: 'Missing required fields' });
  const apps = readDB('applications.json');
  const regNo = `TSRTI/2026/${String(apps.length + 1).padStart(3, '0')}`;
  const files = (req.files as Express.Multer.File[]) || [];
  const docs = files.map(f => ({ name: f.originalname, url: `/uploads/${f.filename}`, size: f.size }));
  const application = {
    id: uuidv4(), registrationNumber: regNo, userId: (req as any).user?.id || 'anonymous',
    applicantName, email, phone: phone || '', address: address || '',
    departmentId, departmentName: departmentName || '', pioId: pioId || '', pioName: pioName || '',
    subject, description, status: 'Pending', documents: docs,
    timeline: [{ date: new Date().toISOString().split('T')[0], message: 'Application submitted online.' }],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  };
  apps.push(application);
  writeDB('applications.json', apps);
  res.status(201).json({ success: true, registrationNumber: regNo, application });
});

// --- RTI TRACK ---
app.get('/api/rti/track/:regNo', (req: Request, res: Response) => {
  const apps = readDB('applications.json');
  const app_found = apps.find((a: any) => a.registrationNumber === req.params.regNo);
  if (!app_found) return res.status(404).json({ error: 'Application not found' });
  res.json(app_found);
});

// --- MY APPLICATIONS (auth required) ---
app.get('/api/rti/my-applications', authMiddleware, (req: Request, res: Response) => {
  const apps = readDB('applications.json');
  const userApps = apps.filter((a: any) => a.userId === (req as any).user.id);
  res.json(userApps);
});

// --- ALL APPLICATIONS (admin) ---
app.get('/api/rti/all', authMiddleware, (req: Request, res: Response) => {
  if ((req as any).user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  res.json(readDB('applications.json'));
});

// --- UPDATE STATUS (admin) ---
app.patch('/api/rti/update-status/:regNo', authMiddleware, (req: Request, res: Response) => {
  if ((req as any).user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const { status, message } = req.body;
  const apps = readDB('applications.json');
  const idx = apps.findIndex((a: any) => a.registrationNumber === req.params.regNo);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  apps[idx].status = status;
  apps[idx].updatedAt = new Date().toISOString();
  apps[idx].timeline.unshift({ date: new Date().toISOString().split('T')[0], message: message || `Status updated to ${status}` });
  writeDB('applications.json', apps);
  res.json(apps[idx]);
});

// --- FILE UPLOAD (standalone) ---
app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({ success: true, file: { name: req.file.originalname, url: `/uploads/${req.file.filename}`, size: req.file.size } });
});

// --- INIT & START ---
seedUsers();
seedRTI();
app.listen(PORT, () => { console.log(`\n🚀 RTI Demo API running at http://localhost:${PORT}\n📁 Data stored in: ${DATA_DIR}\n📎 Uploads in: ${UPLOADS_DIR}\n`); });
