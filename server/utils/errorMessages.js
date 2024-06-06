const getErrorMessage = (statusCode) => {
  switch (statusCode) {
    case 400:
      return "Bad Request: The server could not understand the request due to invalid syntax.";
    case 401:
      return "Unauthorized: Access is denied due to invalid credentials.";
    case 403:
      return "Forbidden: You do not have permission to access this resource.";
    case 404:
      return "Not Found: The requested resource could not be found.";
    case 429:
      return "Too Many Requests: You have exceeded the API rate limit.";
    case 500:
      return "Internal Server Error: The server has encountered a situation it doesn't know how to handle.";
    default:
      return "An unexpected error occurred.";
  }
};

export default getErrorMessage;
