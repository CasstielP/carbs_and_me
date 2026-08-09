function getCookie(name: string): string | null {
  const cookies = document.cookie.split("; ");

  const cookie = cookies.find((row) => row.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.split("=")[1]);
}

export async function csrfFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const csrfToken = getCookie("csrf_token");

  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (csrfToken) {
    headers.set("X-CSRFToken", csrfToken);
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: "same-origin",
  });
}