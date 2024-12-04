# Revolut Currency Exchange Task

## To get started
1. Clone this repository
2. Run npm install
3. Run npm run dev
4. Open http://localhost:5173/ in your browser

## Deployed App
* Deployed app can be accessed using the following link:
ADD_LINK_HERE

## To run tests
* End to end tests implemented with playwright. Run npx playwright test from the command line.
* Unit tests implemented with Vitest and React Testing Library. Run npm run test from the command line.

## My approach
Build app with Vite, React, TypeScript, TailwindCSS using template form Vite Community.

* Create app with single page which displays initial account balances and exchange form section below.
* Create 3 pockets / wallets with initial balances of 50
* Use axios to make api calls
* Use freecurrencyapi.com to get exchange rates which allows for 10 free requests per minute and 5000 requests per month
* Poll exchange api every 10 seconds
* Use React Hook Form for form validation
* the input should on accept numbers with 2 decimal places
* allow exchange between pockets / wallets
* display exchange rates and pocket balances



## Task Details

* The task instructions are available here: https://firebasestorage.googleapis.com/v0/b/klets-3642/o/user_files%2F1NrIfECa%2F054481cb580d4ec0b3bc24a5c8cc3b78%2FFrontend%20Development%20Home%20Task%20-%20Revolut.pdf?alt=media&token=ba193e3d-29a7-4d5e-a230-2261eae67a85
