import { MiniUrl, columns } from "./urls-table/columns"
import { DataTable } from "../../components/DataTable/DataTable"

const miniUrls: MiniUrl[] = [
  {
    id: "1",
    alias: "alias1",
    longUrl: "https://www.google.com/holacaracolasoylargode",
    shortUrl: "https://miniurl.com/abc123",
    visits: 10
  },
  {
    id: "2",
    alias: "alias2",
    longUrl: "https://www.facebook.com",
    shortUrl: "https://miniurl.com/def456",
    visits: 20
  },
  {
    id: "3",
    alias: "alias3",
    longUrl: "https://www.twitter.com",
    shortUrl: "https://miniurl.com/ghi789",
    visits: 30
  },
  {
    id: "4",
    alias: "alias4",
    longUrl: "https://www.instagram.com",
    shortUrl: "https://miniurl.com/jkl012",
    visits: 40
  },
  {
    id: "5",
    alias: "alias5",
    longUrl: "https://www.linkedin.com",
    shortUrl: "https://miniurl.com/mno345",
    visits: 50
  },
  {
    id: "6",
    alias: "alias6",
    longUrl: "https://www.reddit.com",
    shortUrl: "https://miniurl.com/pqr678",
    visits: 60
  },
  {
    id: "7",
    alias: "alias7",
    longUrl: "https://www.youtube.com",
    shortUrl: "https://miniurl.com/stu901",
    visits: 70
  },
  {
    id: "8",
    alias: "alias8",
    longUrl: "https://www.twitch.com",
    shortUrl: "https://miniurl.com/vwx234",
    visits: 80
  },
  {
    id: "9",
    alias: "alias9",
    longUrl: "https://www.spotify.com",
    shortUrl: "https://miniurl.com/yz012",
    visits: 90
  },
  {
    id: "10",
    alias: "alias10",
    longUrl: "https://www.netflix.com",
    shortUrl: "https://miniurl.com/345678",
    visits: 100
  },
  {
    id: "11",
    alias: "alias11",
    longUrl: "https://www.spotifsadasdy.com",
    shortUrl: "https://miniurl.com/yz012232",
    visits: 197349
  }
]

async function fetchMiniUrls() {
  // Fetch the miniUrls from API
  return miniUrls
}

export default async function UrlsTable() {
  const data = await fetchMiniUrls()

  return (
    <div className="container mx-auto py-10 mt-[64px]">
      <DataTable data={data} columns={columns} />
    </div>
  )
}