import axios from "axios"

const getWord = async () => {
   const response = await axios.get('https://random-word-api.vercel.app/api?words=1&length=5');
   const data = await response.data

   return data[0]
}

export default getWord;