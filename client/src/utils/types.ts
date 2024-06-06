// src/types.ts
export interface IssueType {
  id: string;
  key: string;
  fields: {
    summary: string;
    issuetype: {
      name: string;
    };
    status: {
      name: string;
    };
    assignee?: {
      displayName: string;
    } | null;
  };
}

// src/types.ts
export interface CommonComponentTypes {
  message: string;
}

export interface IssuesResponse {
  issues: IssueType[];
  total: number;
}

export interface Assignee {
  displayName: string;
}

export interface ListingCardTypes {
  getAllIssuesLoading: boolean;
  getAllIssues: {
    issues: IssueType[] | null;
  } | null;
  getAllIssueError: any;
}

export interface SelectFilterProps {
  label: string;
  id: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
}

export interface AssigneeOptionMapingType {
  displayName: string;
  // Add any other properties you expect in the assignee object if needed
}
