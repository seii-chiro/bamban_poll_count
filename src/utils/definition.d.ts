export interface ERHeaderPayload {
    id: number;
    created_by: string;
    updated_by: string;
    record_status: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    clustered_prec: string;
    no_reg_voters: number;
    no_voters_voted: number;
    no_ballots_casted: number;
    no_ballots_diverted: number;
    pic1_b64: string;
    pic1_path: string;
    pic2_b64: string;
    pic2_path: string;
    pic3_b64: string;
    pic3_path: string;
    notes: string;
    user: number;
};

export interface Contest {
    id: number;
    created_by: string;
    updated_by: string;
    record_status: string;
    created_at: string;
    updated_at: string;
    contest_code: number; // Can be bigint
    contest_name: string;
    notes: string;
}

export interface Candidate {
    id: number;
    created_by: string;
    updated_by: string;
    record_status: string;
    created_at: string;
    updated_at: string;
    candidate_name: string;
    notes: string;
    contest_code: number;
    contest: Contest;
}
export type ClusteredPrecinct = {
    id: number;
    created_by: string;
    updated_by: string;
    record_status: string;
    created_at: string; // ISO datetime string
    updated_at: string; // ISO datetime string
    acm_id: number;
    reg_name: string;
    prv_name: string;
    mun_name: string;
    brgy_name: string;
    pollplace: string;
    clustered_prec: string;
    registered_voters: number;
    notes: string;
};

export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    groups: string[];
    user_permissions: string[];
  all_permissions: string; // still a string based on latest JSON
  clusterd_prec: ClusteredPrecinct; // nested object
};


export interface Precinct {
    id: number;
    created_by: string;
    updated_by: string;
    record_status: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    acm_id: number;
    reg_name: string;
    prv_name: string;
    mun_name: string;
    brgy_name: string;
    pollplace: string;
    clustered_prec: string;
    registered_voters: number;
    notes: string;
}

export interface PollWatcherGroup {
    group: string;
    user_count: number;
}

export interface DashboardSummary {
    total_precincts: number;
    total_voters: number;
    total_poll_watchers: number;
    poll_watcher_groups: PollWatcherGroup[];
    total_no_reg_voters: number;
    total_no_voters_voted: number;
    total_no_ballots_casted: number;
    total_no_ballots_diverted: number;
}

export type Result = {
    id: number;
    created_by: string;
    updated_by: string;
    record_status: string;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    precinct_code: string;
    contest_code: string;
    candidate_name: string;
    party_code: string;
    votes_amount: number;
    totalization_order: number;
    number_voters: number;
    undervotes: number;
    overvotes: number;
    reception_date: string; // ISO date string
};
