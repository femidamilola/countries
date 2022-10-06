import { gql, useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

const AllRecordsQuery = gql`
  query {
    records {
      id
      year
      population
      country
      area
    }
  }
`;

const DeleteRecordMutation = gql`
  mutation DeleteRecord($deleteRecordId: String!) {
    deleteRecord(id: $deleteRecordId) {
      id
    }
  }
`;

interface Record {
  id: string;
  country: string;
  year: number;
  population: number;
  area: number;
}

interface Data {
  records: Record[];
}
export default function Home() {
  const router = useRouter();
  const {
    data,
    loading,
    error,
  }: { data: Data; loading: boolean; error?: any } = useQuery(AllRecordsQuery);
  const deleteRecord = useMutation(DeleteRecordMutation);
  console.log(data, loading, error);
  if (loading || deleteRecord[1].loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const years = new Set(
    data.records.map(({ year }) => {
      return year;
    })
  );

  let records = [...data.records].sort((a, b) => {
    return a.year - b.year;
  });
  return (
    <div className={styles.container}>
      <Head>
        <title>Countries GraphQL App</title>
        <meta name="description" content="Sample Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className="my-5 text-3xl">Records</div>

        <div>
          {Array.from(years).map((y, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 gap-4 my-2 items-center border-gray-200 border-b ${
                index == 0 ? "border-t" : ""
              }`}
            >
              <div className="">{y}</div>
              <div>
                {records
                  .filter(({ year }) => year == y)
                  .map((r) => (
                    <div
                      key={r.id}
                      className={"my-2 grid grid-cols-2 w-96 items-center"}
                    >
                      <div>
                        <div>Country: {r.country}</div>
                        <div>Area: {r.area}</div>
                        <div>Population: {r.population}</div>
                      </div>
                      <div>
                        <button
                          className="py-2 px-4 border bg-blue-100 text-black rounded"
                          onClick={() =>
                            deleteRecord[0]({
                              variables: { deleteRecordId: r.id },
                            }).then(() => router.reload())
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
