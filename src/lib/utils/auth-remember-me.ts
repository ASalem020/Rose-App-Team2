export function saveAuthToken(
  token: string,
  rememberMe: boolean,
) {
  if (rememberMe) {
    localStorage.setItem('token', token);
  } else {
    sessionStorage.setItem('token', token);
  }
}
//   save check remember me on local storage and uncheck to sessionStorage
export function getAuthToken() {
  return (
    localStorage.getItem('token') ||
    sessionStorage.getItem('token')
  );
}

export function clearAuthToken() {
  localStorage.removeItem('token');
  sessionStorage.removeItem('token');
}
