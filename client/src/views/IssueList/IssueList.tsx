import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "../../api/axios";
import { JiraEndpoints } from "../../utils/endpoints";
import ListingCard from "./components/ListingCard";
import SelectFilter from "../../components/common/select";

const IssueList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIssues, setTotalIssues] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
  const issuesPerPage = 8;
  const projectKey = "KAN"; // Replace with your actual project key
  const totalPages = Math.ceil(totalIssues / issuesPerPage);

  const { data: getAllAssignees } = useQuery({
    queryKey: ["getAllAssignees"],
    queryFn: () => {
      return getRequest(
        `${JiraEndpoints?.getAllAssignees}?project=${projectKey}`
      );
    },
  });

  const fetchIssues = () => {
    let jql = `project=${projectKey}`;
    if (statusFilter) jql += ` AND status="${statusFilter}"`;
    if (assigneeFilter) jql += ` AND assignee="${assigneeFilter}"`;
    const startAt = (currentPage - 1) * issuesPerPage;
    return getRequest(
      `${JiraEndpoints.getAllIssues}?jql=${encodeURIComponent(
        jql
      )}&startAt=${startAt}&maxResults=${issuesPerPage}`
    );
  };

  const {
    data: getAllIssues,
    refetch: refetchGetAllIssues,
    isLoading: getAllIssuesLoading,
    error: getAllIssueError,
    isRefetchError,
    isLoadingError,
    isError,
  } = useQuery({
    queryKey: ["getAllIssues", currentPage, statusFilter, assigneeFilter],
    queryFn: fetchIssues,
    enabled: false,
  });

  useEffect(() => {
    console.log({ getAllIssueError });
    console.log({ isRefetchError });
    console.log({ isLoadingError });
    console.log({ isError });
  }, [getAllIssueError, isRefetchError, isLoadingError, isError]);

  useEffect(() => {
    if (getAllIssues?.total) setTotalIssues(getAllIssues?.total);
  }, [getAllIssues]);

  useEffect(() => {
    refetchGetAllIssues();
  }, [currentPage, statusFilter, assigneeFilter]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(event.target.value || null);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleAssigneeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAssigneeFilter(event.target.value || null);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const statusOptions = [
    { value: "", label: "All" },
    { value: "To Do", label: "To Do" },
    { value: "In Progress", label: "In Progress" },
    { value: "Done", label: "Done" },
  ];

  const assigneeOptions = [
    { value: "", label: "All" },
    { value: "null", label: "Unassigned" },
    ...(getAllAssignees?.map((assignee: any) => ({
      value: assignee.displayName,
      label: assignee.displayName,
    })) || []),
  ];

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center">
      <p className="font-bold text-4xl text-blue-400 my-4">Jira Issues</p>
      <div className="bg-blue-300 w-full max-w-7xl h-full p-4 rounded-xl flex flex-col items-center">
        <div className="flex w-full justify-between mb-4">
          <div>
            <SelectFilter
              label="Status"
              id="status-filter"
              value={statusFilter}
              onChange={handleStatusChange}
              options={statusOptions}
              className="mr-4"
            />
          </div>
          <div>
            <SelectFilter
              label="Assignee"
              id="assignee-filter"
              value={assigneeFilter}
              onChange={handleAssigneeChange}
              options={assigneeOptions}
            />
          </div>
        </div>
        <ListingCard
          getAllIssues={getAllIssues}
          getAllIssuesLoading={getAllIssuesLoading}
          getAllIssueError={getAllIssueError}
        />
        <div className="flex justify-between mt-4 w-full max-w-7xl">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueList;
