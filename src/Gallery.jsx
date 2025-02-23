import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useGlobalContext } from "./content"

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`
// console.log(import.meta.env.VITE_API_KEY)


const Gallery = () => {
    const {searchTerm} = useGlobalContext()
    const response = useQuery({
        //here passing the search term beacuse if there is any changes it will know and get the data from the server
      queryKey: ['images', searchTerm],
      queryFn: async () => {
        const result = await axios.get(`${url}&query=${searchTerm}`)
        // console.log(result)
        return result.data
    //here there are two more things we can define
    //staleTime
    //cacheTime
      }
    })
    // console.log(response)
     if (response.isLoading) {
       return (
         <section className="image-container">
           <h4>...Loading</h4>
         </section>
       )
     }
      if (response.isError) {
        return (
          <section className="image-container">
            <h4>There was an error</h4>
          </section>
        )
      }
      const results = response.data.results
      if (results.length < 1) {
        return (
          <section className="image-container">
            <h4>No Results Found</h4>
          </section>
        )
      }


  return (
    <section className="image-container">
        {results.map((item)=>{
            const url = item?.urls?.regular
            return <img src={url} key={item.id} alt={item.alt_description}
            className="img"/>
        })}
    </section>
  )
}

export default Gallery
