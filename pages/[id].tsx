import { ArrowNarrowLeftIcon } from "@heroicons/react/outline";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BorderCountries } from "../interfaces/Border_countries";
import { CountryDetails } from "../interfaces/Country_details";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(process.env.API_BASE + "all?fields=alpha3Code");
  const countries = await res.json();
  console.log("Static Paths");
  const paths = countries.map((country: { alpha3Code: string }) => ({
    params: { id: country.alpha3Code },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) throw new Error("route id param is not defined");
  
  const mainRes = await fetch(
    `${process.env.API_BASE}alpha/${params.id}?fields=alpha3Code,nativeName,name,population,region,subregion,capital,topLevelDomain,languages,currencies,flags,borders`,
  );
  const country: CountryDetails = await mainRes.json();
  const bordersRes = await fetch(
    `${process.env.API_BASE}alpha?codes=${country.borders.join(",")}&fields=name,alpha3Code`,
  );
  const borderCountries = await bordersRes.json();

  return {
    props: { country, borderCountries },
  };
};

const DetailsPage: NextPage<{ country: CountryDetails; borderCountries: BorderCountries[] }> = ({
  country,
  borderCountries
}) => {
  const router = useRouter();

  return (
    <div>
      <button
        type="button"
        className="flex items-center gap-2 rounded-md bg-element-light px-8 py-2 text-sm text-text-light shadow-lg dark:bg-element-dark dark:text-text-dark"
        onClick={() => router.back()}
      >
        <ArrowNarrowLeftIcon className="h-5 w-5" />
        Back
      </button>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2">
        <div>
          <Image
            width={560}
            height={400}
            quality={100}
            src={country.flags.png}
            alt={`${country.name} flag`}
            className="max-w-[400px]"
          />
        </div>
        <section className="my-10 flex flex-col gap-9">
          <h2 className="text-2xl font-extrabold">{country.name}</h2>
          <div className="flex flex-col gap-10 text-sm lg:flex-row lg:gap-40">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Native Name:</h3>
                <p>{country.nativeName}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Population:</h3>
                <p>{country.population.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Region:</h3>
                <p>{country.region}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Sub Region:</h3>
                <p>{country.subregion}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Capital:</h3>
                <p>{country.capital}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Top Level Domain:</h3>
                {country.topLevelDomain.map(domain => (
                  <p key={domain}>{domain}</p>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Currencies:</h3>
                {country.currencies.map((currency, i) => (
                  <p key={currency.code}>
                    {currency.name}
                    {country.currencies.length > 1 && i + 1 < country.currencies.length && ","}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Languages:</h3>
                {country.languages.map((language, i) => (
                  <p key={language.iso639_2}>
                    {language.name}
                    {country.languages.length > 1 && i + 1 < country.languages.length && ","}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 text-sm lg:flex-row lg:items-center">
            <h3 className="font-semibold">Border Countries:</h3>
            <ul className="flex flex-wrap gap-3">
              {borderCountries.length > 1 &&
                borderCountries?.map(border => (
                  <Link href={`/${border.alpha3Code}`} key={border.alpha3Code}>
                    <a>
                      <li className="rounded bg-element-light px-6 py-1 text-text-light shadow dark:bg-element-dark dark:text-text-dark">
                        {border.name}
                      </li>
                    </a>
                  </Link>
                ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailsPage;


