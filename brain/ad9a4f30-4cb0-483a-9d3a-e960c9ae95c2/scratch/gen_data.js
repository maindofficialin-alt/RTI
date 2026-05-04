
const depts = [
  "Agriculture & Cooperation",
  "Animal Husbandry, Dairy Development & Fisheries",
  "Backward Classes Welfare",
  "Consumer Affairs, Food & Civil Supplies",
  "Energy",
  "Environment, Forests, Science & Technology",
  "Finance",
  "General Administration",
  "Health, Medical & Family Welfare",
  "Higher Education",
  "Home",
  "Housing",
  "Industries & Commerce",
  "Information Technology, Electronics & Communications",
  "Labour, Employment, Training & Factories",
  "Law",
  "Municipal Administration & Urban Development",
  "Minorities Welfare",
  "Panchayat Raj & Rural Development",
  "Planning",
  "Revenue",
  "Roads & Buildings",
  "School Education",
  "Scheduled Castes Development",
  "Social Welfare",
  "Transport",
  "Tribal Welfare",
  "Water Resources (Irrigation & CAD)",
  "Women, Children, Disabled & Senior Citizens",
  "Youth Advancement, Tourism & Culture",
  "Endowments",
  "Prohibition & Excise",
  "Registration & Stamps"
];

const departments = depts.map((name, i) => ({
  id: `dept-${i + 1}`,
  name: name
}));

const pios = depts.flatMap((name, i) => {
  const deptId = `dept-${i + 1}`;
  return [
    { 
      id: `pio-${i * 2 + 1}`, 
      name: `Shri. ${['A.', 'B.', 'C.', 'D.', 'E.', 'G.', 'K.', 'M.', 'P.', 'S.', 'T.', 'V.'][i % 12]} ${['Rajender', 'Srinivas', 'Mahesh', 'Venkatesh', 'Prabhakar', 'Satyanarayana', 'Ramesh', 'Suresh', 'Anil', 'Kumar'][i % 10]}`, 
      departmentId: deptId, 
      designation: 'Public Information Officer' 
    },
    { 
      id: `pio-${i * 2 + 2}`, 
      name: `Smt. ${['K.', 'M.', 'P.', 'S.', 'T.', 'V.', 'G.', 'L.', 'N.', 'R.'][i % 10]} ${['Sridevi', 'Anitha', 'Priyanka', 'Swathi', 'Lavanya', 'Radhika', 'Madhavi', 'Sunitha', 'Laxmi', 'Deepika'][i % 10]}`, 
      departmentId: deptId, 
      designation: 'Asst. Public Information Officer' 
    }
  ];
});

console.log(JSON.stringify(departments, null, 2));
console.log('---');
console.log(JSON.stringify(pios, null, 2));
