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
    assignee: {
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
