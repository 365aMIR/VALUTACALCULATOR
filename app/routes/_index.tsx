import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Homepage" }
  ];
};

export default function Index() {
  return (
   <div className="flex items-center justify-center h-screen text-center bg-gradient-to-b from-mainpurple from-10% to-violet-400 ">
    <div>
      <h2 className="text-white text-3xl md:text-4xl mb-1">Trusted Global Currency Converter & Money Transfer Solutions</h2>
      <span className="text-white text-base md:text-lg">Best source for currency conversion, sending money online and tracking exchange rates</span>
      <br />
      <br />
      <br />
      
      <Link to="/sign-in">
      <button className="px-24 py-6 bg-lila rounded-xl shadow-lg font-bold">Convert</button>
      </Link>
    </div>
   </div>
  );
}
