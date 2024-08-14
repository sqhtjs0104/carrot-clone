export function formatToTimeAgo(date: string | Date): string {
  const time = (typeof date === "string" ? new Date(date) : date).getTime();
  const now = new Date().getTime();
  const dayDiff = Math.round((time - now) / (1000 * 60 * 60 * 24));

  const formatter = new Intl.RelativeTimeFormat("ko");
  if (dayDiff === 0) {
    const timeDiff = Math.round((time - now) / (1000 * 60 * 60));
    
    if (timeDiff === 0) {
      return "방금 전";
    } else {
      return formatter.format(timeDiff, "hours");
    }
  } else {
    return formatter.format(dayDiff, "days");
  }
}

export function formatToWon(price: number): string {
  return price.toLocaleString("ko-KR");
}