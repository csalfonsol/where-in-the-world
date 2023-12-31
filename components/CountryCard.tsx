import Image from "next/image";
import Link from "next/link";
import { CountryCardProps } from "../interfaces/Country";

const CountryCard = ({ data }: CountryCardProps) => {
  return (
    <Link href={`/${data.alpha3Code}`}>
      <a>
        <article className="flex w-66 flex-col">
          <Image
            height={160}
            width={264}
            src={data.flags.png}
            alt={`${data.name} flag`}
            className="rounded-t-md"/>
          <section className="space-y-6 rounded-b-md bg-element-light px-6 py-7 text-text-light dark:bg-element-dark dark:text-text-dark">
            <h2 className="text-lg font-extrabold">{data.name}</h2>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Population:</h3>
                <p>{data.population.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Region:</h3>
                <p>{data.region}</p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Capital:</h3>
                <p>{data.capital}</p>
              </div>
            </div>
          </section>
        </article>
      </a>
    </Link>
  );
};

export default CountryCard;
