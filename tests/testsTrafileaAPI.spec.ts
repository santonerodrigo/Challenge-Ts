import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
test("First Test", async ({ request }) => {
  const articleResponse = await request.get(
    "https://gorest.co.in/public/v1/users"
  );
  const responseBody = await articleResponse.json();
  const results = [];
  Object.entries(responseBody.data).forEach((entry) => {
    if (entry[1].status === "active") {
      results.push(entry[1].id);
    }
  });
  const firstActiveUserGet = await request.get(
    `https://gorest.co.in/public/v1/users/${results[0]}`
  );
  const firstActiveUserData = await firstActiveUserGet.json();
  expect(firstActiveUserGet.status()).toEqual(200);
  expect(firstActiveUserData.data.status).toEqual("active");
  console.log(firstActiveUserData.data);
});

test("Second Test", async ({ request }) => {
  const newName = "John Wick";
  const articleResponse = await request.get(
    "https://gorest.co.in/public/v1/users"
  );
  const responseBody = await articleResponse.json();
  const firstUserID = responseBody.data[1].id;
  const patchFirstUser = await request.patch(
    `https://gorest.co.in/public/v1/users/${firstUserID}`,
    {
      headers: {
        Authorization:
          "Bearer 55d6636b25b84832f383665a17f72117ee2b5e655a78ba968912c9a37d1c050f",
      },
      data: {
        name: newName,
        email: `jana.waters${faker.number.int(1000)}@hotmail.us`,
        status: "active",
      },
    }
  );
  // had to use faker to create random email, if same email was used more than once api responds with error
  const patchResponse = await patchFirstUser.json();
  console.log(patchResponse);
  expect(patchResponse.data.name).toEqual(newName);
  expect(patchFirstUser.status()).toEqual(200);
});
