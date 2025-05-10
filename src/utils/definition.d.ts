interface ERHeaderPayload {
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