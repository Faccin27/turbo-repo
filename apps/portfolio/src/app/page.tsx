import Main from "@/components/main";
import { scrapeBehanceUser } from '@/utils/fetchBehanceUser';

export default async function Home() {
  const user = await scrapeBehanceUser('guizeradesigner');
  
  return (
    <>
      <Main user={user} />
    </>
  );
}