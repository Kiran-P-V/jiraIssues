import Loading from "../../../components/common/loading";
import { ListingCardTypes } from "../../../utils/types";

const ListingCard: React.FC<ListingCardTypes> = ({
  getAllIssuesLoading,
  getAllIssues,
  getAllIssueError,
}) => {
  console.log(getAllIssueError);
  return (
    <>
      {getAllIssuesLoading ? (
        <Loading />
      ) : getAllIssueError ? (
        <p className="text-center text-red-500">{getAllIssueError}</p>
      ) : getAllIssues?.issues && getAllIssues.issues.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {getAllIssues.issues.map((issue) => (
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
                <strong className="text-gray-600">Summary:</strong>
                {issue.fields.summary}
              </p>
              <p className="truncate">
                <strong className="text-gray-600">Type:</strong>
                {issue.fields.issuetype.name}
              </p>
              <p className="truncate">
                <strong className="text-gray-600">Status:</strong>
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
    </>
  );
};

export default ListingCard;
