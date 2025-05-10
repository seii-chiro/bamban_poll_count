type Contest = {
  id: number;
  created_by: string;
  updated_by: string;
  record_status: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  contest_code: string;
  contest_name: string;
  notes: string;
};

type Candidate = {
  id: number;
  created_by: string;
  updated_by: string;
  record_status: string;
  contest: Contest;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  contest_code: string;
  candidate_code: string;
  candidate_name: string;
  parties_code: number; // This is a very large number—if needed, use string instead
  notes: string;
};
