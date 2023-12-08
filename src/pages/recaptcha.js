export async function POST({ request }) {
  const data = await request.json();

  const recaptchaURL = "https://www.google.com/recaptcha/api/siteverify";
  const requestBody = {
    secret: "6Les1SopAAAAAE8FlZ6a0ibOYF2YVlrAtX5YrApO",
    response: data.recaptcha,
  };

  const response = await fetch(recaptchaURL, {
    method: "POST",
    body: JSON.stringify(requestBody),
  });

  const responseData = await response.json();

  return new Response(JSON.stringify(responseData), { status: 200 });
}
