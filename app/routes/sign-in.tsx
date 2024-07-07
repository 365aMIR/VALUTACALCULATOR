import { MetaFunction, ActionFunction, redirect } from "@remix-run/node";
import { useActionData, Form } from "@remix-run/react";
import mysql from 'mysql2/promise';

export const meta: MetaFunction = () => {
  return [
    { title: "sign in" }
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const username = form.get("username");
  const password = form.get("password");

  if (typeof username !== "string" || typeof password !== "string") {
    return { error: "Invalid form data" };
  }

  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'valutacalc'
  });

  const [rows] = await connection.execute(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password]
  );

  if (rows.length > 0) {
    return redirect("/exchange");
  } else {
    return { error: "Invalid username or password" }; 
  }
};

export default function Login() {
  const actionData = useActionData();
  const errorMessage = actionData?.error ? "Invalid username or passwor" : null;

  return (
    <div className="bg-gradient-to-b from-mainpurple from-10% to-violet-400 flex flex-col items-center justify-center h-screen text-center">

      <div className="bg-mainpurple p-14 text-black">
        <Form method="post">
          <div className="flex">
              <input className="rounded-sm py-1 bg-lila px-1 w-full shadow-2xl" placeholder="username" type="text" name="username" required />
          </div>
          <div>
              <input className="rounded-sm py-1 bg-lila px-1 w-full shadow-2xl mt-5" placeholder="password" type="password" name="password" required />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button className="flex mt-5 bg-white px-4 py-2 rounded" type="submit">Login</button>
        </Form>
      </div>
    </div>
  );
}