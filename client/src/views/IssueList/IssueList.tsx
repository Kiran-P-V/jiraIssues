import { useEffect, useState } from "react";
import { fetchIssues, fetchAssignees } from "../../api/jira";
import { IssueType } from "../../utils/types";
import Loading from "../../components/common/loading";
import CustomError from "../../components/common/error";

const IssueList = () => {
  const [issues, setIssues] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalIssues, setTotalIssues] = useState(0);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [assigneeFilter, setAssigneeFilter] = useState<string | null>(null);
  const [assignees, setAssignees] = useState<string[]>([]);
  const issuesPerPage = 8;
  const projectKey = "KAN"; // Replace with your actual project key

  useEffect(() => {
    const getIssues = async () => {
      setLoading(true);
      try {
        const startAt = (currentPage - 1) * issuesPerPage;
        const { issues, total } = await fetchIssues(
          projectKey,
          startAt,
          issuesPerPage,
          statusFilter || undefined,
          assigneeFilter || undefined
        );
        setIssues(issues);
        setTotalIssues(total);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const getAssignees = async () => {
      try {
        const assignees = await fetchAssignees(projectKey);
        setAssignees(assignees);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      }
    };

    getIssues();
    getAssignees();
  }, [currentPage, statusFilter, assigneeFilter]);

  const totalPages = Math.ceil(totalIssues / issuesPerPage);

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

  useEffect(() => {
    console.log({ issues });
  }, [issues]);

  if (error) return <CustomError message={error} />;

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col justify-center items-center">
      <p className="font-bold text-4xl text-blue-400 my-4">Jira Issues</p>
      <div className="bg-blue-300 w-full max-w-7xl h-full p-4 rounded-xl flex flex-col items-center">
        <div className="flex w-full justify-between mb-4">
          <div>
            <label htmlFor="status-filter" className="mr-2">
              Status:
            </label>
            <select
              id="status-filter"
              onChange={handleStatusChange}
              value={statusFilter || ""}
              className="p-2 rounded"
            >
              <option value="">All</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
              {/* Add other statuses as needed */}
            </select>
          </div>
          <div>
            <label htmlFor="assignee-filter" className="mr-2">
              Assignee:
            </label>
            <select
              id="assignee-filter"
              onChange={handleAssigneeChange}
              value={assigneeFilter || ""}
              className="p-2 rounded"
            >
              <option value="">All</option>
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : issues.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="bg-white rounded-xl p-4 shadow-lg overflow-hidden"
              >
                <p className="font-bold text-xl truncate mb-2">
                  {issue.fields.summary}
                </p>
                <p className="truncate">
                  <strong className="text-gray-600">Key:</strong> {issue.key}
                </p>
                <p className="truncate">
                  <strong className="text-gray-600">Summary:</strong>{" "}
                  {issue.fields.summary}
                </p>
                <p className="truncate">
                  <strong className="text-gray-600">Type:</strong>{" "}
                  {issue.fields.issuetype.name}
                </p>
                <p className="truncate">
                  <strong className="text-gray-600">Status:</strong>{" "}
                  {issue.fields.status.name}
                </p>
                <p className="truncate">
                  <strong className="text-gray-600">Assignee:</strong>
                  {issue.fields.assignee
                    ? issue.fields.assignee.displayName
                    : "Unassigned"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No data found</p>
        )}
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
