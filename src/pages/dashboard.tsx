import { useUser } from "@clerk/nextjs";
import { NextPage } from "next";
import Image from "next/image";
import React, {useState} from 'react'
import { api } from "@/utils/api";


const CreateLinkWizard = () => {
    const { user } = useUser();
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [category, setCategory] = useState('null')
  
    const { mutate } = api.links.create.useMutation()
  
    const handleSubmit = () => mutate({
      title,
      url,
      category
    })
  
    if (!user) return null;
  
    return <div className="flex gap-3">
      <Image alt="Profile picture" src={user.imageUrl} width={56} height={56} className="rounded-full h-14 w-14" />
      <input type="text" placeholder="Enter headline" className="border-2 border-black/50 rounded p-4" value={title} onChange={(e) => setTitle(e.target.value)} />
  
      <input type="text" placeholder="Enter link url" className="border-2 border-black/50 rounded p-4" value={url} onChange={(e) => setUrl(e.target.value)} />
  
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="reddit">Reddit</option>
        <option value="instagram">Instagram</option>
        <option value="twitter">Twitter</option>
        <option value="tiktok">Tiktok</option>
        <option value="threads">threads</option>
        <option value="facebook">facebook</option>
      </select>
      <button onClick={handleSubmit}>Add Link</button>
    </div>
  }


const DashboardPage: NextPage = () => {
    return (
        <CreateLinkWizard />
    )
}

export { DashboardPage}