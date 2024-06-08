const getErrorMessage = (statusCode) => {
  switch (statusCode) {
    case 400:
      return "Bad Request: Internal server error.";
    case 401:
      return "Unauthorized: Access is denied due to invalid credentials. Please check your authentication details.";
    case 403:
      return "Forbidden: You do not have permission to access this resource. Contact the administrator if you believe this is an error.";
    case 404:
      return "Not Found: The requested resource could not be found. Check the URL or contact support if the problem persists.";
    case 429:
      return "Too Many Requests: You have exceeded the API rate limit. Please try again later.";
    case 500:
      return "Internal Server Error: The server encountered an unexpected condition that prevented it from fulfilling the request.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};

export default getErrorMessage;
