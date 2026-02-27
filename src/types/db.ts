export type Role = "student" | "admin";

export type ApplicationStatus = "draft" | "submitted" | "approved" | "rejected";

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: Role;
  created_at: string;
}

export interface Application {
  id: string;
  user_id: string;
  status: ApplicationStatus;
  form_fee_paid: boolean;
  personal_data: Record<string, string> | null;
  academic_data: Record<string, string> | null;
  program_data: Record<string, string> | null;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  application_id: string;
  type: string;
  amount: number;
  currency: string;
  provider: string;
  reference: string;
  status: "pending" | "success" | "failed";
  created_at: string;
}
