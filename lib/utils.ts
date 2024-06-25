import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
