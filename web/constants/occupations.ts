export type Occupation = { id: string; title: string; category: string };

const SEED: Occupation[] = [
  { id: '1', title: 'Software Engineer', category: 'Technology' },
  { id: '2', title: 'Registered Nurse', category: 'Healthcare' },
  { id: '3', title: 'Electrician', category: 'Trades' },
  { id: '4', title: 'Data Analyst', category: 'Technology' },
  { id: '5', title: 'Teacher', category: 'Education' },
  { id: '6', title: 'Graphic Designer', category: 'Creative' },
  { id: '7', title: 'Civil Engineer', category: 'Engineering' },
  { id: '8', title: 'Sales Representative', category: 'Business' },
];

export function searchOccupations(query: string): Occupation[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEED;
  return SEED.filter(
    (o) =>
      o.title.toLowerCase().includes(q) || o.category.toLowerCase().includes(q),
  );
}
