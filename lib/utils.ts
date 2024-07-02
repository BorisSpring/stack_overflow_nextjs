import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { connectToDatabase } from './mongoose';
import mongoose, { ClientSession } from 'mongoose';
import qs from 'query-string';
import { BADGE_CRITERIA } from '@/constants';
import { BadgeCounts } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
  const now = new Date();
  const seconds = Math.floor(
    (now.getTime() - new Date(createdAt).getTime()) / 1000
  );

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1)
    return interval + ' year' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1)
    return interval + ' month' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 86400);
  if (interval >= 1)
    return interval + ' day' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 3600);
  if (interval >= 1)
    return interval + ' hour' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return interval + ' minute' + (interval > 1 ? 's' : '') + ' ago';

  return Math.floor(seconds) + ' second' + (seconds > 1 ? 's' : '') + ' ago';
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  } else {
    return num.toString();
  }
};

export async function executeMethodWithTryAndTransactiona(
  executeFunction: any
) {
  try {
    connectToDatabase();
  } catch (error) {
    console.error(error);
    throw error;
  }
  const session: ClientSession = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await executeFunction();
    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();
    console.error(error);
    throw error;
  } finally {
    await session.endSession();
  }
}

export async function executeMethodWithTryCatch(executeFunction: any) {
  try {
    connectToDatabase();
    return await executeFunction();
  } catch (error) {
    console.error(error);
  }
}

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
  isFrist?: boolean;
}

export const formUrlQuery = ({
  params,
  key,
  value,
  isFrist,
}: UrlQueryParams) => {
  const queryUrl = qs.parse(params);

  queryUrl[key] = value;

  if (isFrist) {
    queryUrl.page = '1';
  }

  return qs.stringifyUrl(
    { url: window.location.pathname, query: queryUrl },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeQueryFromUrl = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const queryObject = qs.parse(params);

  keysToRemove.forEach((key) => delete queryObject[key]);

  return qs.stringifyUrl(
    { url: window.location.pathname, query: queryObject },
    { skipNull: true }
  );
};

interface BadgeParam {
  criteria: {
    type: keyof typeof BADGE_CRITERIA;
    count: number;
  }[];
}

export const assignBadges = (params: BadgeParam) => {
  const badgeCounts: BadgeCounts = {
    GOLD: 0,
    SILVER: 0,
    BRONZE: 0,
  };

  const { criteria } = params;

  criteria.forEach((item) => {
    const { type, count } = item;
    const badgeLevels: any = BADGE_CRITERIA[type];

    Object.keys(badgeLevels).forEach((level) => {
      if (count >= badgeLevels[level]) {
        badgeCounts[level as keyof BadgeCounts] += 1;
      }
    });
  });
  return badgeCounts;
};

export const showToast = (title: string) => {
  toast({
    title,
    description: `${format(Date.now(), 'EEE d MMMM, h:mm a')}`,
  });
};
