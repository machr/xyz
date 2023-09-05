import { NextPage } from "next"
import { useRouter } from "next/router"
import { api } from "@/utils/api";


const PublicUserPage: NextPage = () => {
    const router = useRouter();
    const { id } = router.query
    const userLinks = api.links.getAll.useQuery()
    return (
    <>
        <div><h1>Get Username here {id}</h1></div>
        { JSON.stringify(userLinks) }
        </>
    )
}

export default PublicUserPage;
