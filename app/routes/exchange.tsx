import { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, Form, useActionData } from "@remix-run/react";
import https from 'https';

export const meta: MetaFunction = () => [{ title: "Converter" }];

const fetchCurrencyData = (path: string) =>
  new Promise<any>((resolve, reject) => {
    https.get(
      {
        hostname: 'currency-exchange.p.rapidapi.com',
        path,
        headers: {
          'x-rapidapi-key': '09f9741e04mshacfa545e3bc86dfp121e52jsn93b63e419c3e',
          'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        },
      },
      res => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(JSON.parse(data)));
      }
    ).on('error', reject);
  });

export const loader: LoaderFunction = async () => {
  return await fetchCurrencyData('/listquotes');
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const amount = parseFloat(formData.get("amount") as string);
  const fromCurrency = formData.get("fromCurrency") as string;
  const toCurrency = formData.get("toCurrency") as string;

  const conversionRate = await fetchCurrencyData(`/exchange?q=1.0&from=${fromCurrency}&to=${toCurrency}`);
  const convertedAmount = amount * parseFloat(conversionRate);

  return { amount, fromCurrency, toCurrency, conversionRate: parseFloat(conversionRate), convertedAmount };
};

export default function Exchange() {
  const currencies = useLoaderData<string[]>();
  const conversionResult = useActionData<{
    amount: number;
    fromCurrency: string;
    toCurrency: string;
    conversionRate: number;
    convertedAmount: number;
  }>();

  return (
    <div className="bg-gradient-to-b from-mainpurple from-10% to-violet-400 flex flex-col items-center justify-center h-screen text-center">
      <div className="mb-10">
        <h2 className="text-white text-4xl mb-2">Currency Converter</h2>
        <span className="text-white text-lg">Check live foreign currency exchange rates</span>
      </div>
      
      <div className="bg-mainpurple w-10/12 mx-auto py-10 px-5 rounded-2xl drop-shadow-2xl mt-10 font-bold">
        <Form method="post" className="space-y-6">
          <div className="flex flex-wrap justify-center gap-5">

            <label className="text-white flex flex-col items-start flex-1 min-w-[200px]">
              <h2 className="mb-2">Amount</h2>
              <input name="amount" defaultValue="1.00" className="rounded-2xl py-3 bg-lila px-3 text-black w-full shadow-2xl" type="text" />
            </label>

            <label className="text-white flex flex-col items-start flex-1 min-w-[200px]">
              <h2 className="mb-2">From</h2>
              <select name="fromCurrency" className="rounded-2xl py-3 bg-lila px-3 text-black w-full shadow-2xl appearance-none">
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </label>
            
            {/* ICON */}
            <div className="text-white flex items-center mt-10">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </div>
            {/* ICON */}

            <label className="text-white flex flex-col items-start flex-1 min-w-[200px]">
              <h2 className="mb-2">To</h2>
              <select name="toCurrency" className="rounded-2xl py-3 bg-lila px-3 text-black w-full shadow-2xl appearance-none">
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </label>

          </div>
          
          <button type="submit" className="px-10 py-3 bg-lila rounded-2xl shadow-2xl">Convert</button>

        </Form>
        {conversionResult && (
  <div className="mt-10 text-white flex flex-col items-start">
    <p>{conversionResult.amount} {conversionResult.fromCurrency} = <span className="text-2xl">{conversionResult.convertedAmount} {conversionResult.toCurrency}</span></p>
    <p className="text-sm mt-2">1 {conversionResult.fromCurrency} = {conversionResult.conversionRate} {conversionResult.toCurrency}</p>
  </div>
)}

      </div>
    </div>
  );
}
