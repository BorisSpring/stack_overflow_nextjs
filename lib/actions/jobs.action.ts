'use server';

// utils
import { executeMethodWithTryCatch } from '../utils';

interface getJobsParams {
  query?: string;
  page?: number;
}
export async function getJobs(params: getJobsParams) {
  return await executeMethodWithTryCatch(async () => {
    const { query, page = 1 } = params;
    const res = await fetch(
      `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&num_pages=10`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPID_API_KEY!,
        },
      }
    );

    const data = await res.json();

    console.log({ data });
    return data?.data || [];
  });
}
